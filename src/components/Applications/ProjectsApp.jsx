import React, { useState } from "react";
import { useOSStore } from "../../store/osStore";
import { VscFileCode } from "react-icons/vsc";

export default function ProjectsApp() {
  const profile = useOSStore((state) => state.profile);
  const [activeIdx, setActiveIdx] = useState(0);
  const projects = profile?.projects || [];

  if (projects.length === 0) {
    return (
      <div className="text-xs text-white/40">
        No localized configurations recorded.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 h-full border border-white/10 rounded overflow-hidden">
      {/* Dynamic Navigation Column Explorer Side */}
      <div className="bg-black/30 border-r border-white/10 p-2 space-y-1">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2 px-2 font-bold">
          Workspace File Hierarchy
        </p>
        {projects.map((proj, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center gap-2 transition-all ${
              activeIdx === idx
                ? "bg-cyber-primary/20 text-cyber-primary font-bold"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            <VscFileCode
              size={14}
              className={
                activeIdx === idx ? "text-cyber-primary" : "text-white/40"
              }
            />
            <span className="truncate">
              {proj.title || `unnamed_node_${idx}.txt`}
            </span>
          </button>
        ))}
      </div>

      {/* Structured Text Workspace Content Canvas */}
      <div className="sm:col-span-2 p-4 bg-black/10 flex flex-col justify-between font-sans relative">
        <div className="space-y-3">
          <div className="border-b border-white/5 pb-2 font-mono">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide">
              {projects[activeIdx]?.title}
            </h4>
            <span className="text-[10px] text-cyber-primary/60">
              Content Type: Plaintext Node Spec
            </span>
          </div>
          <p className="text-xs text-cyber-text/90 leading-relaxed font-mono whitespace-pre-wrap">
            {projects[activeIdx]?.description}
          </p>
        </div>
        <div className="mt-4 border-t border-white/5 pt-2 flex justify-between items-center text-[10px] text-white/30 font-mono">
          <span>Encoding: UTF-8</span>
          <span>Status: Virtualized File Readable</span>
        </div>
      </div>
    </div>
  );
}
