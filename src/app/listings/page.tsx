import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, MapPin, FileCheck } from "lucide-react";
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
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Apartments" }]} />
          </div>
        </div>
        <Suspense
          fallback={
            <div className="px-5 md:px-10">
              <div className="mx-auto max-w-[75rem]">
                <div className="border-b border-border-light py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-44 animate-pulse bg-cream-mid" />
                    <div className="hidden h-10 w-20 animate-pulse bg-cream-mid md:block" />
                    <div className="hidden h-10 w-20 animate-pulse bg-cream-mid md:block" />
                    <div className="ml-auto h-10 w-24 animate-pulse bg-cream-mid" />
                  </div>
                </div>
                <div className="flex flex-col lg:h-[calc(100dvh-6.5rem)] lg:flex-row">
                  <div className="hidden shrink-0 lg:block lg:w-[24rem] xl:w-[28rem]">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="border-b border-border-light px-5 py-4">
                        <div className="aspect-[3/2] w-full animate-pulse bg-cream-mid" />
                        <div className="mt-3 h-5 w-24 animate-pulse bg-cream-mid" />
                        <div className="mt-2 h-3 w-36 animate-pulse bg-cream-mid" />
                      </div>
                    ))}
                  </div>
                  <div className="h-[45dvh] shrink-0 animate-pulse bg-cream-mid lg:h-auto lg:min-h-0 lg:flex-1" />
                </div>
              </div>
            </div>
          }
        >
          <ListingsSearch listings={listings} />
        </Suspense>
      </section>

      {/* Living experience section */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="border-t border-dark/10" />
            <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 md:py-24">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-dark/10 bg-white">
                  <ShieldCheck size={20} strokeWidth={1.5} className="text-gray-text" />
                </div>
                <div className="text-[0.694rem] font-medium uppercase tracking-[0.15em] text-gray-text">
                  Professionally managed
                </div>
                <h2 className="mt-3 text-[1.2rem] font-medium tracking-[0.025em]">
                  Move in with confidence
                </h2>
                <p className="mt-3 text-[0.833rem] leading-[1.8] text-gray-text">
                  Every apartment is maintained by our in-house team. From the
                  moment you walk in, everything works — and if it doesn&apos;t, we&apos;re
                  a message away.
                </p>
              </div>
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-dark/10 bg-white">
                  <MapPin size={20} strokeWidth={1.5} className="text-gray-text" />
                </div>
                <div className="text-[0.694rem] font-medium uppercase tracking-[0.15em] text-gray-text">
                  Local expertise
                </div>
                <h2 className="mt-3 text-[1.2rem] font-medium tracking-[0.025em]">
                  We know these neighborhoods
                </h2>
                <p className="mt-3 text-[0.833rem] leading-[1.8] text-gray-text">
                  South Beach, Mid-Beach, Brickell, Coral Gables — we manage
                  properties across Miami&apos;s best areas and can help you find
                  exactly what you&apos;re looking for.
                </p>
              </div>
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-dark/10 bg-white">
                  <FileCheck size={20} strokeWidth={1.5} className="text-gray-text" />
                </div>
                <div className="text-[0.694rem] font-medium uppercase tracking-[0.15em] text-gray-text">
                  Seamless experience
                </div>
                <h2 className="mt-3 text-[1.2rem] font-medium tracking-[0.025em]">
                  Leasing made simple
                </h2>
                <p className="mt-3 text-[0.833rem] leading-[1.8] text-gray-text">
                  Tour scheduling, applications, and lease signing — all handled
                  directly with our team. No runaround, no middlemen.
                </p>
              </div>
            </div>
            <div className="flex justify-center border-t border-border-light py-12">
              <Link
                href="/contact?reason=Schedule+a+Showing"
                className="border border-dark bg-dark px-8 py-3.5 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
              >
                Schedule a tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
