"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";

const MAX_IMAGES = 5;

interface ListingCardProps {
  listing: Listing;
  carousel?: boolean;
  compact?: boolean;
}

export function ListingCard({ listing, carousel, compact }: ListingCardProps) {
  const images = listing.images.slice(0, MAX_IMAGES);
  const [current, setCurrent] = useState(0);
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bd`;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
    },
    [images.length]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));
    },
    [images.length]
  );

  const imageCarousel = (
    <div className="relative h-full w-full overflow-hidden">
      {images.length > 0 ? (
        <>
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={img.url}
                alt={i === 0 ? listing.streetAddress : ""}
                fill
                sizes={compact ? "(max-width: 1024px) 100vw, 28rem" : carousel ? "22rem" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                className="object-cover"
              />
            </div>
          ))}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark opacity-0 shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7.5 2 3.5 6l4 4" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark opacity-0 shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4.5 2 8.5 6l-4 4" />
                </svg>
              </button>
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 rounded-full transition-all duration-300 ${
                      i === current ? "w-2.5 bg-white" : "w-1 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-cream-mid">
          <span className="text-[0.694rem] text-gray-text">No photo</span>
        </div>
      )}
    </div>
  );

  if (compact) {
    return (
      <Link href={`/listings/${listing.slug}`} className="group block">
        <div className="relative aspect-[3/2] overflow-hidden">
          {imageCarousel}
        </div>
        <div className="pt-4">
          <div className="text-[1.1rem] font-medium tracking-[0.025em]">
            {listing.rentFormatted}
            <span className="text-[0.75rem] font-normal text-gray-text">/mo</span>
          </div>
          <div className="mt-1 text-[0.694rem] tracking-[0.05em] text-gray-text">
            {bedsLabel} · {listing.baths} ba · {listing.sqft} sqft
          </div>
          <div className="mt-1 text-[0.694rem] tracking-[0.05em]">
            {listing.streetAddress}
          </div>
          {listing.neighborhood && (
            <div className="mt-0.5 text-[0.579rem] uppercase tracking-[0.1em] text-gray-text">
              {listing.neighborhood}
            </div>
          )}
          <div className="mt-2 text-[0.579rem] font-medium uppercase tracking-[0.075em] text-gray-text">
            {listing.availableDate === "now"
              ? "Available Now"
              : listing.availableDateFormatted}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={`group flex flex-col transition-transform duration-500 hover:-translate-y-1 ${
        carousel ? "w-[22rem] flex-shrink-0" : "w-full"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {imageCarousel}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-dark/80 px-3 py-1.5 text-[0.694rem] font-medium tracking-wider text-cream">
            {listing.availableDate === "now"
              ? "Available Now"
              : listing.availableDateFormatted}
          </span>
        </div>
      </div>

      <div className="pt-4">
        <div className="text-[1.2rem] font-medium tracking-[0.05em]">
          {listing.rentFormatted}
          <span className="text-[0.833rem] font-normal text-gray-text">/mo</span>
        </div>
        <div className="mt-1 text-[0.833rem] tracking-[0.05em]">
          <span className="font-medium">{bedsLabel}</span>
          {" | "}
          <span className="font-medium">{listing.baths}</span> ba
          {" | "}
          <span className="font-medium">{listing.sqft}</span> sqft
        </div>
        <div className="mt-2 text-[0.694rem] tracking-[0.05em] text-gray-text">
          {listing.address}
        </div>
        {listing.neighborhood && (
          <div className="mt-0.5 text-[0.579rem] uppercase tracking-[0.1em] text-gray-text">
            {listing.neighborhood}
          </div>
        )}
      </div>
    </Link>
  );
}
