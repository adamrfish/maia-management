"use client";

import { useState, useMemo, useId } from "react";
import type { Listing } from "@/types/listing";
import { ListingCard } from "@/components/listing-card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion-primitives";

interface ListingsFilterProps {
  listings: Listing[];
}

export function ListingsFilter({ listings }: ListingsFilterProps) {
  const [beds, setBeds] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("all");
  const [petFriendly, setPetFriendly] = useState(false);
  const id = useId();

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (beds !== "all") {
        const bedCount = parseInt(beds, 10);
        if (l.beds !== bedCount) return false;
      }
      if (maxPrice !== "all") {
        const max = parseInt(maxPrice, 10);
        if (l.rent > max) return false;
      }
      if (petFriendly) {
        const policy = l.petPolicy.toLowerCase();
        if (!policy.includes("allowed") && !policy.includes("ok")) return false;
      }
      return true;
    });
  }, [listings, beds, maxPrice, petFriendly]);

  const bedsId = `${id}-beds`;
  const priceId = `${id}-price`;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={bedsId}
            className="text-[0.694rem] uppercase tracking-[0.125em] text-gray-text"
          >
            Bedrooms
          </label>
          <select
            id={bedsId}
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className="h-10 border border-border-light bg-white px-4 text-[0.833rem] outline-none focus-visible:border-dark"
          >
            <option value="all">All</option>
            <option value="0">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={priceId}
            className="text-[0.694rem] uppercase tracking-[0.125em] text-gray-text"
          >
            Max Price
          </label>
          <select
            id={priceId}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-10 border border-border-light bg-white px-4 text-[0.833rem] outline-none focus-visible:border-dark"
          >
            <option value="all">Any</option>
            <option value="1500">Up to $1,500</option>
            <option value="2000">Up to $2,000</option>
            <option value="2500">Up to $2,500</option>
            <option value="3000">Up to $3,000</option>
          </select>
        </div>

        <button
          onClick={() => setPetFriendly(!petFriendly)}
          className={`h-10 border px-4 text-[0.833rem] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-dark ${
            petFriendly
              ? "border-dark bg-dark text-cream"
              : "border-border-light bg-white hover:border-dark"
          }`}
        >
          Pet-friendly
        </button>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[0.833rem] text-gray-text">
            No listings match your filters. Try adjusting your criteria.
          </p>
        </div>
      ) : (
        <StaggerContainer
          stagger={0.08}
          delay={0.1}
          className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((listing) => (
            <StaggerItem key={listing.id}>
              <ListingCard listing={listing} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </>
  );
}
