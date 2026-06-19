import React, { useState, useRef, useEffect } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRotateCw,
  FiSearch,
} from "react-icons/fi";

export default function ChromeApp() {
  // Initialize to an empty string to remove external Bing engines entirely
  const [url, setUrl] = useState("");
  const [inputVal, setInputVal] = useState("");

  // Clean lifecycle key engine to handle iframe refreshing safely
  const [refreshKey, setRefreshKey] = useState(0);

  // State tracking for the application wrapper's bounding box
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Monitor physical window changes to calculate the correct micro-scale mapping
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Prevent division-by-zero errors if the window minimizes
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    let targetUrl = inputVal.trim();

    if (!targetUrl) return;

    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }
    setUrl(targetUrl);
    setInputVal(targetUrl);
  };

  // Keep the input synchronized if external actions modify the core target route
  useEffect(() => {
    setInputVal(url);
  }, [url]);

  // Virtual desktop baseline target config
  const VIRTUAL_WIDTH = 1280;
  const scaleFactor = dimensions.width / VIRTUAL_WIDTH;
  const virtualHeight = dimensions.height / scaleFactor;

  return (
    <div className="flex flex-col h-full w-full bg-[#121214] font-sans overflow-hidden select-text text-xs text-white">
      {/* Browser Header Navigation Array */}
      <div className="flex items-center gap-2 bg-[#1a1a1f] px-3 py-2 border-b border-white/5 select-none shrink-0">
        <div className="flex items-center gap-1.5 text-white/40">
          <button
            type="button"
            onClick={() => {
              setUrl("");
              setInputVal("");
            }}
            className="p-1 hover:bg-white/5 rounded transition active:scale-95 text-white/60"
            title="Home / Reset Browser"
          >
            <FiArrowLeft size={14} />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-white/5 rounded transition cursor-not-allowed opacity-20"
          >
            <FiArrowRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (url) setRefreshKey((prev) => prev + 1);
            }}
            className={`p-1 rounded transition active:scale-95 text-white/60 ${!url ? "cursor-not-allowed opacity-20" : "hover:bg-white/5"}`}
            title="Reload page"
            disabled={!url}
          >
            <FiRotateCw size={14} />
          </button>
        </div>

        {/* Address Bar Engine */}
        <form
          onSubmit={handleNavigate}
          className="flex-1 flex items-center gap-2 bg-black/40 border border-white/5 rounded px-3 py-1 focus-within:border-cyber-primary/40 transition-all"
        >
          <FiSearch className="text-white/20 shrink-0" size={13} />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white/80 font-mono text-[11px] selection:bg-cyber-primary/20"
            placeholder="Type or paste application URL here..."
          />
        </form>
      </div>

      {/* Frame Engine Matrix Viewport Wrapper */}
      <div
        ref={containerRef}
        className="flex-1 relative w-full bg-[#0d0d11] overflow-hidden"
      >
        {url ? (
          <>
            <iframe
              key={refreshKey}
              src={url}
              title="Google Chrome Virtual Environment Window"
              className="absolute top-0 left-0 block border-none m-0 p-0 origin-top-left"
              sandbox="allow-scripts allow-same-origin allow-forms"
              style={{
                width: `${VIRTUAL_WIDTH}px`,
                height: `${virtualHeight}px`,
                transform: `scale(${scaleFactor})`,
              }}
            />

            {/* Isolated Notice Banner Layer */}
            <div className="absolute bottom-2 left-2 pointer-events-none bg-black/80 backdrop-blur-xs text-[9px] text-white/40 px-2 py-0.5 rounded font-mono border border-white/5 tracking-wider uppercase z-10">
              Sandbox Containment Active // Scale:{" "}
              {(scaleFactor * 100).toFixed(0)}%
            </div>
          </>
        ) : (
          /* Modern Minimalist SaaS Placeholder Viewport */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 select-none">
            {/* Soft Ambient Core Aura Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-cyber-primary/10 to-[#8b5cf6]/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative max-w-sm w-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center shadow-cyber-primary/20 shadow-2xl flex flex-col items-center gap-5">
              {/* Encapsulated Network Globe Hub Logo */}
              <div className="w-14 h-14  flex items-center justify-center">
                <img src="./icons/browser.png" alt="Sys Browser" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xs font-bold tracking-widest text-white uppercase font-mono">
                  Syscape Virtual Browser
                </h2>
                <p className="text-[11px] text-white/40 font-sans max-w-[260px] mx-auto leading-relaxed">
                  Enter a valid, target deployment web address into the browser
                  address input bar above to initialize an environment stream.
                </p>
              </div>

              {/* Status Array Sub-System */}
              <div className="w-full grid grid-cols-2 gap-2 pt-1 text-left font-mono text-[9px]">
                <div className="bg-black/30 border border-white/5 rounded-lg p-2.5 flex flex-col gap-0.5">
                  <span className="text-cyber-primary uppercase tracking-wider text-[7px]">
                    Security
                  </span>
                  <span className="text-cyber-success font-bold">
                    CONTAINED READY
                  </span>
                </div>
                <div className="bg-black/30 border border-white/5 rounded-lg p-2.5 flex flex-col gap-0.5">
                  <span className="text-cyber-primary uppercase tracking-wider text-[7px]">
                    Network
                  </span>
                  <span className="text-cyber-success font-bold">
                    GATEWAY ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
