import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_GALLERY_IMAGES } from "../../constants/osData";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

export default function GalleryApp() {
  const [index, setIndex] = useState(0);

  // Generate a randomized session seed once on boot so images don't flicker on slide transitions
  const galleryImages = useMemo(() => {
    const sessionSeed = Math.floor(Math.random() * 10000);
    return Array.from({ length: DEFAULT_GALLERY_IMAGES.length }).map(
      (_, idx) => `https://picsum.photos/800/600?random=${idx}-${sessionSeed}`,
    );
  }, []);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col h-full justify-between space-y-4 select-none">
      <div className="relative flex-1 bg-black/40 border border-white/10 rounded overflow-hidden flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={galleryImages[index]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            alt={`Visual Data Panel ${index}`}
          />
        </AnimatePresence>

        {/* Slide Controls Overlay Panel */}
        <button
          onClick={prevSlide}
          className="absolute left-2 p-1.5 rounded-full bg-black/60 text-white hover:text-cyber-primary border border-white/10 transition-colors"
        >
          <VscChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-cyber-primary border border-white/10 transition-colors"
        >
          <VscChevronRight size={20} />
        </button>

        {/* Counter Indicators */}
        <div className="absolute bottom-2 right-3 bg-black/70 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/60">
          MATRIX IMAGE {index + 1} / {galleryImages.length}
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        {galleryImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === index ? "w-6 bg-cyber-primary" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
