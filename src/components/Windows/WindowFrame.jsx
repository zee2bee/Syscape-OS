import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscChromeClose, VscChromeMinimize } from "react-icons/vsc";
import { useOSStore } from "../../store/osStore";

export default function WindowFrame({ id, title, children }) {
  const {
    openWindows,
    focusedWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
  } = useOSStore();
  const windowState = openWindows[id];
  const isFocused = focusedWindow === id;

  if (!windowState) return null;
  // If process is marked as minimized, skip rendering on current desktop viewport layer
  if (windowState.isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      drag
      dragMomentum={false}
      dragHandleClassName="window-drag-bar"
      onPointerDown={() => focusWindow(id)}
      style={{ zIndex: windowState.zIndex }}
      className={`absolute w-full max-w-lg md:max-w-2xl h-[420px] rounded-lg border flex flex-col glass-panel shadow-glass transition-shadow duration-300 ${
        isFocused ? "border-cyber-primary shadow-neon" : "border-white/10"
      }`}
    >
      {/* Title Bar Header */}
      <div className="window-drag-bar flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 rounded-t-lg cursor-move select-none">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase">
          <span className={isFocused ? "text-cyber-primary" : "text-white/40"}>
            ■
          </span>
          <span className={isFocused ? "text-white" : "text-white/60"}>
            {title}
          </span>
        </div>

        {/* Actions Button Control Panel */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="text-white/40 hover:text-white transition-colors p-0.5 rounded hover:bg-white/5"
          >
            <VscChromeMinimize size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="text-white/40 hover:text-cyber-secondary transition-colors p-0.5 rounded hover:bg-white/5"
          >
            <VscChromeClose size={14} />
          </button>
        </div>
      </div>

      {/* Internal Interactive Viewport Workspace */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-black/20 text-cyber-text">
        {children}
      </div>
    </motion.div>
  );
}
