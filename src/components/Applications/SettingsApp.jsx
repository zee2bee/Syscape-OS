import React from "react";
import { useOSStore } from "../../store/osStore";
import { PREDEFINED_LOGOS } from "../../constants/osData";
import { VscRefresh, VscAccount, VscWorkspaceTrusted } from "react-icons/vsc";

export default function SettingsApp() {
  const { profile, resetOS } = useOSStore();
  const assignedLogo = PREDEFINED_LOGOS.find((l) => l.id === profile?.logo);

  return (
    <div className="space-y-5 font-mono text-xs">
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
          onClick={() => {
            if (
              confirm(
                "Confirm core system execution memory reset pipeline deployment?",
              )
            ) {
              resetOS();
            }
          }}
          className="w-full sm:w-auto px-4 py-2 bg-cyber-secondary/20 border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/40 font-bold rounded transition-all flex items-center justify-center gap-1.5"
        >
          <VscRefresh /> RESET PERSISTENT STORAGE
        </button>
      </div>
    </div>
  );
}
