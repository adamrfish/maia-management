"use client";

import { Share2, Heart } from "lucide-react";

export function ListingShareSave() {
  return (
    <div className="flex items-center gap-2">
      <button
        className="flex h-9 items-center gap-1.5 border border-border-light px-3 text-[0.694rem] tracking-[0.05em] text-gray-text transition-colors duration-200 hover:border-dark hover:text-dark"
        aria-label="Share listing"
        onClick={() => {
          void navigator.clipboard.writeText(window.location.href);
        }}
      >
        <Share2 size={14} strokeWidth={1.5} />
        Share
      </button>
      <button
        className="flex h-9 items-center gap-1.5 border border-border-light px-3 text-[0.694rem] tracking-[0.05em] text-gray-text transition-colors duration-200 hover:border-dark hover:text-dark"
        aria-label="Save listing"
      >
        <Heart size={14} strokeWidth={1.5} />
        Save
      </button>
    </div>
  );
}
