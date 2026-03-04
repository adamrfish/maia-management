"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { Listing } from "@/types/listing";

const ListingsMap = dynamic(
  () =>
    import("@/components/listings-map").then((mod) => ({
      default: mod.ListingsMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-cream-mid animate-pulse" />
    ),
  }
);

interface HomepageMapProps {
  listings: Listing[];
}

export function HomepageMap({ listings }: HomepageMapProps) {
  return (
    <div>
      <div className="text-center">
        <p className="text-[0.694rem] uppercase tracking-[0.125em]">
          Our neighborhoods
        </p>
        <h2 className="mt-4 text-[1.44rem] font-medium tracking-[0.025em] md:text-[1.728rem]">
          Apartments available
        </h2>
      </div>

      <div className="mt-10 overflow-hidden border border-border-light">
        <ListingsMap
          listings={listings}
          hoveredListingId={null}
          onMarkerHover={() => {}}
          className="h-[24rem] w-full md:h-[28rem]"
        />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/listings"
          className="inline-block border border-dark bg-dark px-8 py-3.5 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
        >
          Browse all apartments
        </Link>
        <p className="mx-auto mt-6 max-w-[44rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
          From the art deco charm of South Beach to the vibrant culture of
          Little Havana, we manage apartments in Miami&apos;s most
          sought-after neighborhoods. Every listing is personally vetted by
          our team so you can find a place that feels like home.
        </p>
      </div>
    </div>
  );
}
