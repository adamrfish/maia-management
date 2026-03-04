import { BedDouble, Bath, Maximize, PawPrint } from "lucide-react";
import type { Listing } from "@/types/listing";

interface ListingHighlightsProps {
  listing: Listing;
}

export function ListingHighlights({ listing }: ListingHighlightsProps) {
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds}`;
  const bedsSubLabel = listing.beds === 0 ? "" : listing.beds === 1 ? "Bedroom" : "Bedrooms";
  const bathsLabel = `${listing.baths}`;
  const bathsSubLabel = listing.baths === 1 ? "Bathroom" : "Bathrooms";
  const petFriendly = listing.petPolicy.toLowerCase().includes("allowed");

  const highlights = [
    { icon: BedDouble, value: bedsLabel, label: bedsSubLabel || "Studio" },
    { icon: Bath, value: bathsLabel, label: bathsSubLabel },
    { icon: Maximize, value: listing.sqft.toLocaleString(), label: "Sq Ft" },
    { icon: PawPrint, value: petFriendly ? "Yes" : "No", label: "Pet Friendly" },
  ];

  return (
    <div className="border-y border-border-light py-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-dark/20">
              <item.icon size={18} strokeWidth={1.5} className="text-gray-text" />
            </div>
            <div>
              <div className="text-[1rem] font-medium tracking-[0.025em]">
                {item.value}
              </div>
              <div className="text-[0.694rem] tracking-[0.05em] text-gray-text">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
