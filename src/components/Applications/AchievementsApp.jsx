import React, { useState, useRef } from "react";
import { useOSStore } from "../../store/osStore";
import {
  VscVerified,
  VscCloudDownload,
  VscLoading,
  VscAdd,
  VscTrash,
  VscTerminal,
} from "react-icons/vsc";
import { toPng } from "html-to-image";

export default function AchievementsApp() {
  const profile = useOSStore((state) => state.profile);
  // Ensure your osStore has an action to update or patch profile states
  const updateProfile = useOSStore((state) => state.updateProfile);
  const achievements = profile?.achievements || [];

  // Canvas Export States
  const [exportingId, setExportingId] = useState(null);
  const [activeCert, setActiveCert] = useState(null);
  const certificateRef = useRef(null);

  // Real-time Runtime Form States
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    year: "",
  });
  const [formError, setFormError] = useState("");

  const triggerImageDownload = (cert, index) => {
    setExportingId(index);
    setActiveCert(cert);

    setTimeout(() => {
      if (!certificateRef.current) {
        setExportingId(null);
        return;
      }

      toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#030207",
      })
        .then((dataUrl) => {
          const element = document.createElement("a");
          element.download = `${cert.title.toLowerCase().replace(/\s+/g, "_")}_credential.png`;
          element.href = dataUrl;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          setExportingId(null);
        })
        .catch((err) => {
          console.error(
            "Syscape Engine Node: Certificate rendering failure",
            err,
          );
          setExportingId(null);
        });
    }, 150);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate inputs locally matching wizard parameters
    if (!formData.title || !formData.organization || !formData.year) {
      setFormError("All data parameters must be populated.");
      return;
    }
    if (!/^\d{4}$/.test(formData.year)) {
      setFormError("Timeline sequence requires YYYY format.");
      return;
    }

    const updatedAchievements = [...achievements, formData];
    updateProfile({
      ...profile,
      achievements: updatedAchievements,
    });

    // Reset Form Input State
    setFormData({ title: "", organization: "", year: "" });
    setIsAdding(false);
  };

  const removeAchievementNode = (indexToRemove) => {
    const updatedAchievements = achievements.filter(
      (_, idx) => idx !== indexToRemove,
    );
    updateProfile({
      ...profile,
      achievements: updatedAchievements,
    });
  };

  return (
    <div className="space-y-4 h-full max-h-full overflow-y-auto pr-1 select-none font-mono text-white">
      {/* Control Header Strip */}
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div className="text-xs text-white/50 uppercase tracking-wider flex items-center gap-2">
          <VscTerminal className="text-cyber-primary" /> Active Registry Count:{" "}
          {achievements.length}
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-xs bg-cyber-primary/20 text-cyber-primary border border-cyber-primary/40 px-3 py-1 rounded flex items-center gap-1 hover:bg-cyber-primary/30 transition-all"
        >
          <VscAdd /> {isAdding ? "CANCEL NODE" : "INJECT CREDENTIAL"}
        </button>
      </div>

      {/* Dynamic Injection Form */}
      {isAdding && (
        <form
          onSubmit={handleFormSubmit}
          className="p-4 bg-black/40 border border-cyber-primary/30 rounded-lg space-y-3 shadow-inner"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">
                Certificate Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="p-2 text-xs w-full rounded glass-input bg-black/50 border border-white/10 text-white"
                placeholder="e.g., AWS Cloud Core"
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">
                Authority Node
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="p-2 text-xs w-full rounded glass-input bg-black/50 border border-white/10 text-white"
                placeholder="e.g., Amazon Node"
              />
            </div>
            <div>
              <label className="block text-[10px] text-white/40 uppercase mb-1">
                Year Matrix (YYYY)
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="p-2 text-xs w-full rounded glass-input bg-black/50 border border-white/10 text-white"
                placeholder="2026"
              />
            </div>
          </div>
          {formError && (
            <p className="text-[10px] text-cyber-secondary font-sans">
              {formError}
            </p>
          )}
          <button
            type="submit"
            className="w-full text-xs py-1.5 bg-cyber-primary text-black font-bold uppercase rounded hover:brightness-110 transition-all"
          >
            Commit Sequence to Core Profile
          </button>
        </form>
      )}

      {/* Grid Canvas Display Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((ach, index) => (
          <div
            key={index}
            className="p-4 rounded-lg relative overflow-hidden border border-white/10 flex flex-col justify-between h-44 shadow-md bg-gradient-to-br from-black/40 via-purple-950/20 to-black/60 group"
          >
            <div className="absolute top-2 right-2 text-cyber-primary/20 pointer-events-none group-hover:text-cyber-primary/40 transition-colors">
              <VscVerified size={72} />
            </div>

            <button
              onClick={() => removeAchievementNode(index)}
              className="absolute top-2 right-2 hidden group-hover:flex p-1 bg-black/60 border border-cyber-secondary/40 rounded text-cyber-secondary hover:text-red-400 z-20"
              title="Purge Node"
            >
              <VscTrash size={12} />
            </button>

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-1.5 text-cyber-primary font-mono text-[10px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-primary animate-ping" />
                Verified Node Block
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide font-mono uppercase truncate">
                {ach.title}
              </h4>
              <p className="text-xs text-white/60 font-sans italic truncate">
                {ach.organization}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2 relative z-10 font-mono">
              <span className="text-[10px] text-cyber-secondary bg-cyber-secondary/10 px-2 py-0.5 rounded border border-cyber-secondary/20">
                CLASS: {ach.year}
              </span>
              <button
                disabled={exportingId !== null}
                onClick={() => triggerImageDownload(ach, index)}
                className={`text-xs text-black font-bold bg-cyber-primary hover:bg-cyan-400 px-2.5 py-1 rounded-sm flex items-center gap-1 transition-all ${
                  exportingId === index ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {exportingId === index ? (
                  <>
                    <VscLoading size={13} className="animate-spin" />{" "}
                    COMPILING...
                  </>
                ) : (
                  <>
                    <VscCloudDownload size={13} /> EXPORT
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Digital Engine Canvas Element */}
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          overflow: "hidden",
        }}
      >
        <div
          ref={certificateRef}
          className="w-[850px] h-[550px] p-12 bg-gradient-to-br from-[#090714] via-[#120b29] to-[#05040a] border-4 border-cyber-primary/30 rounded-xl relative flex flex-col justify-between text-white font-mono shadow-2xl"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyber-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex justify-between items-start border-b border-white/10 pb-6 relative z-10">
            <div>
              <div className="text-[11px] text-cyber-primary tracking-[0.25em] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse" />
                Syscape Secure Cryptographic Credential
              </div>
              <h1 className="text-2xl font-black text-white tracking-wider uppercase mt-1">
                Node Authentication Certificate
              </h1>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase">
                System Registry Code
              </div>
              <div className="text-xs text-cyber-secondary font-bold font-mono tracking-wider">
                SYS-ID-
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="space-y-6 my-auto text-center relative z-10 px-6">
            <p className="text-xs text-white/50 tracking-widest uppercase">
              This data sequence certifies that the user identity token
            </p>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 tracking-wide uppercase py-1 border-b border-white/5 inline-block min-w-[300px]">
              {profile?.username || "OPERATOR LOGGED"}
            </h2>
            <p className="text-xs text-white/50 tracking-widest uppercase">
              has safely mounted, deployment verified, and initialized the
              execution block
            </p>
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-5 max-w-xl mx-auto backdrop-blur-md shadow-inner">
              <h3 className="text-xl font-bold text-cyber-primary font-mono tracking-wide uppercase">
                {activeCert?.title || "CORE_NODE_PARAMETER"}
              </h3>
              <p className="text-xs text-white/70 font-sans italic mt-1.5">
                Issued Authority Reference:{" "}
                {activeCert?.organization || "Root Registry Organization Node"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-white/10 pt-6 relative z-10">
            <div className="space-y-1">
              <div className="text-[9px] text-white/40 uppercase tracking-wider">
                Timeline Parameter
              </div>
              <div className="text-xs font-bold text-cyber-secondary bg-cyber-secondary/10 border border-cyber-secondary/20 px-3 py-1 rounded">
                CLASS SYSTEM CYCLE: {activeCert?.year || "2026"}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center opacity-80 text-cyber-primary">
              <VscVerified
                size={52}
                className="drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
              />
              <span className="text-[8px] tracking-widest text-white/40 uppercase mt-1">
                Verified Node
              </span>
            </div>
            <div className="space-y-1 text-right font-mono text-[9px] text-white/40">
              <div>CRITICAL SECURE INTEGRITY LAYER</div>
              <div className="text-cyber-primary font-bold">
                STATUS: AUTHENTIC-SUCCESS // 0x71F...89A9
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
