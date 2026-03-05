import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/ui/motion-primitives";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Maia Management. Schedule a showing, ask about available apartments, or inquire about property management services in Miami.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="relative z-10 pb-16 pt-8 text-center md:pb-20">
              <FadeIn>
                <h1 className="text-[1.728rem] font-medium tracking-[0.025em] md:text-[2.074rem]">
                  How can we assist you?
                </h1>
                <p className="mx-auto mt-4 max-w-[44rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                  Reach out to us for personalized support and expert advice on
                  all your real estate needs. Our team is here to answer your
                  questions and guide you every step of the way.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="border-t border-dark/10" />
            <div className="grid grid-cols-1 gap-16 py-16 md:grid-cols-[1fr_1.5fr] md:py-24">
              {/* Left: contact details */}
              <div>
                <div className="text-[0.694rem] font-medium uppercase tracking-[0.15em] text-gray-text">
                  Get in touch
                </div>
                <div className="mt-6 flex flex-col gap-4 text-[0.833rem] leading-[1.7] tracking-[0.05em]">
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+17868411341" className="text-gray-text transition-colors hover:text-dark">
                      (786) 841-1341
                    </a>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:info@maiamgmt.com" className="text-gray-text transition-colors hover:text-dark">
                      info@maiamgmt.com
                    </a>
                  </div>
                  <div>
                    <div className="font-medium">Office</div>
                    <p className="text-gray-text">420 Lincoln Road Suite 258</p>
                    <p className="text-gray-text">Miami Beach, FL 33139</p>
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <FadeIn delay={0.1}>
                  <Suspense
                    fallback={
                      <div className="border border-dark/10 bg-white p-6 sm:p-8 md:p-10">
                        <div className="h-3 w-24 animate-pulse bg-cream-mid" />
                        <div className="mb-6 mt-2 border-t border-dark/10" />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div className="h-12 animate-pulse bg-cream-mid" />
                          <div className="h-12 animate-pulse bg-cream-mid" />
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <div className="h-12 animate-pulse bg-cream-mid" />
                          <div className="h-12 animate-pulse bg-cream-mid" />
                        </div>
                        <div className="mt-10 h-3 w-24 animate-pulse bg-cream-mid" />
                        <div className="mb-6 mt-2 border-t border-dark/10" />
                        <div className="h-12 animate-pulse bg-cream-mid" />
                        <div className="mt-5 h-32 animate-pulse bg-cream-mid" />
                        <div className="mt-8 h-12 animate-pulse bg-dark/10" />
                      </div>
                    }
                  >
                    <ContactForm />
                  </Suspense>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
