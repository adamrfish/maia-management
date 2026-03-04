import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { join } from "path";
import type { Listing, ListingImage } from "../src/types/listing";

const BASE_URL = "https://maia.appfolio.com";

function slugify(address: string): string {
  return address
    .replace(/[#]/g, "")
    .replace(/[,.\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function parseRent(text: string): number {
  const match = text.replace(/,/g, "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseBeds(text: string): number {
  if (/studio/i.test(text)) return 0;
  const match = text.match(/(\d+)\s*bd/i);
  return match ? parseInt(match[1], 10) : 0;
}

function parseBaths(text: string): number {
  const match = text.match(/(\d+)\s*ba/i);
  return match ? parseInt(match[1], 10) : 0;
}

function parseSqft(text: string): number {
  // Match "420 Sq. Ft." or "420 sqft" but not "$1,899 Square" (rent values)
  const match = text.replace(/,/g, "").match(/(\d+)\s*(?:sq\.?\s*ft|sqft)/i);
  return match ? parseInt(match[1], 10) : 0;
}

function parseAvailableDate(text: string): { iso: string; formatted: string } {
  const trimmed = text.trim();
  if (/now/i.test(trimmed)) {
    return { iso: "now", formatted: "Available Now" };
  }
  // Handle MM/DD/YY or MM/DD/YYYY
  const match = trimmed.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (match) {
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    let year = parseInt(match[3], 10);
    if (year < 100) year += 2000;
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const formatted = `${monthNames[month - 1]} ${day}, ${year}`;
    return { iso, formatted };
  }
  return { iso: trimmed, formatted: trimmed };
}

function parseAddress(fullAddress: string): {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
} {
  // "1101 Euclid Ave, Unit 05, Miami Beach, FL 33139"
  const parts = fullAddress.split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    const lastPart = parts[parts.length - 1]; // "FL 33139"
    const stateZipMatch = lastPart.match(/([A-Z]{2})\s+(\d{5})/);
    const state = stateZipMatch ? stateZipMatch[1] : "";
    const zip = stateZipMatch ? stateZipMatch[2] : "";
    const city = parts[parts.length - 2]; // "Miami Beach"
    const streetAddress = parts.slice(0, parts.length - 2).join(", ");
    return { streetAddress, city, state, zip };
  }
  return { streetAddress: fullAddress, city: "", state: "", zip: "" };
}

function parseFee(text: string): number | null {
  const match = text.replace(/,/g, "").match(/\$?([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

interface ListingCard {
  id: string;
  address: string;
  rent: number;
  rentFormatted: string;
  beds: number;
  baths: number;
  sqft: number;
  availableDate: string;
  availableDateFormatted: string;
  amenitiesPreview: string;
  petPolicyPreview: string;
  lat: number | null;
  lng: number | null;
  defaultImageUrl: string | null;
}

async function fetchListingsPage(): Promise<ListingCard[]> {
  console.log("Fetching listings page...");
  const res = await fetch(`${BASE_URL}/listings`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const cards: ListingCard[] = [];

  // Extract map marker data from script tags for lat/lng and image URLs
  const mapData: Record<
    string,
    { lat: number; lng: number; imageUrl: string | null; unitSpecs: string | null }
  > = {};
  $("script").each((_, el) => {
    const content = $(el).html() || "";
    // Look for marker data with coordinates
    const markerMatches = content.matchAll(
      /latitude['":\s]+([-\d.]+).*?longitude['":\s]+([-\d.]+).*?detail_page_url['":\s]+['"]\/listings\/detail\/([^'"]+)['"]/gs
    );
    for (const m of markerMatches) {
      mapData[m[3]] = {
        lat: parseFloat(m[1]),
        lng: parseFloat(m[2]),
        imageUrl: null,
        unitSpecs: null,
      };
    }
    // Also try JSON-style marker arrays
    try {
      const jsonMatch = content.match(/markers\s*[:=]\s*(\[[\s\S]*?\])\s*[;,]/);
      if (jsonMatch) {
        const markers = JSON.parse(jsonMatch[1]);
        for (const marker of markers) {
          if (marker.detail_page_url) {
            const uuid = marker.detail_page_url.replace(
              "/listings/detail/",
              ""
            );
            mapData[uuid] = {
              lat: marker.latitude,
              lng: marker.longitude,
              imageUrl: marker.default_photo_url || null,
              unitSpecs: marker.unit_specs || null,
            };
          }
        }
      }
    } catch {
      // JSON parse failed, continue
    }
  });

  // Parse listing cards from the page
  // Find all links to detail pages
  const detailLinks = new Set<string>();
  $('a[href*="/listings/detail/"]').each((_, el) => {
    const href = $(el).attr("href") || "";
    const match = href.match(/\/listings\/detail\/([a-f0-9-]+)/);
    if (match) detailLinks.add(match[1]);
  });

  // For each unique listing, extract card-level data
  for (const uuid of detailLinks) {
    // Find the card container - look for the apply link to identify the card boundary
    const applyLink = $(
      `a[href*="listable_uid=${uuid}"]`
    ).first();
    const cardContainer =
      applyLink.closest("div").parent().closest("div") || applyLink.parent();

    // Get the full text content of the card area
    const cardText = cardContainer.text();

    // Extract address
    let address = "";
    const addressEl = cardContainer
      .find('a[href*="/listings/detail/"]')
      .first();
    const imgAlt = addressEl.find("img").attr("alt") || "";
    if (imgAlt && imgAlt.includes(",")) {
      address = imgAlt;
    }

    // Fallback: look for address text pattern in card
    if (!address) {
      const addrMatch = cardText.match(
        /(\d+\s+[A-Za-z][\w\s]+,\s*(?:Unit|Apt|#)?\s*\w+,\s*\w[\w\s]+,\s*[A-Z]{2}\s+\d{5})/
      );
      if (addrMatch) address = addrMatch[1];
    }

    // Extract rent
    const rentMatch = cardText.match(/\$[\d,]+/);
    const rentFormatted = rentMatch ? rentMatch[0] : "$0";
    const rent = parseRent(rentFormatted);

    // Extract beds/baths
    const bedsText = cardText.match(
      /(studio|\d+\s*bd)\s*\/?\s*(\d+)\s*ba/i
    );
    const beds = bedsText ? parseBeds(bedsText[0]) : 0;
    const baths = bedsText ? parseBaths(bedsText[0]) : 1;

    // Extract sqft - try card text first, fall back to map marker unit_specs
    const md = mapData[uuid];
    let sqft = parseSqft(cardText);
    if (sqft === 0 && md?.unitSpecs) {
      sqft = parseSqft(md.unitSpecs);
    }

    // Extract availability
    const availMatch = cardText.match(
      /Available\s+(NOW|\d{1,2}\/\d{1,2}\/\d{2,4})/i
    );
    const avail = availMatch
      ? parseAvailableDate(availMatch[1])
      : { iso: "now", formatted: "Available Now" };

    // Get amenities and pet policy previews from card
    const amenitiesMatch = cardText.match(/Amenities:\s*([^\n]+)/);
    const petPolicyMatch = cardText.match(/Pet Policy:\s*([^\n]+)/);

    cards.push({
      id: uuid,
      address: address || `Listing ${uuid}`,
      rent,
      rentFormatted,
      beds,
      baths,
      sqft,
      availableDate: avail.iso,
      availableDateFormatted: avail.formatted,
      amenitiesPreview: amenitiesMatch ? amenitiesMatch[1].trim() : "",
      petPolicyPreview: petPolicyMatch ? petPolicyMatch[1].trim() : "",
      lat: md?.lat ?? null,
      lng: md?.lng ?? null,
      defaultImageUrl: md?.imageUrl ?? null,
    });
  }

  console.log(`Found ${cards.length} listings on index page`);
  return cards;
}

async function fetchListingDetail(
  uuid: string
): Promise<{
  description: string;
  images: ListingImage[];
  amenities: string[];
  petPolicy: string;
  applicationFee: number | null;
  securityDeposit: number | null;
  utilitiesNote: string | null;
}> {
  const res = await fetch(`${BASE_URL}/listings/detail/${uuid}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Extract images from gallery
  const images: ListingImage[] = [];
  const seenIds = new Set<string>();
  $('a[href*="images.cdn.appfolio.com"], img[src*="images.cdn.appfolio.com"]').each(
    (_, el) => {
      const tag = $(el).prop("tagName")?.toLowerCase();
      let url = "";
      if (tag === "a") {
        url = $(el).attr("href") || "";
      } else {
        url = $(el).attr("src") || "";
      }
      // Extract UUID and extension from image URL
      const imgIdMatch = url.match(
        /images\/([a-f0-9-]+)\/(large|medium|small)\.(jpg|jpeg|png|webp)/
      );
      if (imgIdMatch && !seenIds.has(imgIdMatch[1])) {
        seenIds.add(imgIdMatch[1]);
        const ext = imgIdMatch[3]; // preserve original extension
        const alt = $(el).attr("alt") || $(el).find("img").attr("alt") || "";
        images.push({
          id: imgIdMatch[1],
          url: `https://images.cdn.appfolio.com/maia/images/${imgIdMatch[1]}/large.${ext}`,
          alt,
        });
      }
    }
  );

  // Extract description
  const descParts: string[] = [];
  const seenDesc = new Set<string>();
  $("p").each((_, el) => {
    const text = $(el).text().trim();
    // Filter out short labels, nav items, and non-description content
    if (
      text.length > 50 &&
      !text.includes("Application Fee") &&
      !text.includes("Security Deposit") &&
      !seenDesc.has(text)
    ) {
      seenDesc.add(text);
      descParts.push(text);
    }
  });
  const description = descParts.join("\n\n");

  // Extract amenities
  const amenities: string[] = [];
  let inAmenities = false;
  $("h2, h3, h4, strong, b, li").each((_, el) => {
    const text = $(el).text().trim();
    if (/amenities/i.test(text)) {
      inAmenities = true;
      return;
    }
    if (/pet policy|rental terms|contact|apply/i.test(text)) {
      inAmenities = false;
    }
    if (inAmenities && $(el).prop("tagName")?.toLowerCase() === "li") {
      amenities.push(text);
    }
  });

  // Also try to find amenities in a flat text format
  if (amenities.length === 0) {
    const fullText = $("body").text();
    const amenitiesMatch = fullText.match(
      /Amenities[\s:]+([^]*?)(?=Pet Policy|Rental Terms|Contact|Apply|$)/i
    );
    if (amenitiesMatch) {
      const items = amenitiesMatch[1]
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && s.length < 100);
      amenities.push(...items);
    }
  }

  // Extract pet policy from list items
  let petPolicy = "";
  const petItems: string[] = [];
  $("li").each((_, el) => {
    const text = $(el).text().trim();
    if (/cats? allowed|dogs? allowed|no pets|pets? ok/i.test(text)) {
      petItems.push(text);
    }
  });
  petPolicy = petItems.join(", ");

  // Extract rental terms
  let applicationFee: number | null = null;
  let securityDeposit: number | null = null;
  $("li").each((_, el) => {
    const text = $(el).text().trim();
    if (/application fee/i.test(text)) {
      applicationFee = parseFee(text);
    }
    if (/security deposit/i.test(text)) {
      securityDeposit = parseFee(text);
    }
  });

  // Extract utilities note from description
  let utilitiesNote: string | null = null;
  const utilMatch = description.match(
    /utilities\s+(?:are\s+)?included[^.]*\./i
  );
  if (utilMatch) {
    utilitiesNote = utilMatch[0];
  }

  return {
    description,
    images,
    amenities,
    petPolicy,
    applicationFee,
    securityDeposit,
    utilitiesNote,
  };
}

async function validateImage(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok && (res.headers.get("content-type")?.startsWith("image/") ?? false);
  } catch {
    return false;
  }
}

async function validateImages(images: ListingImage[]): Promise<ListingImage[]> {
  const results = await Promise.all(
    images.map(async (img) => ({
      img,
      ok: await validateImage(img.url),
    }))
  );
  const valid = results.filter((r) => r.ok).map((r) => r.img);
  const dropped = results.filter((r) => !r.ok);
  if (dropped.length > 0) {
    console.log(`    Dropped ${dropped.length} broken image(s)`);
  }
  return valid;
}

async function main() {
  console.log("Starting AppFolio listings sync...\n");

  const cards = await fetchListingsPage();

  if (cards.length === 0) {
    console.error("No listings found! Check if the AppFolio page structure changed.");
    process.exit(1);
  }

  const listings: Listing[] = [];
  const syncedAt = new Date().toISOString();

  for (const card of cards) {
    console.log(`  Fetching detail: ${card.address}`);
    const detail = await fetchListingDetail(card.id);

    console.log(`    Found ${detail.images.length} images, validating...`);
    const validImages = await validateImages(detail.images);
    console.log(`    ${validImages.length} valid images`);

    const { streetAddress, city, state, zip } = parseAddress(card.address);

    listings.push({
      id: card.id,
      slug: slugify(streetAddress),
      address: card.address,
      streetAddress,
      city,
      state,
      zip,
      rent: card.rent,
      rentFormatted: card.rentFormatted,
      beds: card.beds,
      baths: card.baths,
      sqft: card.sqft,
      availableDate: card.availableDate,
      availableDateFormatted: card.availableDateFormatted,
      description: detail.description,
      images: validImages,
      amenities: detail.amenities.length > 0 ? detail.amenities : card.amenitiesPreview ? card.amenitiesPreview.split(", ") : [],
      petPolicy: detail.petPolicy || card.petPolicyPreview || "Contact for pet policy",
      applicationFee: detail.applicationFee,
      securityDeposit: detail.securityDeposit,
      utilitiesNote: detail.utilitiesNote,
      applyUrl: `${BASE_URL}/listings/rental_applications/new?listable_uid=${card.id}&source=Website`,
      lat: card.lat,
      lng: card.lng,
      syncedAt,
    });
  }

  // Sort by rent descending
  listings.sort((a, b) => b.rent - a.rent);

  // Summary
  console.log("\n--- Sync Summary ---");
  for (const l of listings) {
    const imgStatus = l.images.length === 0 ? "⚠ NO IMAGES" : `${l.images.length} images`;
    console.log(`  ${l.streetAddress}: ${imgStatus}`);
  }

  const outPath = join(__dirname, "../src/data/listings.json");
  writeFileSync(outPath, JSON.stringify(listings, null, 2) + "\n");
  console.log(`\nWrote ${listings.length} listings to ${outPath}`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
