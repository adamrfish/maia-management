import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllListings } from "@/lib/listings";
import { ListingsSearch } from "@/components/listings-search";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Available Apartments",
  description:
    "Browse available rental apartments in Miami Beach and Miami managed by Maia Management.",
};

export default function ListingsPage() {
  const listings = getAllListings();

  return (
    <>
      <section className="bg-cream-light">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Apartments" }]} />
          </div>
        </div>
      </section>
      <section className="bg-cream-light">
        <Suspense
          fallback={
            <div className="flex h-[60vh] items-center justify-center">
              <span className="text-[0.833rem] text-gray-text">Loading listings...</span>
            </div>
          }
        >
          <ListingsSearch listings={listings} />
        </Suspense>
      </section>
    </>
  );
}
