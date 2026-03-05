import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "@/components/faq-section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion-primitives";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "Comprehensive property management services in Miami. From leasing and maintenance to financial reporting, Maia handles everything for property owners.",
};

const services = [
  {
    icon: "/icons/vendor-network.png",
    title: "Vendor Network",
    description:
      "We partner with reliable vendors to streamline operations and negotiate better rates, offering cost savings, improved efficiency, and reduced liability.",
  },
  {
    icon: "/icons/financial-reporting.png",
    title: "Financial Reporting",
    description:
      "We provide property owners an easy and efficient way to monitor their investments with detailed and accurate financial reports.",
  },
  {
    icon: "/icons/rent-collection.png",
    title: "Rent Collection",
    description:
      "We handle all aspects of the rental collection process, ensuring timely and consistent rental income for our property owners.",
  },
  {
    icon: "/icons/repairs.png",
    title: "Repair & Maintenance",
    description:
      "From move-in and move-out inspections to unit turnover and addressing maintenance requests — we keep your property in top condition.",
  },
  {
    icon: "/icons/tenant-screening.png",
    title: "Tenant Screening",
    description:
      "We conduct thorough credit, background, and eviction checks on all qualified tenants to ensure reliable occupants for your property.",
  },
  {
    icon: "/icons/marketing.png",
    title: "Leasing",
    description:
      "We provide expert market analysis of each property to ensure maximum return on your investment through strategic leasing.",
  },
];

const managementFAQ = [
  {
    question: "How do you market and list rental properties?",
    answer:
      "We market our properties on all major platforms, including the MLS, Zillow, Hotpads, Trulia, and more. We also advertise the Maia brand, which leads prospective residents to browse available listings directly on our website.",
  },
  {
    question: "How are maintenance requests handled?",
    answer:
      "We pride ourselves on providing best-in-class maintenance to all residents, as we believe it is the most vital tool for tenant retention. Maia has in-house handymen and repair specialists to handle any work order, whether large or small.",
  },
  {
    question: "What fees do you charge?",
    answer:
      "We charge a percentage of gross income as a management fee. The exact percentage varies depending on a multitude of factors, including your property's size and location. Schedule a consultation with our team of experts to discuss your specific needs and goals, and receive pricing custom-tailored to you and your property.",
  },
  {
    question: "Do you provide any guarantees?",
    answer:
      "We stand behind our work with a 60-day guarantee. If you're not satisfied with our performance after 60 days, we'll return any fees that have been paid.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Management" }]} />
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
                  Management
                </p>
                <h1 className="mt-6 mb-6 font-montserrat text-[1.728rem] font-medium leading-[1.7] tracking-[0.025em] text-dark">
                  Premium care for your property
                </h1>
                <p className="mx-auto max-w-[48rem] font-montserrat text-[0.833rem] font-normal leading-[1.7] tracking-[0.05em] text-dark">
                  We provide premium care for your property, ensuring every detail
                  is meticulously managed and maintained. From routine maintenance
                  to enhancing property value, our dedicated team delivers
                  exceptional service tailored to your needs.
                </p>
                <div className="mt-8">
                  <Link
                    href="/management-inquiry"
                    className="inline-block border border-dark bg-dark px-8 py-4 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
                  >
                    Get started
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Photo break */}
      <section className="relative z-[2] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="border-t border-dark/10" />
            <FadeIn>
              <div className="grid grid-cols-2 gap-3 py-16 md:gap-4 md:py-24">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/hero-pool.webp"
                    alt="Pool area at a Maia-managed property"
                    fill
                    sizes="(max-width: 768px) 50vw, 30rem"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/apartments.webp"
                    alt="Maia-managed apartment building"
                    fill
                    sizes="(max-width: 768px) 50vw, 30rem"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="relative z-[2] bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="border-t border-dark/10" />
            <div className="py-24 md:py-32">
              <FadeIn>
                <div className="text-center">
                  <p className="text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
                    Our Services
                  </p>
                  <h2 className="mt-6 mb-6 text-[1.44rem] font-medium tracking-[0.025em] md:text-[1.728rem]">
                    Everything handled, nothing overlooked
                  </h2>
                  <p className="mx-auto max-w-[44rem] text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    From finding reliable tenants to keeping your property in
                    exceptional condition — we take care of the details so you
                    don&apos;t have to.
                  </p>
                </div>
              </FadeIn>

              {/* 3x2 grid */}
              <StaggerContainer stagger={0.08} delay={0.2} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
                {services.map((service) => (
                  <StaggerItem key={service.title}>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-dark/10 bg-white">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="mb-3 text-[0.833rem] font-medium tracking-[0.05em]">
                        {service.title}
                      </div>
                      <p className="text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                        {service.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Promise / photo section */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[60rem]">
            <div className="border-t border-dark/10" />
            <FadeIn>
              <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16 md:py-28">
                <div>
                  <p className="text-[0.694rem] uppercase tracking-[0.125em] text-gray-text">
                    Our promise
                  </p>
                  <h2 className="mt-4 text-[1.44rem] font-medium tracking-[0.025em]">
                    Your property, our priority
                  </h2>
                  <p className="mt-4 text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    We treat every property as if it were our own. That means
                    proactive maintenance, transparent reporting, and a team
                    that&apos;s always reachable. Our 60-day satisfaction
                    guarantee means you have nothing to lose.
                  </p>
                  <Link
                    href="/management-inquiry"
                    className="mt-8 inline-block border border-dark bg-dark px-8 py-3.5 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
                  >
                    Get a free consultation
                  </Link>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src="/coffee.webp"
                    alt="Property consultation"
                    fill
                    sizes="(max-width: 768px) 100vw, 36rem"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[48rem]">
            <div className="border-t border-dark/10" />
            <div className="py-16 md:py-24">
              <FadeIn>
                <FAQSection title="Management FAQ" items={managementFAQ} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
