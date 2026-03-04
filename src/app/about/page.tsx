import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion-primitives";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Maia Management team. Personalized property management across Miami's best neighborhoods.",
};

const consultingServices = [
  {
    icon: "/icons/leasing.png",
    title: "Leasing",
    description:
      "Having trouble leasing your rentals? Our hands-on leasing experts will market and lease properties by generating leads, responding to inquiries, conducting property tours, and negotiating lease terms.",
  },
  {
    icon: "/icons/financial-overview.png",
    title: "Financial Overview",
    description:
      "Our team has the capability to conduct an in-depth financial analysis of any asset and provide insights on areas to monitor for potential issues, as well as identify opportunities to leverage.",
  },
  {
    icon: "/icons/property-advisory.png",
    title: "Property Advisory",
    description:
      "Owners can guide renovations and leasing, but our expertise comes from managing numerous properties in each market. This gives us a unique perspective to advise owners on maximizing their assets and achieving the highest possible return on any investments.",
  },
  {
    icon: "/icons/investment-sales.png",
    title: "Investment Sales",
    description:
      "As a fully licensed brokerage, we can assist with purchasing or selling any commercial real estate assets.",
  },
  {
    icon: "/icons/construction-management.png",
    title: "Construction Management",
    description:
      "Our experienced construction team will establish and manage timelines and budgets, contractor bidding, change orders, RFI's, submittal coordination, field reports, coordinate inspections, manage contractors, and more.",
  },
  {
    icon: "/icons/turnkey-dev.png",
    title: "Turnkey Development Consulting",
    description:
      "With local and national expertise, our team can help navigate all phases of development projects to deliver custom solutions for complex and straightforward challenges.",
  },
];

const teamMembers = [
  {
    name: "Gediminas Bulota",
    photo: "/team/gediminas-bulota.jpg",
    bio: "Gediminas Bulota is a Managing Partner with a decade of experience in commercial and residential property development. His diverse experience brings benefits to the team by ensuring optimal performance and profitability.",
    phone: "(239) 264-9138",
    email: "gbulota@maiamgmt.com",
  },
  {
    name: "Natalia Castano",
    photo: "/team/natalia-castano.jpg",
    bio: "Natalia manages residential properties and oversees maintenance operations in Miami and Miami Beach. With over 6 years of experience in multi-family and residential property management in South Florida before joining Maia Management, she brings extensive expertise to her role.",
    phone: "(786) 208-0324",
    email: "ncastano@maiamgmt.com",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          </div>
        </div>
      </section>

      {/* Team / Bios — moved to top */}
      <section className="relative bg-cream">
        <Image
          src="/leaf-left.png"
          alt=""
          width={1218}
          height={800}
          className="pointer-events-none absolute left-0 top-0 z-0 h-[10rem] w-auto md:h-[16rem]"
        />
        <Image
          src="/background.png"
          alt=""
          width={837}
          height={600}
          className="pointer-events-none absolute right-0 top-0 z-0 h-[15rem] w-auto md:h-[25rem]"
        />

        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="relative z-10 py-16 md:py-24">
              <FadeIn>
                <div className="mx-auto max-w-[48rem] text-center">
                  <p className="text-[0.694rem] uppercase tracking-[0.125em]">
                    About
                  </p>
                  <h1 className="mt-6 mb-6 text-[1.728rem] font-medium tracking-[0.025em] md:text-[2.074rem]">
                    Our Story
                  </h1>
                  <p className="text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    Our story is rooted in a team with decades of experience in
                    the real estate industry and deep local expertise. We combine
                    our knowledge of the market with a passion for personalized
                    service to deliver exceptional results.
                  </p>
                </div>
              </FadeIn>

              <StaggerContainer
                stagger={0.1}
                delay={0.2}
                className="mx-auto mt-16 grid max-w-[60rem] grid-cols-1 gap-16 md:grid-cols-2"
              >
                {teamMembers.map((member) => (
                  <StaggerItem key={member.name}>
                    <div className="text-center">
                      <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          sizes="12rem"
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-[1rem] font-medium tracking-[0.05em]">
                        {member.name}
                      </h3>
                      <p className="mt-4 text-[0.833rem] leading-[1.7] tracking-[0.05em] text-gray-text">
                        {member.bio}
                      </p>
                      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-[0.694rem] tracking-[0.05em] text-gray-text transition-colors duration-200 hover:text-dark"
                        >
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-dark/20 bg-white">
                            <Image
                              src="/icons/call.png"
                              alt=""
                              width={12}
                              height={12}
                            />
                          </span>
                          {member.phone}
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-[0.694rem] tracking-[0.05em] text-gray-text transition-colors duration-200 hover:text-dark"
                        >
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-dark/20 bg-white">
                            <Image
                              src="/icons/email.png"
                              alt=""
                              width={12}
                              height={12}
                            />
                          </span>
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="bg-cream-light">
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="py-24 md:py-32">
              <FadeIn>
                <div className="mx-auto max-w-[48rem] text-center">
                  <p className="text-[0.694rem] uppercase tracking-[0.125em]">
                    Work with us
                  </p>
                  <h2 className="mt-6 mb-6 text-[1.728rem] font-medium tracking-[0.025em]">
                    Consulting services
                  </h2>
                  <p className="text-[0.833rem] leading-[1.8] tracking-[0.05em] text-gray-text">
                    Our consulting services provide strategies to help clients
                    maximize the performance of their investments. Whether
                    you&apos;re navigating complex market trends or seeking
                    advice on property management, our expert guidance ensures
                    confident decisions.
                  </p>
                </div>
              </FadeIn>

              <StaggerContainer
                stagger={0.08}
                delay={0.2}
                className="mx-auto mt-16 grid max-w-[72rem] grid-cols-1 gap-12 md:grid-cols-3 md:gap-16"
              >
                {consultingServices.map((service) => (
                  <StaggerItem key={service.title}>
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-dark/20 bg-white">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={28}
                          height={28}
                        />
                      </div>
                      <div className="mb-4 text-[0.833rem] font-medium tracking-[0.05em]">
                        {service.title}
                      </div>
                      <p className="text-[0.833rem] leading-[1.7] tracking-[0.05em] text-gray-text">
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
    </>
  );
}
