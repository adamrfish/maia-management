import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Browse our portfolio of beautifully managed properties across Miami Beach and Miami.",
};

export default function ShowcasePage() {
  return (
    <section className="relative bg-cream">
      <Image
        src="/leaf-left.png"
        alt=""
        width={1218}
        height={800}
        className="pointer-events-none absolute left-0 top-0 z-0 h-[16rem] w-auto"
      />
      <Image
        src="/palm-right.png"
        alt=""
        width={837}
        height={600}
        className="pointer-events-none absolute right-0 top-0 z-0 h-[25rem] w-auto"
      />

      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          <div className="relative z-10 py-52 text-center">
            <p className="font-montserrat text-[0.694rem] font-normal uppercase tracking-[0.125em] text-dark">
              Showcase
            </p>
            <h2 className="mt-6 mb-6 font-montserrat text-[1.728rem] font-medium leading-[1.7] tracking-[0.025em] text-dark">
              Our Properties
            </h2>
            <p className="mx-auto max-w-[48rem] font-montserrat text-[0.833rem] font-normal leading-[1.7] tracking-[0.05em] text-gray-text">
              Coming soon — check back for our full property showcase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
