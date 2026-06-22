import React, { useState, useRef, useEffect } from "react";
import { useOSStore } from "../../store/osStore";

export default function TerminalApp() {
  const { terminalHistory, addTerminalLine, clearTerminal, openWindow } =
    useOSStore();
  const [inputVal, setInputVal] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const interpretCommand = (e) => {
    if (e.key === "Enter") {
      const sanitized = inputVal.trim().toLowerCase();
      if (!sanitized) return;

      addTerminalLine({ text: `> ${inputVal}`, type: "input" });

      switch (sanitized) {
        case "help":
          addTerminalLine({
            text: "Authorized system directory operations modules:",
            type: "info",
          });
          addTerminalLine({
            text: "  about        - Displays local hardware host telemetry core.",
            type: "info",
          });
          addTerminalLine({
            text: "  projects     - Boots file viewer interface for local logs.",
            type: "info",
          });
          addTerminalLine({
            text: "  gallery      - Mounts media frame buffer pipeline application.",
            type: "info",
          });
          addTerminalLine({
            text: "  achievements - Initializes certificate verification systems.",
            type: "info",
          });
          addTerminalLine({
            text: "  browser      - Opens integrated sandbox browser node.",
            type: "info",
          });
          addTerminalLine({
            text: "  notes        - Mounts the secure text memory layer terminal.",
            type: "info",
          });
          addTerminalLine({
            text: "  canvas       - Launches the Neon Graphic matrix designer.",
            type: "info",
          });
          addTerminalLine({
            text: "  calculator   - Boots basic ALU calculation system.",
            type: "info",
          });
          addTerminalLine({
            text: "  tictactoe    - Initiates game process vs internal cyber logic.",
            type: "info",
          });
          addTerminalLine({
            text: "  clear        - Flushes line memory history tracker pool.",
            type: "info",
          });
          break;

        case "about":
          addTerminalLine({
            text: "SYSCORE OS Core Framework Node // Version 2.6.1\nArchitecture built on high performance react thread layers.",
            type: "success",
          });
          break;

        case "projects":
          openWindow("projects", "Projects.exe");
          addTerminalLine({
            text: "Process spawned: Projects.exe",
            type: "success",
          });
          break;

        case "gallery":
          openWindow("gallery", "Gallery.exe");
          addTerminalLine({
            text: "Process spawned: Gallery.exe",
            type: "success",
          });
          break;

        case "achievements":
          openWindow("achievements", "Achievements.exe");
          addTerminalLine({
            text: "Process spawned: Achievements.exe",
            type: "success",
          });
          break;

        case "browser":
          openWindow("browser", "Syscape Browser");
          addTerminalLine({
            text: "Process spawned: Syscape Browser",
            type: "success",
          });
          break;

        case "notes":
          openWindow("cybernotes", "CyberNotes Terminal v1.0");
          addTerminalLine({
            text: "Process spawned: CyberNotes Terminal",
            type: "success",
          });
          break;

        case "canvas":
          openWindow("neoncanvas", "NeonCanvas Visual Interface");
          addTerminalLine({
            text: "Process spawned: NeonCanvas Interface",
            type: "success",
          });
          break;

        case "calculator":
          openWindow("calculator", "Calculator.sys Core ALU");
          addTerminalLine({
            text: "Process spawned: Calculator.sys Core ALU",
            type: "success",
          });
          break;

        case "tictactoe":
          openWindow("tictactoe", "TicTacToe Core Game");
          addTerminalLine({
            text: "Process spawned: TicTacToe Logic Sandbox Engine",
            type: "success",
          });
          break;

        case "clear":
          clearTerminal();
          break;

        default:
          addTerminalLine({
            text: `Command not found: '${inputVal}'. Use 'help' for directory listings.`,
            type: "error",
          });
          break;
      }
      setInputVal("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 font-mono text-xs text-cyber-text rounded p-2">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 pr-1">
        {terminalHistory.map((line, idx) => {
          let textStyle = "text-white/80";
          if (line.type === "input") textStyle = "text-cyber-primary font-bold";
          if (line.type === "success") textStyle = "text-cyber-success";
          if (line.type === "error")
            textStyle = "text-cyber-secondary font-semibold";
          if (line.type === "info") textStyle = "text-cyan-300";
          return (
            <p
              key={idx}
              className={`${textStyle} whitespace-pre-wrap leading-relaxed`}
            >
              {line.text}
            </p>
          );
        })}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 pt-2 mt-2">
        <span className="text-cyber-primary font-bold">syscape_root$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={interpretCommand}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-mono"
          autoFocus
        />
      </div>
    </div>
  );
}
