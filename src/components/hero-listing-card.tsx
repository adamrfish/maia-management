"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/listing";
import { TypeOut } from "@/components/ui/motion-primitives";

const MAX_IMAGES = 5;

interface HeroListingCardProps {
  listing: Listing;
  /** Delay in seconds before typewriter starts (to wait for card fade-in) */
  typeDelay?: number;
}

export function HeroListingCard({ listing, typeDelay = 0 }: HeroListingCardProps) {
  const images = listing.images.slice(0, MAX_IMAGES);
  const [current, setCurrent] = useState(0);
  const bedsLabel = listing.beds === 0 ? "Studio" : `${listing.beds} bd`;
  const touchStart = useRef<number | null>(null);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 30) {
        e.preventDefault();
        setCurrent((i) =>
          delta < 0
            ? (i + 1) % images.length
            : (i - 1 + images.length) % images.length
        );
      }
      touchStart.current = null;
    },
    [images.length]
  );

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex h-full overflow-hidden border border-border-light bg-white transition-colors duration-200 hover:border-dark/30"
    >
      {/* Image carousel — 1/3 width, aspect ratio for intrinsic height */}
      <div
        className="relative aspect-[4/3] w-1/3 flex-shrink-0 overflow-hidden bg-cream-mid"
        onTouchStart={images.length > 1 ? handleTouchStart : undefined}
        onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
      >
        {images.length > 0 ? (
          <>
            <div className="absolute inset-0 animate-shimmer" />
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={img.url}
                  alt={i === 0 ? listing.streetAddress : ""}
                  fill
                  sizes="11rem"
                  className="relative z-[1] object-cover"
                />
              </div>
            ))}

            {/* Nav arrows — always visible on touch, hover on desktop */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 opacity-70 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7.5 2 3.5 6l4 4" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark shadow-sm transition-all duration-200 hover:bg-white hover:scale-110 opacity-70 md:opacity-0 md:group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 2 8.5 6l-4 4" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 gap-1">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-2.5 bg-white"
                          : "w-1 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-mid">
            <span className="text-[0.579rem] text-gray-text">No photo</span>
          </div>
        )}
      </div>

      {/* Details — typed out after card fades in */}
      <div className="flex min-w-0 flex-col justify-center px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="truncate text-[0.9rem] font-medium tracking-[0.025em] sm:text-[1rem]">
          <TypeOut
            text={`${listing.rentFormatted}/mo`}
            delay={typeDelay}
            speed={35}
          />
        </div>
        <div className="mt-1 truncate text-[0.64rem] tracking-[0.05em] text-gray-text sm:mt-1.5 sm:text-[0.694rem]">
          <TypeOut
            text={`${bedsLabel} · ${listing.baths} ba · ${listing.sqft} sqft`}
            delay={typeDelay + 0.4}
            speed={25}
          />
        </div>
        <div className="mt-1 truncate text-[0.64rem] tracking-[0.05em] sm:mt-1.5 sm:text-[0.694rem]">
          <TypeOut
            text={listing.streetAddress}
            delay={typeDelay + 0.8}
            speed={25}
          />
        </div>
        <div className="mt-1 text-[0.54rem] font-medium uppercase tracking-[0.1em] text-gray-text sm:mt-1.5 sm:text-[0.579rem]">
          <TypeOut
            text={
              listing.availableDate === "now"
                ? "Available Now"
                : listing.availableDateFormatted ?? ""
            }
            delay={typeDelay + 1.2}
            speed={30}
          />
        </div>
      </div>
    </Link>
  );
}
