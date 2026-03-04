"use client";

import { motion } from "@/components/ui/motion-primitives";
import type { Listing } from "@/types/listing";

interface ListingMobileBarProps {
  listing: Listing;
}

export function ListingMobileBar({ listing }: ListingMobileBarProps) {
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bd`;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-light bg-white px-5 py-3 md:hidden"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[1rem] font-semibold tracking-[0.025em]">
            {listing.rentFormatted}
            <span className="text-[0.694rem] font-normal text-gray-text">/mo</span>
          </div>
          <div className="text-[0.694rem] tracking-[0.05em] text-gray-text">
            {bedsLabel} · {listing.baths} ba · {listing.sqft} sqft
          </div>
        </div>
        <a
          href={listing.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-dark px-6 py-3 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-dark/90"
        >
          Apply Now
        </a>
      </div>
    </motion.div>
  );
}
