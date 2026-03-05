import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "@/components/faq-section";
import { FadeIn } from "@/components/ui/motion-primitives";
import { HeroBackground } from "@/components/hero-background";
import { HeroContent } from "@/components/hero-content";
import { HeroListingsSlider } from "@/components/hero-listings-slider";
import { HomepageMap } from "@/components/homepage-map";
import { OfficeMap } from "@/components/office-map";
import { getAllListings, getFeaturedListings } from "@/lib/listings";

const teamMembers = [
  {
    name: "Gediminas Bulota",
    photo: "/team/gediminas-bulota.jpg",
  },
  {
    name: "Natalia Castano",
    photo: "/team/natalia-castano.jpg",
  },
];

const homeFAQ = [
  {
    question: "How can I schedule a showing before applying?",
    answer:
      "Contact us either through email at info@maiamgmt.com or via phone at (786) 905-8078 to schedule a showing for any of our available apartments.",
  },
  {
    question: "How do I apply to rent a property?",
    answer:
      'When you find an apartment you like on our "Find Apartments" page, you can click the "Apply Now" button, which will take you to our online application form.',
  },
  {
    question: "What is the screening process?",
    answer:
      "Maia will run a credit check, along with a background check, to determine your eligibility. We will also ask for proof of income, which can be in the form of pay stubs, an offer letter, or full bank statements in PDF format.",
  },
  {
    question: "Do you allow pets?",
    answer: "Maia loves pets!",
  },
  {
    question: "How does maintenance work?",
    answer:
      "We pride ourselves on offering best-in-class maintenance services for all residents. Simply create a new work order on your online portal and we will reach out within 24 hours.",
  },
  {
    question: "What is the process for paying rent?",
    answer: "All rent payments are made through your online portal.",
  },
  {
    question: "How long are the lease terms?",
    answer:
      "Maia offers leases ranging from 6 months up to 18 months.",
  },
];

export default function HomePage() {
  const listings = getFeaturedListings(8);
  const allListings = getAllListings();

  return (
    <>
      {/* Tree background — fixed for a bit, then scrolls out */}
      <HeroBackground />

      {/* Hero Section */}
      <section className="relative bg-transparent">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="pb-20 pt-40 md:pb-28 md:pt-48">
              <HeroContent />

              {/* Available now — slider when 3+, static grid when 1-2, hidden when 0 */}
              <HeroListingsSlider listings={listings} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative z-[1] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="border-t border-dark/10" />
            <div className="py-16 md:py-24">
              <FadeIn>
                <HomepageMap listings={allListings} />
              </FadeIn>
            </div>
            <div className="border-t border-dark/10" />
          </div>
        </div>
      </section>

      {/* Love Where You Live */}
      <section className="relative z-[1] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="py-24 md:py-32">
              <FadeIn>
                <div className="text-center">
                  <p className="text-[0.694rem] uppercase tracking-[0.125em]">
                    Get started
                  </p>
                  <h2 className="mt-6 mb-6 text-[1.44rem] font-medium tracking-[0.025em] md:text-[1.728rem]">
                    Love where you live
                  </h2>
                  <p className="mx-auto max-w-[44rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    Your home should feel like a community, not just an address. We
                    treat every resident like a neighbor and every property manager
                    inquiry like it matters. That&apos;s the peace of mind that comes
                    with living with Maia.
                  </p>
                </div>
              </FadeIn>

              {/* Top grid: chair image + apartments card */}
              <FadeIn delay={0.1}>
                <div className="mt-12 grid grid-cols-1 gap-12 md:gap-24 md:grid-cols-[1fr_1.5fr]">
                  {/* Find Apartments */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <Image
                      src="/hero-pool.webp"
                      alt="Luxury pool in Miami Beach"
                      width={850}
                      height={500}
                      className="mb-8 w-full md:mt-8"
                    />
                    <div className="text-[0.833rem] font-medium tracking-[0.05em] mb-4">
                      Find apartments
                    </div>
                    <p className="text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text text-center">
                      Love where you live and be excited to come home every day.
                      Maia has a variety of beautiful apartments waiting for you.
                    </p>
                    <Link
                      href="/listings"
                      className="link-underline mt-4 inline-block pb-1 text-[0.833rem]"
                    >
                      Browse apartments
                    </Link>
                  </div>
                  {/* Desktop: chair image */}
                  <div className="hidden md:block">
                    <Image
                      src="/chair.webp"
                      alt=""
                      width={1358}
                      height={900}
                      className="w-full"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Bottom grid: coffee image + manage property */}
              <FadeIn delay={0.1}>
                <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:gap-32 md:grid-cols-[1.5fr_1fr] md:pl-12 md:pr-4">
                  <div>
                    <Image
                      src="/coffee.webp"
                      alt=""
                      width={940}
                      height={600}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-[0.833rem] font-medium tracking-[0.05em] mb-4">
                      Manage property
                    </div>
                    <p className="text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text text-center">
                      Maia&apos;s property management services are designed to
                      provide comprehensive care for your property. We handle
                      everything from tenant relations and lease management to
                      maintenance and repairs, ensuring a seamless experience for
                      property owners.
                    </p>
                    <p className="mt-3 text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text text-center">
                      Our proactive approach minimizes vacancies and maximizes the
                      property&apos;s value. With a dedicated team and personalized
                      attention, we ensure every detail is meticulously managed.
                    </p>
                    <Link
                      href="/management"
                      className="link-underline mt-4 inline-block pb-1 text-[0.833rem]"
                    >
                      Our management services
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Team + Office */}
      <section className="relative z-[1] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="border-t border-dark/10" />
            <div className="py-16 md:py-24">
              <FadeIn>
                <div className="text-center">
                  <p className="text-[0.694rem] uppercase tracking-[0.125em]">
                    Our team
                  </p>
                  <h2 className="mt-4 text-[1.44rem] font-medium tracking-[0.025em] md:text-[1.728rem]">
                    Meet the people behind Maia
                  </h2>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 md:gap-12">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="text-center">
                      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-dark/10 md:h-36 md:w-36">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 7rem, 9rem"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-[0.833rem] font-medium tracking-[0.05em]">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="link-underline mx-auto mt-8 block w-fit pb-1 text-[0.833rem]"
                >
                  Learn more about us
                </Link>

                {/* Office map */}
                <div className="mt-14">
                  <div className="mb-4 text-center text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
                    Our office
                  </div>
                  <OfficeMap />
                  <p className="mt-4 text-center text-[0.833rem] tracking-[0.05em] text-gray-text">
                    420 Lincoln Road Suite 258, Miami Beach, FL 33139
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-[1] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[48rem]">
            <div className="border-t border-dark/10" />
            <div className="py-16 md:py-24">
              <FadeIn>
                <FAQSection items={homeFAQ} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
