import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOSStore } from "../../store/osStore";
import { PREDEFINED_LOGOS } from "../../constants/osData";
import {
  VscRefresh,
  VscAccount,
  VscWorkspaceTrusted,
  VscClose,
} from "react-icons/vsc";

export default function SettingsApp() {
  const { profile, resetOS } = useOSStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const assignedLogo = PREDEFINED_LOGOS.find((l) => l.id === profile?.logo);

  return (
    <div className="relative space-y-5 font-mono text-xs h-full">
      {/* Identity Profile Section */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-cyber-primary font-bold border-b border-white/5 pb-2">
          <VscAccount size={16} /> Identity Telemetry Metadata
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-white/80">
          <span className="text-white/40">Username Registry:</span>
          <span className="text-white font-bold">{profile?.username}</span>
          <span className="text-white/40">Active Logo Hub:</span>
          <span>
            {assignedLogo
              ? `${assignedLogo.icon} ${assignedLogo.name}`
              : "Unknown"}
          </span>
          <span className="text-white/40">Projects Mounted:</span>
          <span>{profile?.projects?.length || 0} nodes</span>
          <span className="text-white/40">Hobbies Mounted:</span>
          <span>{profile?.hobbies?.length || 0} targets</span>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="p-4 bg-red-950/10 border border-cyber-secondary/30 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-cyber-secondary font-bold">
          <VscWorkspaceTrusted size={16} /> Danger Zone Management Operations
        </div>
        <p className="text-[11px] text-white/60 leading-relaxed">
          Executing a hardware factory environment reset immediately clears the
          client-side Zustand store engine, deletes profile parameters, and
          flushes storage logs.
        </p>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full sm:w-auto px-4 py-2 bg-cyber-secondary/20 border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/40 font-bold rounded transition-all flex items-center justify-center gap-1.5"
        >
          <VscRefresh /> RESET PERSISTENT STORAGE
        </button>
      </div>

      {/* Theme-compliant Custom Confirmation Terminal Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 rounded-lg"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-sm glass-panel border border-cyber-secondary/40 bg-[#0c0d14]/90 rounded-lg p-4 space-y-4 shadow-[0_0_20px_rgba(255,0,85,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2 text-cyber-secondary font-bold tracking-wider uppercase text-[11px]">
                  <VscWorkspaceTrusted size={14} /> Critical Confirmation
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="text-white/40 hover:text-cyber-secondary transition-colors p-0.5 rounded hover:bg-white/5"
                >
                  <VscClose size={16} />
                </button>
              </div>

              <p className="text-white/80 leading-relaxed text-[11px]">
                Confirm core system execution memory reset pipeline deployment?
                This action is irreversible.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                  ABORT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirm(false);
                    resetOS();
                  }}
                  className="px-3 py-1.5 rounded bg-cyber-secondary/20 border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/40 shadow-[0_0_8px_rgba(255,0,85,0.2)] transition-all"
                >
                  EXECUTE FLUSH
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
