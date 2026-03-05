import type { MetadataRoute } from "next";
import { getAllListings } from "@/lib/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const listings = getAllListings();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://maiamgmt.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://maiamgmt.com/listings",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://maiamgmt.com/management",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://maiamgmt.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://maiamgmt.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://maiamgmt.com/management-inquiry",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `https://maiamgmt.com/listings/${listing.slug}`,
    lastModified: new Date(listing.syncedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...listingPages];
}
