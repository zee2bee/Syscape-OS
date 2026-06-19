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
          }, 3600);
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
    <div className="fixed inset-0 bg-[#06060c] z-[9999] flex flex-col justify-between p-8 font-mono">
      <div className="max-w-2xl space-y-2 mt-12">
        <h2 className="text-cyber-primary text-lg font-bold tracking-widest uppercase mb-4 animate-pulse">
          <AiOutlineLoading3Quarters className="inline animate-spin" /> SYSCAPE
          BOOT DEPLOYMENT RUNTIME
        </h2>
        <div className="space-y-1 h-[280px] overflow-hidden text-xs text-white/70">
          {logs.map((log, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
            >
              &gt; {log}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="max-w-xl w-full mx-auto mb-16 space-y-3">
        <div className="flex justify-between text-xs text-cyber-primary/80 font-mono">
          <span>SYSTEM DISPATCH OPTIMIZATION</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-cyber-success tracking-widest mt-2"
          >
            Welcome back! {profile?.username || "Operator"}. ACCESS GRANTED.
          </motion.p>
        )}
      </div>
    </div>
  );
}
