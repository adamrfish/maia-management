import type { Listing } from "@/types/listing";
import listingsData from "@/data/listings.json";

const listings = listingsData as Listing[];

export function getAllListings(): Listing[] {
  return listings;
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function getRelatedListings(currentSlug: string, count: number = 2): Listing[] {
  return listings.filter((l) => l.slug !== currentSlug).slice(0, count);
}

export function getFeaturedListings(count: number = 3): Listing[] {
  // Most recently synced first (proxy for "newest in feed")
  return [...listings]
    .sort((a, b) => new Date(b.syncedAt).getTime() - new Date(a.syncedAt).getTime())
    .slice(0, count);
}
