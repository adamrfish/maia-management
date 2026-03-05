"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Building2,
  KeyRound,
  Users,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion } from "@/components/ui/motion-primitives";
import type { LucideIcon } from "lucide-react";

const navLinks: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Apartments", href: "/listings", icon: Building2 },
  { label: "Management", href: "/management", icon: KeyRound },
  { label: "About", href: "/about", icon: Users },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHome);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;

    if (!isHome) {
      // Non-home pages: always visible, always scrolled style
      setScrolled(true);
      setVisible(true);
      return;
    }

    setScrolled(y > 200);

    const delta = y - lastScrollY.current;
    lastScrollY.current = y;

    // Always show at top of page
    if (y < 40) {
      setVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      return;
    }

    if (delta < -5) {
      // Scrolling up — show immediately
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setVisible(true);
    } else if (delta > 5) {
      // Scrolling down — hide immediately
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setVisible(false);
    }
  }, [isHome]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = hideTimer.current;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [handleScroll]);

  // Scroll lock + escape key when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Top nav bar */}
      <header
        className={`${isHome ? "fixed" : "sticky"} top-0 left-0 right-0 z-[100] transition-all duration-150 ease-out ${
          scrolled ? "bg-cream/90 backdrop-blur-sm" : "bg-transparent"
        } ${
          visible || menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-5 md:px-10">
          <div className="mx-auto max-w-[75rem]">
            <div className="py-2.5">
              <div className="grid grid-cols-3 items-center">
                {/* Left: Hamburger */}
                <div className="flex items-center">
                  <button
                    onClick={() => setMenuOpen(true)}
                    className="flex cursor-pointer items-center text-gray-text transition-colors duration-200 hover:text-dark"
                    aria-label="Open menu"
                  >
                    <div className="flex w-5 flex-col items-center justify-center gap-[5px]">
                      <span
                        className="block h-[1.5px] w-5 bg-dark transition-all duration-300 origin-center"
                        style={{
                          transform: menuOpen
                            ? "translateY(3.25px) rotate(45deg)"
                            : "none",
                        }}
                      />
                      <span
                        className="block h-[1.5px] w-5 bg-dark transition-all duration-300"
                        style={{
                          opacity: menuOpen ? 0 : 1,
                          transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                        }}
                      />
                      <span
                        className="block h-[1.5px] w-5 bg-dark transition-all duration-300 origin-center"
                        style={{
                          transform: menuOpen
                            ? "translateY(-3.25px) rotate(-45deg)"
                            : "none",
                        }}
                      />
                    </div>
                    <span className="ml-6 hidden text-[0.833rem] font-medium tracking-[0.05em] text-dark md:inline">
                      Menu
                    </span>
                  </button>
                </div>

                {/* Center: Logo */}
                <Link href="/" className="block text-center" aria-label="MAIA Management home">
                  <div
                    className="tracking-[0.2em] text-[#1d1d1b] transition-[font-size] duration-500 ease-in-out"
                    style={{
                      fontFamily: "Logam, sans-serif",
                      fontSize: scrolled ? "2.3rem" : "1.8rem",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    MAIA
                  </div>
                  <div
                    className="-mt-1 text-center uppercase tracking-[0.075em] text-[#1d1d1b] transition-[font-size] duration-500 ease-in-out"
                    style={{
                      fontSize: scrolled ? "0.5rem" : "0.38rem",
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    Management
                  </div>
                </Link>

                {/* Right: CTA + phone */}
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href="/listings"
                    className="hidden border border-dark bg-dark px-6 py-2.5 text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark md:block"
                  >
                    Find apartments
                  </Link>
                  <a href="tel:+13059345185" className="flex h-8 w-8 items-center justify-center rounded-full border border-dark/20 bg-white md:hidden">
                    <Phone size={16} strokeWidth={1.5} className="text-dark" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-dark/30"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-y-0 left-0 z-[201] flex w-full flex-col bg-cream sm:w-[24rem]"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6">
                <Link href="/" onClick={() => setMenuOpen(false)} aria-label="MAIA Management home">
                  <div
                    className="text-[1.6rem] tracking-[0.2em]"
                    style={{
                      fontFamily: "Logam, sans-serif",
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    MAIA
                  </div>
                  <div
                    className="-mt-0.5 text-center uppercase tracking-[0.075em]"
                    style={{
                      fontSize: "0.4rem",
                      lineHeight: 1,
                    }}
                  >
                    Management
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-text transition-colors duration-200 hover:text-dark"
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-8 border-t border-dark/10" />

              {/* Nav links */}
              <nav className="flex flex-col px-8 pt-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + i * 0.04,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 py-2.5 text-[0.94rem] tracking-[0.05em] transition-colors duration-200 ${
                        pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                          ? "text-dark font-medium"
                          : "text-dark/70 hover:text-dark"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dark/20 bg-white">
                        <link.icon
                          size={15}
                          strokeWidth={1.5}
                          className={
                            pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                              ? "text-dark"
                              : "text-gray-text"
                          }
                        />
                      </span>
                      {link.label}
                      {(pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))) && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-dark" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-8 flex flex-col gap-3 px-8"
              >
                <Link
                  href="/listings"
                  className="block border border-dark bg-dark py-3.5 text-center text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark"
                  onClick={() => setMenuOpen(false)}
                >
                  Find apartments
                </Link>
                <Link
                  href="/management"
                  className="block border border-dark py-3.5 text-center text-[0.694rem] tracking-[0.075em] transition-colors duration-200 hover:bg-dark hover:text-cream"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage property
                </Link>
              </motion.div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Footer: contact + social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="px-8 pb-8"
              >
                <div className="border-t border-dark/10 pt-6">
                  <div className="flex flex-col gap-2 text-[0.694rem] leading-relaxed text-gray-text">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-dark/20 bg-white">
                        <MapPin size={12} strokeWidth={1.5} className="text-gray-text" />
                      </span>
                      <div>
                        <p>420 Lincoln Road Suite 258</p>
                        <p>Miami Beach, FL 33139</p>
                      </div>
                    </div>
                    <a
                      href="tel:+17868411341"
                      className="flex items-center gap-3 transition-colors duration-200 hover:text-dark"
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-dark/20 bg-white">
                        <Phone size={12} strokeWidth={1.5} className="text-gray-text" />
                      </span>
                      (786) 841-1341
                    </a>
                    <a
                      href="mailto:info@maiamgmt.com"
                      className="flex items-center gap-3 transition-colors duration-200 hover:text-dark"
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-dark/20 bg-white">
                        <Mail size={12} strokeWidth={1.5} className="text-gray-text" />
                      </span>
                      info@maiamgmt.com
                    </a>
                  </div>

                  {/* Social */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href="https://www.instagram.com/maia.mgmt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 transition-opacity duration-200 hover:opacity-100"
                    >
                      <Image
                        src="/social/ig.png"
                        alt="Instagram"
                        width={24}
                        height={24}
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
