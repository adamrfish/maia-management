"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, type ReactNode } from "react";

const gentleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration, delay, ease: gentleEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  className,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: gentleEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MountFadeIn — animates immediately on mount with choreographed delays.
 * Use explicit `delay` props to build cinematic page-load sequences.
 */
export function MountFadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 16,
  scale,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  /** Optional starting scale (e.g. 1.15 → 1.0) */
  scale?: number;
  className?: string;
}) {
  const initial: Record<string, number> = { opacity: 0, y };
  const target: Record<string, number> = { opacity: 1, y: 0 };
  if (scale !== undefined) {
    initial.scale = scale;
    target.scale = 1;
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={target}
      transition={{ duration, delay, ease: gentleEase }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TypeOut — reveals text character-by-character on mount.
 * Simply renders the typed portion as a growing string.
 */
export function TypeOut({
  text,
  delay = 0,
  speed = 30,
  className,
}: {
  text: string;
  /** Delay in seconds before typing starts */
  delay?: number;
  /** Milliseconds per character */
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setCount(text.length);
      return;
    }
    const delayMs = delay * 1000;
    const timeout = setTimeout(() => setStarted(true), delayMs);
    return () => clearTimeout(timeout);
  }, [delay, prefersReduced, text.length]);

  useEffect(() => {
    if (prefersReduced || !started || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(timer);
  }, [prefersReduced, started, count, text.length, speed]);

  return (
    <span className={`relative inline-block ${className ?? ""}`} aria-label={text}>
      {/* Invisible full text to reserve space */}
      <span className="invisible" aria-hidden="true">{text}</span>
      {/* Visible typed portion overlaid */}
      <span className="absolute inset-0">{text.slice(0, count)}</span>
    </span>
  );
}

export { AnimatePresence, motion, gentleEase };
