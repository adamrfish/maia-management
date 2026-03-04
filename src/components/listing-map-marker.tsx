"use client";

import type { Listing } from "@/types/listing";

interface ListingMapMarkerProps {
  listing: Listing;
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ListingMapMarker({
  listing,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ListingMapMarkerProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`rounded-full px-4 py-2 text-[0.8rem] font-bold leading-none shadow-md transition-all duration-150 ${
        active
          ? "bg-cream text-dark scale-110 shadow-lg"
          : "bg-dark text-cream hover:bg-cream hover:text-dark hover:shadow-lg"
      }`}
      aria-label={`${listing.streetAddress} — ${listing.rentFormatted}`}
    >
      {listing.rentFormatted}
    </button>
  );
}
