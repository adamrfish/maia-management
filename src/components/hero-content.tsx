"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export function HeroContent() {
  return (
    <motion.div
      className="relative z-10 mx-auto max-w-[42rem] text-center"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Kicker */}
      <motion.p
        className="text-[0.694rem] uppercase tracking-[0.125em]"
        variants={fadeUp}
      >
        Unlock the door to
      </motion.p>

      {/* Headline */}
      <motion.h1
        className="mt-5 mb-6 text-[2.074rem] font-medium leading-tight tracking-[0.025em] md:text-[2.986rem]"
        variants={fadeUp}
      >
        Miami&rsquo;s vibrant lifestyle
      </motion.h1>

      {/* Body */}
      <motion.p
        className="mx-auto max-w-[32rem] text-[1rem] leading-[1.7] tracking-[0.025em] text-gray-text"
        variants={fadeUp}
      >
        Find your next apartment or let us manage your property. Maia brings
        personalized service to Miami&apos;s best neighborhoods.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-6"
        variants={fadeUp}
      >
        <Link
          href="/listings"
          className="w-full border border-dark bg-dark px-8 py-3.5 text-center text-[0.694rem] tracking-[0.075em] text-cream transition-colors duration-200 hover:bg-cream hover:text-dark sm:w-auto sm:py-4"
        >
          Find apartments
        </Link>
        <Link
          href="/management"
          className="w-full border border-dark bg-cream px-8 py-3.5 text-center text-[0.694rem] tracking-[0.075em] transition-colors duration-200 hover:bg-dark hover:text-cream active:scale-[0.98] sm:w-auto sm:py-4"
        >
          Manage property
        </Link>
      </motion.div>
    </motion.div>
  );
}
