import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SiTicktick } from "react-icons/si";
import { useOSStore } from "../../store/osStore";

const BOOT_SEQUENCES = [
  <>
    Initializing Syscape Hypervisor Layer...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  <>
    Loading localized kernel profile matrices...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  <>
    Mapping system virtual architectures...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  <>
    Mounting persistent security state configurations...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  <>
    Verifying UI environment variables...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  <>
    Optimizing graphical glassmorphism render core...
    <br />
    Done <SiTicktick className="inline text-green-500 ml-1" />
  </>,
  "Network nodes connectivity verification: ACTIVE.",
];

export default function BootScreen() {
  const profile = useOSStore((state) => state.profile);
  const setBootComplete = useOSStore((state) => state.setBootComplete);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let sequenceIdx = 0;
    const logInterval = setInterval(() => {
      if (sequenceIdx < BOOT_SEQUENCES.length) {
        setLogs((prev) => [...prev, BOOT_SEQUENCES[sequenceIdx]]);
        sequenceIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setBootComplete();
          }, 5000);
          return 100;
        }
        return old + 2;
      });
    }, 70);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [setBootComplete]);

  return (
    <div className="fixed inset-0 bg-[#06060c] z-[9999] flex flex-col justify-between p-6 md:p-12 font-mono overflow-hidden select-none">
      {/* Tech Grid Matrix Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      {/* Scanline CRT Ambient Line Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,6px_100%] pointer-events-none" />

      {/* Top Graphic Area: Kinetic Mainframe Logo Core */}
      <div
        className="flex flex-col items-center justify-center text-center mt-8 relative"
        style={{ perspective: 1000 }}
      >
        {/* Dynamic Backdrop Ambient Blur */}
        <div className="absolute w-40 h-40 mb-4 bg-cyber-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Entrance Spring Alignment Wrapper */}
        <motion.div
          initial={{ x: -180, opacity: 0, scale: 0.7 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 12,
            delay: 0.1,
          }}
          className="relative z-10 flex items-center justify-center w-20 h-20"
        >
          {/* Kinetic Cyber-Pulse Aura: Synchronized with the 3D twist burst */}
          <motion.div
            className="absolute inset-0 border border-cyber-primary/40 rounded-full bg-cyber-primary/5 blur-[2px]"
            animate={{
              scale: [1, 1, 1.6, 2.1, 1],
              opacity: [0.3, 0.3, 0.9, 0, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.48, 0.58, 1],
            }}
          />

          {/* Premium Logo Motion Core: Hover + High Velocity 3D Twist Cycle */}
          <motion.img
            src="./icon.png"
            alt="Syscape Emblem"
            className="w-16 h-16 md:w-20 md:h-20 mb-4 object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.55)] z-10"
            animate={{
              y: [0, -8, -8, 0, 0],
              rotateY: [0, 0, 360, 360, 0],
              scale: [1, 1, 1.12, 0.92, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.38, 0.52, 0.62, 1],
            }}
          />
        </motion.div>
      </div>

      {/* Middle Console Panel Section */}
      <div className="w-full max-w-2xl mx-auto space-y-4 flex flex-col items-center">
        <div className="w-full flex items-center gap-3 border-b border-white/5 pb-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary" />
          </div>
          <div>
            <h2 className="text-cyber-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              <AiOutlineLoading3Quarters className="inline animate-spin text-[10px]" />
              CNET-SYSCAPE RUNTIME PIPELINE
            </h2>
            <p className="text-[9px] text-white/30 tracking-widest uppercase mt-0.5">
              Sub-system Core Matrix Initialization Terminal
            </p>
          </div>
        </div>

        {/* System Deployment Log Stream Window */}
        <div className="w-full bg-black/40 border border-white/5 rounded-lg p-4 h-[220px] overflow-hidden shadow-inner text-left">
          <div className="space-y-1.5 h-full overflow-y-auto text-[11px] md:text-xs text-white/70 leading-relaxed scrollbar-none">
            {logs.map((log, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start gap-2"
              >
                <span className="text-cyber-primary/50 shrink-0 select-none">
                  &gt;
                </span>
                <span className="w-full tracking-wide">{log}</span>
              </motion.p>
            ))}
            {logs.length < BOOT_SEQUENCES.length && (
              <span className="inline-block w-1.5 h-3.5 bg-cyber-primary animate-pulse ml-1 align-middle" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Optimization Progress Section */}
      <div className="w-full max-w-xl mx-auto mb-8 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/40">
          <span className="flex items-center gap-1.5 uppercase">
            <span className="w-1 h-1 bg-cyber-primary rounded-full animate-ping" />
            System Optimization Dispatch
          </span>
          <span className="font-bold text-cyber-accent bg-cyber-accent/10 px-2 py-0.5 rounded border border-cyber-accent/20 font-mono">
            {progress}%
          </span>
        </div>

        {/* Progress Bar Container Track */}
        <div className="w-full h-2 bg-black/50 border border-white/10 rounded-full overflow-hidden p-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.7)]">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            {/* Pulsing Edge Light tracker */}
            {progress > 0 && progress < 100 && (
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white blur-[1px] opacity-90 rounded-full shadow-[0_0_8px_#ffffff]" />
            )}
          </motion.div>
        </div>

        {/* Security Payload Access Verification Toast */}
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center space-y-1 bg-cyber-primary/5 border border-cyber-primary/10 rounded-lg p-3 shadow-[0_0_15px_rgba(0,255,255,0.02)]"
          >
            <p className="text-xs text-cyber-success tracking-[0.2em] uppercase font-bold">
              Welcome back, {profile?.username || "Operator"}. ACCESS GRANTED.
            </p>
            <p className="text-[9px] text-white/40 uppercase tracking-widest">
              Mounting graphical user shell context...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
