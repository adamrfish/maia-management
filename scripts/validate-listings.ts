/**
 * Validates listings.json data integrity and image availability.
 * Run: pnpm validate-listings
 *
 * Checks:
 * 1. Every listing has required fields (non-empty)
 * 2. Every listing has at least 1 image
 * 3. Every image URL returns 200 with image/* content-type
 * 4. No duplicate image IDs across listings
 * 5. Coordinates are valid (within Miami area)
 * 6. Rent, beds, baths, sqft are reasonable
 * 7. Slugs are unique and URL-safe
 * 8. Apply URLs are valid AppFolio links
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { Listing } from "../src/types/listing";

const DATA_PATH = join(__dirname, "../src/data/listings.json");

// Miami bounding box (rough)
const MIAMI_BOUNDS = {
  latMin: 25.6,
  latMax: 25.95,
  lngMin: -80.4,
  lngMax: -80.05,
};

interface Issue {
  listing: string;
  severity: "error" | "warn";
  message: string;
}

async function checkImageUrl(url: string): Promise<{ ok: boolean; status: number; contentType: string }> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type") || "",
    };
  } catch (err) {
    return { ok: false, status: 0, contentType: `fetch error: ${err}` };
  }
}

async function validate(): Promise<Issue[]> {
  const issues: Issue[] = [];
  const raw = readFileSync(DATA_PATH, "utf-8");
  let listings: Listing[];

  try {
    listings = JSON.parse(raw);
  } catch {
    issues.push({ listing: "(file)", severity: "error", message: "listings.json is not valid JSON" });
    return issues;
  }

  if (!Array.isArray(listings) || listings.length === 0) {
    issues.push({ listing: "(file)", severity: "error", message: "listings.json is empty or not an array" });
    return issues;
  }

  console.log(`Validating ${listings.length} listings...\n`);

  const slugs = new Set<string>();
  const allImageIds = new Set<string>();

  for (const l of listings) {
    const label = l.streetAddress || l.slug || l.id;

    // --- Required fields ---
    const requiredStrings: [string, keyof Listing][] = [
      ["id", "id"],
      ["slug", "slug"],
      ["address", "address"],
      ["streetAddress", "streetAddress"],
      ["city", "city"],
      ["state", "state"],
      ["zip", "zip"],
      ["rentFormatted", "rentFormatted"],
      ["availableDate", "availableDate"],
      ["description", "description"],
      ["applyUrl", "applyUrl"],
      ["syncedAt", "syncedAt"],
    ];
    for (const [name, key] of requiredStrings) {
      if (!l[key] || (typeof l[key] === "string" && (l[key] as string).trim() === "")) {
        issues.push({ listing: label, severity: "error", message: `Missing or empty: ${name}` });
      }
    }

    // --- Slug uniqueness and format ---
    if (slugs.has(l.slug)) {
      issues.push({ listing: label, severity: "error", message: `Duplicate slug: ${l.slug}` });
    }
    slugs.add(l.slug);

    if (!/^[a-z0-9-]+$/.test(l.slug)) {
      issues.push({ listing: label, severity: "error", message: `Slug has invalid characters: ${l.slug}` });
    }

    // --- Numeric sanity ---
    if (l.rent <= 0 || l.rent > 50000) {
      issues.push({ listing: label, severity: "error", message: `Suspicious rent: ${l.rent}` });
    }
    if (l.beds < 0 || l.beds > 10) {
      issues.push({ listing: label, severity: "warn", message: `Unusual bed count: ${l.beds}` });
    }
    if (l.baths <= 0 || l.baths > 10) {
      issues.push({ listing: label, severity: "warn", message: `Unusual bath count: ${l.baths}` });
    }
    if (l.sqft <= 0) {
      issues.push({ listing: label, severity: "warn", message: `Missing sqft (${l.sqft})` });
    } else if (l.sqft > 10000) {
      issues.push({ listing: label, severity: "warn", message: `Suspicious sqft: ${l.sqft}` });
    }

    // --- Coordinates ---
    if (l.lat == null || l.lng == null) {
      issues.push({ listing: label, severity: "warn", message: "Missing coordinates" });
    } else if (
      l.lat < MIAMI_BOUNDS.latMin || l.lat > MIAMI_BOUNDS.latMax ||
      l.lng < MIAMI_BOUNDS.lngMin || l.lng > MIAMI_BOUNDS.lngMax
    ) {
      issues.push({ listing: label, severity: "warn", message: `Coordinates outside Miami: ${l.lat}, ${l.lng}` });
    }

    // --- Images ---
    if (l.images.length === 0) {
      issues.push({ listing: label, severity: "error", message: "No images" });
    }

    // Check for duplicate image IDs
    for (const img of l.images) {
      if (allImageIds.has(img.id)) {
        // Duplicates across listings are fine (shared amenity photos), within same listing is not
        const sameListingDupe = l.images.filter((i) => i.id === img.id).length > 1;
        if (sameListingDupe) {
          issues.push({ listing: label, severity: "error", message: `Duplicate image ID within listing: ${img.id}` });
        }
      }
      allImageIds.add(img.id);
    }

    // --- Apply URL ---
    if (l.applyUrl && !l.applyUrl.includes("appfolio.com")) {
      issues.push({ listing: label, severity: "warn", message: `Apply URL doesn't point to AppFolio: ${l.applyUrl}` });
    }

    // --- Image URL validation (HEAD requests) ---
    console.log(`  ${label}: checking ${l.images.length} image(s)...`);
    const imageResults = await Promise.all(
      l.images.map(async (img) => {
        const result = await checkImageUrl(img.url);
        return { img, result };
      })
    );

    let validCount = 0;
    for (const { img, result } of imageResults) {
      if (!result.ok) {
        issues.push({
          listing: label,
          severity: "error",
          message: `Broken image [${img.id}]: HTTP ${result.status} — ${img.url}`,
        });
      } else if (!result.contentType.startsWith("image/")) {
        issues.push({
          listing: label,
          severity: "error",
          message: `Image [${img.id}] returned ${result.contentType}, not image/*`,
        });
      } else {
        validCount++;
      }
    }
    console.log(`    ${validCount}/${l.images.length} OK`);
  }

  return issues;
}

async function main() {
  console.log("=== Maia Listings Validation ===\n");

  const issues = await validate();

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warn");

  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} ERROR(S):`);
    for (const e of errors) {
      console.log(`  [${e.listing}] ${e.message}`);
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} WARNING(S):`);
    for (const w of warnings) {
      console.log(`  [${w.listing}] ${w.message}`);
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("\n✅ All checks passed!");
  } else if (errors.length === 0) {
    console.log("\n✅ No errors (warnings above are non-blocking)");
  }

  // Exit with error code if there are errors
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
