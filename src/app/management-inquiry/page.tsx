import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Management Inquiry",
  description:
    "Interested in professional property management for your Miami property? Submit an inquiry and our team will be in touch.",
};

export default function ManagementInquiryPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Management", href: "/management" }, { label: "Inquiry" }]} />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-cream">
        <Image
          src="/leaf-left.webp"
          alt=""
          width={1218}
          height={800}
          className="pointer-events-none absolute left-0 top-0 z-0 h-[10rem] w-auto md:h-[16rem]"
        />
        <Image
          src="/palm-right.webp"
          alt=""
          width={837}
          height={600}
          className="pointer-events-none absolute right-0 top-0 z-0 h-[15rem] w-auto md:h-[25rem]"
        />

        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="relative z-10 py-16 text-center md:py-24">
              <FadeIn>
                <p className="font-montserrat text-[0.694rem] font-normal uppercase tracking-[0.125em] text-dark">
                  Management Inquiry
                </p>
                <h2 className="mt-6 mb-6 font-montserrat text-[1.728rem] font-medium leading-[1.7] tracking-[0.025em] text-dark">
                  Tell us about your property
                </h2>
                <p className="mx-auto max-w-[48rem] font-montserrat text-[0.833rem] font-normal leading-[1.7] tracking-[0.05em] text-dark">
                  Fill out the form below and our team will reach out to discuss
                  how we can help manage your property.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[48rem]">
            <div className="py-24 md:py-32 pt-0">
              <FadeIn delay={0.2}>
                <Suspense>
                  <ContactForm variant="inquiry" />
                </Suspense>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
