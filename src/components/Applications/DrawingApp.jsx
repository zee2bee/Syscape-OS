"use client";

import React, { useRef, useState, useEffect } from "react";
import { VscTrash, VscSave, VscInbox, VscPaintcan } from "react-icons/vsc";

export default function DrawingApp() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#00ffff");
  const [brushSize, setBrushSize] = useState(4);

  // Gallery states
  const [savedDrawings, setSavedDrawings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("syscape_drawings");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const PRESET_COLORS = [
    "#00ffff", // Cyber Cyan
    "#a12559", // Romanteek Luxury Rose
    "#ff0055", // Neon Magenta
    "#39ff14", // Neon Green
    "#ffff00", // Matrix Yellow
    "#000000", // Midnight Black
    "#ffffff", // Core Light White
    "#7000ff", // Ultraviolet
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Clear the canvas layout cleanly to initial base
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Sync canvas lines with brush choices
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
  }, [currentColor, brushSize]);

  // Coordinates matrix tracking helper
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    // Support multi-touch vectors alongside mouse clicks
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvasWorkspace = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const commitSaveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const newDrawing = {
      id: `draw_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      data: dataUrl,
    };

    const updated = [newDrawing, ...savedDrawings];
    setSavedDrawings(updated);
    localStorage.setItem("syscape_drawings", JSON.stringify(updated));
    clearCanvasWorkspace();
  };

  const purgeDrawingFromRegistry = (id) => {
    const updated = savedDrawings.filter((d) => d.id !== id);
    setSavedDrawings(updated);
    localStorage.setItem("syscape_drawings", JSON.stringify(updated));
  };

  return (
    <div className="w-full h-full flex bg-black/40 text-white font-mono text-xs select-none">
      {/* Control Console Sidebar */}
      <div className="w-44 border-r border-white/10 flex flex-col bg-black/20 shrink-0 p-2.5 space-y-4">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-2">
            Palette Core
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setCurrentColor(color)}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded border transition-all ${
                  currentColor === color
                    ? "border-cyber-primary scale-90 ring-1 ring-cyber-primary"
                    : "border-white/10 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
            Vector Weight ({brushSize}px)
          </span>
          <input
            type="range"
            min="2"
            max="18"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full accent-cyber-primary cursor-pointer bg-white/10 h-1 rounded-lg appearance-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={clearCanvasWorkspace}
            className="w-full p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 flex items-center justify-center gap-1.5 transition-all text-[11px]"
          >
            <VscPaintcan size={13} /> CLEAR BLOCK
          </button>
          <button
            type="button"
            onClick={commitSaveDrawing}
            className="w-full p-2 rounded bg-cyber-primary/20 border border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary/30 flex items-center justify-center gap-1.5 transition-all font-bold text-[11px]"
          >
            <VscSave size={13} /> CAPTURE
          </button>
        </div>

        {/* Saved Submissions Deck */}
        <div className="flex-1 flex flex-col min-h-0 pt-2 border-t border-white/10">
          <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1">
            <VscInbox size={12} /> Secure Vault
          </span>
          <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
            {savedDrawings.map((draw) => (
              <div
                key={draw.id}
                className="group relative rounded border border-white/5 bg-white/5 overflow-hidden aspect-video transition-all hover:border-cyber-primary/30"
              >
                <img
                  src={draw.data}
                  alt="Saved draw data"
                  className="w-full h-full object-cover bg-white"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-2">
                  <span className="text-[9px] text-white/60 font-mono">
                    {draw.timestamp}
                  </span>
                  <button
                    type="button"
                    onClick={() => purgeDrawingFromRegistry(draw.id)}
                    className="p-1 rounded bg-cyber-secondary/20 border border-cyber-secondary/40 text-cyber-secondary hover:bg-cyber-secondary/40 transition-colors"
                  >
                    <VscTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
            {savedDrawings.length === 0 && (
              <div className="text-center text-[9px] text-white/20 pt-4 uppercase tracking-widest leading-relaxed">
                Vault Unused
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main White Matrix Screen Canvas */}
      <div className="flex-1 bg-black/10 p-3 flex items-center justify-center relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={540}
          height={360}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="bg-white rounded shadow-2xl border border-white/10 cursor-crosshair touch-none max-w-full max-h-full"
        />
      </div>
    </div>
  );
}
