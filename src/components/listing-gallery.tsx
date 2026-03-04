"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ListingImage } from "@/types/listing";
import { AnimatePresence, motion } from "@/components/ui/motion-primitives";

interface ListingGalleryProps {
  images: ListingImage[];
  address: string;
}

export function ListingGallery({ images, address }: ListingGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  if (images.length === 0) return null;

  const primary = images[0];
  const secondary = images.slice(1, 5);

  return (
    <>
      {/* Photo grid */}
      <div className={`relative grid grid-cols-1 gap-1.5 ${secondary.length > 0 ? "md:grid-cols-[3fr_2fr]" : ""}`}>
        {/* Primary image */}
        <button
          onClick={() => openLightbox(0)}
          className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
        >
          <Image
            src={primary.url}
            alt={address}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </button>

        {/* Secondary images — horizontal scroll on mobile, 2x2 grid on desktop */}
        {secondary.length > 0 && (
          <>
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:hidden">
              {images.slice(1).map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(i + 1)}
                  className="relative aspect-[4/3] w-[70%] flex-shrink-0 snap-start cursor-zoom-in overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={address}
                    fill
                    sizes="70vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            {/* Desktop: 2x2 grid */}
            <div className="hidden gap-1.5 md:grid md:grid-cols-2 md:grid-rows-2">
              {secondary.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => openLightbox(i + 1)}
                  className="relative w-full cursor-zoom-in overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={address}
                    fill
                    sizes="20vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {/* View all photos button */}
        {images.length > 1 && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 z-10 border border-dark/10 bg-white/90 px-4 py-2 text-[0.694rem] tracking-[0.075em] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white"
          >
            View all {images.length} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-dark/95"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 z-10 text-cream/70 transition-colors duration-200 hover:text-cream"
              aria-label="Close gallery"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[0.833rem] tabular-nums text-cream/50">
              {lightboxIndex + 1} / {images.length}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 z-10 text-cream/50 transition-colors duration-200 hover:text-cream"
              aria-label="Previous photo"
            >
              <ChevronLeft size={40} strokeWidth={1} />
            </button>

            <div
              className="relative h-[80vh] w-[90vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[lightboxIndex].url}
                    alt={address}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 z-10 text-cream/50 transition-colors duration-200 hover:text-cream"
              aria-label="Next photo"
            >
              <ChevronRight size={40} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
