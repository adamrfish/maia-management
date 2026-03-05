"use client";

import { useEffect } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import Image from "next/image";

const gentleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function HeroBackground() {
  const loadScale = useMotionValue(1.15);
  const loadOpacity = useMotionValue(0);

  useEffect(() => {
    animate(loadScale, 1, { duration: 1.2, ease: gentleEase });
    animate(loadOpacity, 0.7, { duration: 1.2, ease: gentleEase });
  }, [loadScale, loadOpacity]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-0 h-screen pointer-events-none overflow-hidden"
      style={{ opacity: loadOpacity }}
    >
      <motion.div
        className="absolute right-0 top-0"
        style={{ scale: loadScale, transformOrigin: "top right" }}
      >
        <Image
          src="/background.webp"
          alt=""
          width={838}
          height={600}
          className="h-[15rem] w-auto md:h-[25rem]"
          priority
        />
      </motion.div>
      <motion.div
        className="absolute left-0 top-0"
        style={{ scale: loadScale, transformOrigin: "top left" }}
      >
        <Image
          src="/leaf-left.webp"
          alt=""
          width={1218}
          height={800}
          className="h-[10rem] w-auto md:h-[16rem]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
