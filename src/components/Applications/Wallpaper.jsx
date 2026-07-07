import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../../store/osStore";
import { PREDEFINED_WALLPAPERS } from "../../constants/osData";
import { VscChevronLeft, VscChevronRight, VscCheck } from "react-icons/vsc";

export default function WallpaperApp() {
  // Extract state tracking from the global OS hypervisor store
  const profile = useOSStore((state) => state.profile);

  // Fallback to active runtime background or initialize to index zero nodes
  const currentOSWallpaper = profile?.wallpaper || PREDEFINED_WALLPAPERS[0];

  // Track standard matching indices to anchor slider positions beautifully
  const initialIndex = PREDEFINED_WALLPAPERS.indexOf(currentOSWallpaper);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex !== -1 ? initialIndex : 0,
  );
  const [direction, setDirection] = useState(0);

  // Micro-descriptive identifiers for each procedural background layer template
  const WALLPAPER_NAMES = [
    "Matrix Geometric Radial Matrix Nodes",
    "Cyber Barcode Shutter Striping",
    "Blueprint Dev Grid Overlay",
    "Scanline Synthwave Atmospheric Matrix",
    "Multi-angle Copper Luxury Shards",
    "Dark Tech Neon Spectral Array",
    "Deep Cyber Security Cross-Grid Node",
    "Interlocking Split Spectrum Geometry",
    "Vaporwave Frequency Ribbons",
    "Dual Axis Tiered Blocks",
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % PREDEFINED_WALLPAPERS.length,
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + PREDEFINED_WALLPAPERS.length) %
        PREDEFINED_WALLPAPERS.length,
    );
  };

  const handleSelectBackground = () => {
    const selectedWallpaper = PREDEFINED_WALLPAPERS[currentIndex];

    // Direct atomic injection into Zustand global core matrix state variables
    useOSStore.setState((state) => {
      const updatedProfile = state.profile
        ? { ...state.profile, wallpaper: selectedWallpaper }
        : { wallpaper: selectedWallpaper };

      // Commit persistent records data cache synchronization inside local storage layers
      if (typeof window !== "undefined") {
        localStorage.setItem("syscape_profile", JSON.stringify(updatedProfile));
      }

      return { profile: updatedProfile };
    });
  };

  // Slider animation transformation parameters for smooth navigation transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 260 : -260,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 260 : -260,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-mono bg-black/20 p-4 rounded-lg backdrop-blur-md border border-white/5 select-none">
      {/* App Descriptor Title Header Block */}
      <div className="mb-1">
        <h3 className="text-xs font-bold text-cyber-primary tracking-wider uppercase flex items-center gap-1.5">
          <span>❖</span> System Personalization Terminal
        </h3>
        <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">
          Modify live hypervisor core graphical layout matrices
        </p>
      </div>

      {/* Main Interactive Carousel Framework Viewport */}
      <div className="flex-1 flex flex-col items-center justify-center my-2 relative">
        <div className="w-full max-w-md h-52 relative flex items-center justify-between gap-2 overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 group shadow-2xl">
          {/* Slider Trigger Control - Decrement Prev */}
          <button
            type="button"
            onClick={handlePrev}
            className="z-10 p-1.5 rounded-lg bg-black/60 border border-white/10 text-white/50 hover:text-cyber-primary hover:border-cyber-primary/40 transition-all active:scale-95 duration-150 backdrop-blur-sm"
          >
            <VscChevronLeft size={18} />
          </button>

          {/* Core Image Preview Render Canvas Grid Screen Wrapper */}
          <div className="flex-1 h-full relative overflow-hidden rounded-lg border border-white/5 shadow-inner flex items-center justify-center bg-black/30">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ background: PREDEFINED_WALLPAPERS[currentIndex] }}
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg flex flex-col justify-end p-3"
              >
                {/* Micro Glassmorphic Info Banner Overlay */}
                <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-md p-2 text-left pointer-events-none">
                  <div className="text-[8px] uppercase tracking-widest text-cyber-primary font-bold">
                    Wallpaper Profile Matrix // 0{currentIndex + 1}
                  </div>
                  <div className="text-[10px] text-white/80 font-bold truncate mt-0.5">
                    {WALLPAPER_NAMES[currentIndex]}
                  </div>
                </div>

                {/* Runtime Target Status Active core overlay layer validation */}
                {PREDEFINED_WALLPAPERS[currentIndex] === currentOSWallpaper && (
                  <div className="absolute top-2 right-2 bg-cyber-primary/20 border border-cyber-primary/50 text-cyber-primary text-[8px] px-2 py-0.5 rounded flex items-center gap-1 font-bold shadow-[0_0_8px_rgba(0,255,255,0.2)] backdrop-blur-sm">
                    <VscCheck size={10} /> ACTIVE COMPILER
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Trigger Control - Increment Next */}
          <button
            type="button"
            onClick={handleNext}
            className="z-10 p-1.5 rounded-lg bg-black/60 border border-white/10 text-white/50 hover:text-cyber-primary hover:border-cyber-primary/40 transition-all active:scale-95 duration-150 backdrop-blur-sm"
          >
            <VscChevronRight size={18} />
          </button>
        </div>

        {/* Modular Linear Micro Pagination Indicator Dots Grid */}
        <div className="flex gap-1 mt-3">
          {PREDEFINED_WALLPAPERS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-4 bg-cyber-primary shadow-[0_0_6px_#00ffff]"
                  : "w-1 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Primary Global Deployment Action Button Controller Box */}
      <div className="mt-1 border-t border-white/10 pt-3 flex flex-col items-center">
        <motion.button
          type="button"
          onClick={handleSelectBackground}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 12px rgba(0,255,255,0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-xs py-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-bold rounded-md text-[10px] tracking-wider uppercase font-mono transition-all duration-150 hover:brightness-110 flex items-center justify-center gap-2"
        >
          Select Background for OS
        </motion.button>
      </div>
    </div>
  );
}
