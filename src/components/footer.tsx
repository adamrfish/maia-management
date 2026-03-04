import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  KeyRound,
  Users,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const footerNavLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Apartments", href: "/listings", icon: Building2 },
  { label: "Management", href: "/management", icon: KeyRound },
  { label: "About", href: "/about", icon: Users },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative z-[1] bg-dark text-cream">
      {/* CTA band */}
      <div className="border-b border-cream/10 px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          <div className="flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:py-20 md:text-left">
            <div>
              <h3 className="text-[1.44rem] font-medium tracking-[0.05em]">
                Get listings
              </h3>
              <p className="mt-2 max-w-[32rem] text-[0.833rem] leading-[1.7] tracking-[0.05em] text-cream/90">
                Join our mailing list to receive exclusive updates on the latest
                property listings tailored just for you.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block border border-cream bg-transparent px-8 py-4 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:py-20">
            {/* Logo + tagline */}
            <div>
              <Link href="/" className="inline-block">
                <div
                  className="tracking-[0.2em]"
                  style={{
                    fontFamily: "Logam, sans-serif",
                    fontSize: "2.488rem",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  MAIA
                </div>
                <div
                  className="text-center uppercase tracking-[0.075em]"
                  style={{
                    fontSize: "0.579rem",
                    lineHeight: 1,
                    marginTop: "-1px",
                  }}
                >
                  Management
                </div>
              </Link>
              <p className="mt-6 max-w-[16rem] text-[0.833rem] leading-[1.7] tracking-[0.05em] text-cream/90">
                Personalized property management across Miami&apos;s best
                neighborhoods.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="mb-4 text-[0.694rem] font-medium uppercase tracking-[0.15em] text-cream/60">
                Navigate
              </div>
              <nav className="flex flex-col gap-2.5">
                {footerNavLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-[0.833rem] tracking-[0.05em] text-cream/90 transition-colors duration-200 hover:text-cream"
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cream/30 bg-white/10">
                      <link.icon size={12} strokeWidth={1.5} className="text-cream/60" />
                    </span>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-4 text-[0.694rem] font-medium uppercase tracking-[0.15em] text-cream/60">
                Contact
              </div>
              <div className="flex flex-col gap-2.5 text-[0.833rem] tracking-[0.05em] text-cream/90">
                <a
                  href="tel:+17868411341"
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-cream"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cream/30 bg-white/10">
                    <Phone size={12} strokeWidth={1.5} className="text-cream/60" />
                  </span>
                  (786) 841-1341
                </a>
                <a
                  href="mailto:info@maiamgmt.com"
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-cream"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cream/30 bg-white/10">
                    <Mail size={12} strokeWidth={1.5} className="text-cream/60" />
                  </span>
                  info@maiamgmt.com
                </a>
              </div>
            </div>

            {/* Office */}
            <div>
              <div className="mb-4 text-[0.694rem] font-medium uppercase tracking-[0.15em] text-cream/60">
                Office
              </div>
              <div className="flex items-start gap-3 text-[0.833rem] leading-[1.7] tracking-[0.05em] text-cream/90">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-cream/30 bg-white/10">
                  <MapPin size={12} strokeWidth={1.5} className="text-cream/60" />
                </span>
                <div>
                  <p>420 Lincoln Road Suite 258</p>
                  <p>Miami Beach, FL 33139</p>
                </div>
              </div>
              <div className="mt-5 flex gap-4">
                <a
                  href="https://www.instagram.com/maia.mgmt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200 hover:opacity-80"
                >
                  <Image
                    src="/social/ig.png"
                    alt="Instagram"
                    width={28}
                    height={28}
                    className="invert"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-cream/10 px-5 md:px-10">
        <div className="mx-auto max-w-[75rem]">
          <div className="flex items-center justify-between py-6">
            <p className="text-[0.579rem] tracking-[0.1em] text-cream/50">
              &copy; {new Date().getFullYear()} MAIA MANAGEMENT
            </p>
            <p className="text-[0.579rem] tracking-[0.1em] text-cream/50">
              MIAMI, FL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
