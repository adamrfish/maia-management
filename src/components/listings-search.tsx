"use client";

import { useState, useMemo, useId, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { LayoutGrid, Map as MapIcon, Search } from "lucide-react";
import type { Listing } from "@/types/listing";
import { ListingCard } from "@/components/listing-card";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion-primitives";

const ListingsMap = dynamic(
  () =>
    import("@/components/listings-map").then((mod) => ({
      default: mod.ListingsMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-cream-mid">
        <span className="text-[0.833rem] text-gray-text">Loading map...</span>
      </div>
    ),
  }
);

type ViewMode = "grid" | "map";

interface ListingsSearchProps {
  listings: Listing[];
}

export function ListingsSearch({ listings }: ListingsSearchProps) {
  const [view, setView] = useState<ViewMode>("map");
  const [beds, setBeds] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("all");
  const [petFriendly, setPetFriendly] = useState(false);
  const [moveIn, setMoveIn] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const id = useId();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return listings.filter((l) => {
      if (q) {
        const haystack = `${l.address} ${l.streetAddress} ${l.neighborhood ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
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
        if (!policy.includes("allowed") && !policy.includes("ok"))
          return false;
      }
      if (moveIn !== "all") {
        if (moveIn === "now" && l.availableDate !== "now") return false;
        if (moveIn === "30" || moveIn === "60") {
          if (l.availableDate === "now") return true;
          const availDate = new Date(l.availableDate);
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() + parseInt(moveIn, 10));
          if (availDate > cutoff) return false;
        }
      }
      return true;
    });
  }, [listings, beds, maxPrice, petFriendly, moveIn, search]);

  // Scroll sidebar to hovered card when marker is hovered on map
  const handleMarkerHover = useCallback((listingId: string | null) => {
    setHoveredListingId(listingId);
    if (listingId && sidebarRef.current) {
      const cardEl = cardRefs.current.get(listingId);
      if (cardEl) {
        const sidebar = sidebarRef.current;
        const cardTop = cardEl.offsetTop - sidebar.offsetTop;
        const cardBottom = cardTop + cardEl.offsetHeight;
        const scrollTop = sidebar.scrollTop;
        const viewHeight = sidebar.clientHeight;

        if (cardTop < scrollTop || cardBottom > scrollTop + viewHeight) {
          sidebar.scrollTo({
            top: cardTop - 16,
            behavior: "smooth",
          });
        }
      }
    }
  }, []);

  const bedsId = `${id}-beds`;
  const priceId = `${id}-price`;
  const moveInId = `${id}-movein`;

  const selectClass =
    "h-10 shrink-0 border border-border-light bg-white px-3 text-[0.833rem] outline-none focus-visible:border-dark";

  const activeFilterCount =
    (beds !== "all" ? 1 : 0) +
    (maxPrice !== "all" ? 1 : 0) +
    (petFriendly ? 1 : 0) +
    (moveIn !== "all" ? 1 : 0);

  const filterBar = (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
      {/* Row 1: search + view toggle (+ inline filters on md+) */}
      <div className="flex items-center gap-2 md:min-w-0 md:flex-1 md:gap-3">
        {/* Search input */}
        <div className="relative min-w-0 flex-1 md:flex-none">
          <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="h-10 w-full border border-border-light bg-white pl-8 pr-3 text-[0.833rem] outline-none placeholder:text-gray-text/50 focus-visible:border-dark md:w-44"
          />
        </div>

        {/* Inline filters — md and up */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <select
            id={bedsId}
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className={selectClass}
            aria-label="Bedrooms"
          >
            <option value="all">Beds</option>
            <option value="0">Studio</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3+ Beds</option>
          </select>

          <select
            id={priceId}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={selectClass}
            aria-label="Max price"
          >
            <option value="all">Price</option>
            <option value="1500">≤ $1,500</option>
            <option value="2000">≤ $2,000</option>
            <option value="2500">≤ $2,500</option>
            <option value="3000">≤ $3,000</option>
          </select>

          <select
            id={moveInId}
            value={moveIn}
            onChange={(e) => setMoveIn(e.target.value)}
            className={selectClass}
            aria-label="Move-in date"
          >
            <option value="all">Move-in</option>
            <option value="now">Available Now</option>
            <option value="30">Within 30 days</option>
            <option value="60">Within 60 days</option>
          </select>

          <button
            onClick={() => setPetFriendly(!petFriendly)}
            className={`h-10 shrink-0 border px-3 text-[0.833rem] transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-dark ${
              petFriendly
                ? "border-dark bg-dark text-cream"
                : "border-border-light bg-white hover:border-dark"
            }`}
          >
            Pets
          </button>

          <span className="hidden shrink-0 text-[0.694rem] tracking-[0.05em] text-gray-text lg:block">
            {filtered.length} {filtered.length === 1 ? "apt" : "apts"}
          </span>
        </div>

        {/* View toggle */}
        <div className="flex shrink-0 items-center border border-border-light bg-white p-0.5">
          <button
            onClick={() => setView("map")}
            className={`flex h-9 items-center justify-center gap-1.5 px-3 text-[0.694rem] tracking-[0.05em] transition-colors duration-200 ${
              view === "map"
                ? "bg-dark text-cream"
                : "text-gray-text hover:text-dark"
            }`}
            aria-label="Map view"
          >
            <MapIcon size={14} strokeWidth={1.5} />
            <span className="hidden md:inline">Map</span>
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex h-9 items-center justify-center gap-1.5 px-3 text-[0.694rem] tracking-[0.05em] transition-colors duration-200 ${
              view === "grid"
                ? "bg-dark text-cream"
                : "text-gray-text hover:text-dark"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} strokeWidth={1.5} />
            <span className="hidden md:inline">List</span>
          </button>
        </div>
      </div>

      {/* Row 2: filter pills (below md) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide md:hidden">
        <select
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          className={`${selectClass} ${beds !== "all" ? "!border-dark !bg-dark !text-cream" : ""}`}
          aria-label="Bedrooms"
        >
          <option value="all">Beds</option>
          <option value="0">Studio</option>
          <option value="1">1 Bed</option>
          <option value="2">2 Beds</option>
          <option value="3">3+ Beds</option>
        </select>

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={`${selectClass} ${maxPrice !== "all" ? "!border-dark !bg-dark !text-cream" : ""}`}
          aria-label="Max price"
        >
          <option value="all">Price</option>
          <option value="1500">≤ $1,500</option>
          <option value="2000">≤ $2,000</option>
          <option value="2500">≤ $2,500</option>
          <option value="3000">≤ $3,000</option>
        </select>

        <select
          value={moveIn}
          onChange={(e) => setMoveIn(e.target.value)}
          className={`${selectClass} ${moveIn !== "all" ? "!border-dark !bg-dark !text-cream" : ""}`}
          aria-label="Move-in date"
        >
          <option value="all">Move-in</option>
          <option value="now">Available Now</option>
          <option value="30">Within 30 days</option>
          <option value="60">Within 60 days</option>
        </select>

        <button
          onClick={() => setPetFriendly(!petFriendly)}
          className={`h-10 shrink-0 border px-3 text-[0.833rem] transition-colors duration-200 ${
            petFriendly
              ? "border-dark bg-dark text-cream"
              : "border-border-light bg-white hover:border-dark"
          }`}
        >
          Pets
        </button>

        <span className="shrink-0 text-[0.694rem] tracking-[0.05em] text-gray-text">
          {filtered.length} {filtered.length === 1 ? "apt" : "apts"}
        </span>
      </div>
    </div>
  );

  // --- Grid view ---
  if (view === "grid") {
    return (
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          {/* Sticky filter bar */}
          <div className="sticky top-[3.5rem] z-20 -mx-5 border-b border-border-light bg-cream-light px-5 py-3 md:-mx-10 md:px-10">
            {filterBar}
          </div>
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
              className="mt-6 grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((listing) => (
                <StaggerItem key={listing.id}>
                  <ListingCard listing={listing} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    );
  }

  // --- Map view ---
  return (
    <div className="px-5 md:px-10">
      <div className="mx-auto max-w-[75rem]">
        {/* Filter bar — sticky */}
        <div className="sticky top-[3.5rem] z-20 -mx-5 border-b border-border-light bg-cream px-5 py-3 md:-mx-10 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            {filterBar}
          </div>
        </div>

        {/* Desktop: split pane (sidebar + map) */}
        {/* Mobile: map on top, cards below */}
        <div className="flex flex-col lg:h-[calc(100dvh-6.5rem)] lg:flex-row">
          {/* Desktop sidebar — hidden on mobile */}
          <div
            ref={sidebarRef}
            className="hidden shrink-0 overflow-y-auto border-r border-border-light bg-cream-light lg:block lg:w-[24rem] xl:w-[28rem]"
          >
            <div className="px-5 pt-4 pb-2 text-[0.694rem] tracking-[0.05em] text-gray-text">
              {filtered.length}{" "}
              {filtered.length === 1 ? "apartment" : "apartments"} available
            </div>

            {filtered.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-[0.833rem] text-gray-text">
                  No listings match your filters.
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {filtered.map((listing) => (
                  <div
                    key={listing.id}
                    ref={(el) => {
                      if (el) cardRefs.current.set(listing.id, el);
                      else cardRefs.current.delete(listing.id);
                    }}
                    className={`border-b border-border-light px-5 py-4 transition-colors duration-150 ${
                      hoveredListingId === listing.id ? "bg-cream-mid" : ""
                    }`}
                    onMouseEnter={() => setHoveredListingId(listing.id)}
                    onMouseLeave={() => setHoveredListingId(null)}
                  >
                    <ListingCard listing={listing} compact />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-[45dvh] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1">
            <ListingsMap
              listings={filtered}
              hoveredListingId={hoveredListingId}
              onMarkerHover={handleMarkerHover}
              className="h-full w-full"
            />
          </div>

          {/* Mobile: listing cards below the map */}
          <div className="lg:hidden">
            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[0.833rem] text-gray-text">
                  No listings match your filters.
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                {filtered.map((listing) => (
                  <div
                    key={listing.id}
                    className="border-b border-border-light px-5 py-4"
                  >
                    <ListingCard listing={listing} compact />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
