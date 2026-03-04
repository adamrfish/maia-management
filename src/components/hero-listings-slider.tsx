"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Listing } from "@/types/listing";
import { HeroListingCard } from "@/components/hero-listing-card";
import { MountFadeIn } from "@/components/ui/motion-primitives";

interface HeroListingsSliderProps {
  listings: Listing[];
  /** Mount animation delay for the heading */
  headingDelay?: number;
  /** Mount animation delay for cards (staggered per card) */
  cardDelay?: number;
  /** TypeOut delay passed to HeroListingCard */
  typeDelay?: number;
}

export function HeroListingsSlider({
  listings,
  headingDelay = 1.5,
  cardDelay = 1.65,
  typeDelay = 2.35,
}: HeroListingsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const needsSlider = listings.length >= 3;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    if (!needsSlider) return;
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(checkScroll, 100);
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [needsSlider, checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slider-card]");
    const scrollAmount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Nothing to show
  if (listings.length === 0) return null;

  // 1–2 listings: static grid, no slider
  if (!needsSlider) {
    return (
      <div className="relative z-10">
        <div className="mx-auto mt-14 max-w-[72rem]">
          <MountFadeIn delay={headingDelay}>
            <div className="mb-6 text-center text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
              Available now
            </div>
          </MountFadeIn>
          <div
            className={`grid gap-4 ${
              listings.length === 1
                ? "mx-auto max-w-[24rem] grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {listings.map((listing, i) => (
              <MountFadeIn key={listing.id} delay={cardDelay + i * 0.1}>
                <HeroListingCard
                  listing={listing}
                  typeDelay={typeDelay + i * 0.1}
                />
              </MountFadeIn>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3+ listings: horizontal slider
  return (
    <div className="relative z-10">
      <div className="mx-auto mt-14 max-w-[72rem]">
        <MountFadeIn delay={headingDelay}>
          <div className="mb-6 text-center text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
            Available now
          </div>
        </MountFadeIn>

        <MountFadeIn delay={cardDelay}>
          <div className="relative">
            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
            >
              {listings.map((listing, i) => (
                <div
                  key={listing.id}
                  data-slider-card
                  className="w-[85%] flex-shrink-0 snap-start sm:w-[48%] lg:w-[calc(33.333%-0.667rem)]"
                >
                  <HeroListingCard
                    listing={listing}
                    typeDelay={typeDelay + i * 0.1}
                  />
                </div>
              ))}
            </div>

            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-dark/20 bg-white shadow-sm transition-all duration-200 hover:scale-110 hover:border-dark/40 md:-left-5"
                aria-label="Previous listings"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
            )}

            {/* Right arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute -right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-dark/20 bg-white shadow-sm transition-all duration-200 hover:scale-110 hover:border-dark/40 md:-right-5"
                aria-label="Next listings"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </MountFadeIn>
      </div>
    </div>
  );
}
