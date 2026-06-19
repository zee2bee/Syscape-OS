import React, { useState, useEffect, useRef } from "react";
import { useOSStore } from "../../store/osStore";
import WindowFrame from "../Windows/WindowFrame";
import ProjectsApp from "../Applications/ProjectsApp";
import GalleryApp from "../Applications/GalleryApp";
import AchievementsApp from "../Applications/AchievementsApp";
import TerminalApp from "../Applications/TerminalApp";
import SettingsApp from "../Applications/SettingsApp";
import HobbyApp from "../Applications/HobbyApp";
import ChromeApp from "../Applications/ChromeApp";
import NotesApp from "../Applications/NotepadApp";
import DrawingApp from "../Applications/DrawingApp";
import CalculatorApp from "../Applications/CalculatorApp";
import TicTacToeApp from "../Applications/TicTacToeApp";
import { PREDEFINED_LOGOS } from "../../constants/osData";

import html2canvas from "html2canvas";
import { PiImageBrokenBold } from "react-icons/pi";

// Reusable Virtual Scaling Engine for Desktop App Simulations
function DesktopSandboxIframe({ src, title }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const VIRTUAL_WIDTH = 1280; // Baseline standard desktop layout breakpoint
  const scaleFactor = dimensions.width / VIRTUAL_WIDTH;
  const virtualHeight = dimensions.height / scaleFactor;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black/40 rounded"
    >
      <iframe
        src={src}
        title={title}
        className="absolute top-0 left-0 block border-none m-0 p-0 origin-top-left"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
        style={{
          width: `${VIRTUAL_WIDTH}px`,
          height: `${virtualHeight}px`,
          transform: `scale(${scaleFactor})`,
        }}
      />
    </div>
  );
}

export default function DesktopEnv() {
  const { profile, openWindows, openWindow, toggleWindow, focusedWindow } =
    useOSStore();

  const desktopViewportRef = useRef(null);
  const [systemTime, setSystemTime] = useState("");

  // Core Real-Time Digital System Ticker Engine
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setSystemTime(`${dateStr} @ ${timeStr}`.toUpperCase());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Screen Capture Logic via html2canvas
  const captureDesktopEnvironment = async () => {
    if (!desktopViewportRef.current) return;

    try {
      // Configuration options ensure CORS images load correctly and background styles are respected
      const canvas = await html2canvas(desktopViewportRef.current, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        scale: window.devicePixelRatio || 2, // Capture at higher resolution for crispness
      });

      // Convert canvas data to binary download sequence
      const screenshotDataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = screenshotDataUrl;
      downloadLink.download = `syscore-capture-${Date.now()}.png`;
      downloadLink.click();
    } catch (error) {
      console.error("System interface compilation capture failure:", error);
    }
  };

  const targetLogoId =
    typeof profile?.logo === "object" ? profile?.logo?.id : profile?.logo;
  const systemLogoObj = PREDEFINED_LOGOS.find((l) => l.id === targetLogoId);

  // Icon assets defined independently of container sizing layout for multi-layer reuse
  const desktopIcons = [
    {
      id: "projects",
      title: "Projects.exe",
      icon: (
        <img
          src="./icons/projects.png"
          alt="Projects App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=PRO";
          }}
        />
      ),
    },
    {
      id: "gallery",
      title: "Gallery.exe",
      icon: (
        <img
          src="./icons/gallery.png"
          alt="Gallery App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=GAL";
          }}
        />
      ),
    },
    {
      id: "achievements",
      title: "Achievements.exe",
      icon: (
        <img
          src="./icons/achievement.png"
          alt="Achievements App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=ACH";
          }}
        />
      ),
    },
    {
      id: "browser",
      title: "Sys Browser",
      icon: (
        <img
          src="./icons/browser.png"
          alt="Sys Browser"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=SB";
          }}
        />
      ),
    },
    {
      id: "calculator",
      title: "Calculator.exe",
      icon: (
        <img
          src="./icons/calculator.png"
          alt="Calculator App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=CALC";
          }}
        />
      ),
    },
    {
      id: "tictactoe",
      title: "TicTacToe.exe",
      icon: (
        <img
          src="./icons/tic-tac-toe.png"
          alt="TicTacToe App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=TTT";
          }}
        />
      ),
    },
    {
      id: "flagverse",
      title: "FlagVerse",
      icon: (
        <img
          src="./icons/flagverse.png"
          alt="FlagVerse App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=FV";
          }}
        />
      ),
    },
    {
      id: "echoexe",
      title: "Echo.exe",
      icon: (
        <img
          src="./icons/echoexe.png"
          alt="Echo.exe App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=ECHO";
          }}
        />
      ),
    },
    {
      id: "vibesky",
      title: "VibeSky",
      icon: (
        <img
          src="./icons/vibesky.png"
          alt="VibeSky App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=VS";
          }}
        />
      ),
    },
    {
      id: "documentation",
      title: "Documentation.pdf",
      icon: (
        <img
          src="./icons/documentation.png"
          alt="Documentation App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=DOC";
          }}
        />
      ),
    },
    {
      id: "quran",
      title: "Quran.pdf",
      icon: (
        <img
          src="./icons/quran.png"
          alt="Quran App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=Q";
          }}
        />
      ),
    },
    {
      id: "cybernotes",
      title: "Cyber Notes",
      icon: (
        <img
          src="./icons/notebook.png"
          alt="Cyber Notes App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=CYB";
          }}
        />
      ),
    },
    {
      id: "neoncanvas",
      title: "Neon Canvas",
      icon: (
        <img
          src="./icons/color-palette.png"
          alt="Neon Canvas App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=NC";
          }}
        />
      ),
    },
    {
      id: "terminal",
      title: "Terminal.exe",
      icon: (
        <img
          src="./icons/terminal.png"
          alt="Terminal App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=TERM";
          }}
        />
      ),
    },
    {
      id: "settings",
      title: "Settings.exe",
      icon: (
        <img
          src="./icons/settings.png"
          alt="Settings App"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://placehold.co/32?text=SET";
          }}
        />
      ),
    },
  ];

  const hobbyIcons = (profile?.hobbies || []).map((hobby, index) => ({
    id: `hobby_${index}`,
    title: `${hobby.name}.exe`,
    icon: (
      <img
        src="./icons/hobby.png"
        alt="Hobby App"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.src = "https://placehold.co/32?text=HOB";
        }}
      />
    ),
    isHobby: true,
    hobbyName: hobby.name,
  }));

  const compositeIcons = [...desktopIcons, ...hobbyIcons];

  return (
    <div
      ref={desktopViewportRef}
      className="w-screen h-screen relative select-none flex flex-col justify-between overflow-hidden"
      style={{
        background: profile?.wallpaper || "#0a0a12",
        backgroundSize: "cover",
      }}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Workspace App Grid */}
      <div className="flex-1 relative p-4 grid grid-flow-row grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 items-start content-start">
        {compositeIcons.map((ico) => (
          <button
            key={ico.id}
            onClick={() => openWindow(ico.id, ico.title)}
            className="flex flex-col items-center justify-center p-2 rounded border border-transparent hover:bg-white/5 hover:border-white/10 transition-all w-20 text-center space-y-1.5"
          >
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden border-white/5 p-0.5 drop-shadow-md transition-transform active:scale-95">
              {ico.icon}
            </div>
            <span className="text-[10px] text-white font-mono font-medium truncate w-full tracking-wide drop-shadow">
              {ico.title}
            </span>
          </button>
        ))}

        {/* Windows Rendering Subsystems */}
        {openWindows["projects"] && (
          <WindowFrame id="projects" title="Projects.exe">
            <ProjectsApp />
          </WindowFrame>
        )}
        {openWindows["gallery"] && (
          <WindowFrame id="gallery" title="Gallery.exe">
            <GalleryApp />
          </WindowFrame>
        )}
        {openWindows["achievements"] && (
          <WindowFrame id="achievements" title="Achievements.exe">
            <AchievementsApp />
          </WindowFrame>
        )}
        {openWindows["browser"] && (
          <WindowFrame id="browser" title="Syscape Browser">
            <ChromeApp />
          </WindowFrame>
        )}

        {/* Echo.exe Embedded Subsystem Viewport */}
        {openWindows["echoexe"] && (
          <WindowFrame id="echoexe" title="Echo.exe">
            <DesktopSandboxIframe
              src="https://echo-exe.netlify.app/"
              title="Echo.exe Execution Node"
            />
          </WindowFrame>
        )}

        {/* FlagVerse Embedded Subsystem Viewport */}
        {openWindows["flagverse"] && (
          <WindowFrame id="flagverse" title="FlagVerse">
            <DesktopSandboxIframe
              src="https://flagverse-world.netlify.app/"
              title="FlagVerse Execution Node"
            />
          </WindowFrame>
        )}

        {/* VibeSky Embedded Subsystem Viewport */}
        {openWindows["vibesky"] && (
          <WindowFrame id="vibesky" title="VibeSky">
            <DesktopSandboxIframe
              src="https://vibesky.netlify.app/"
              title="VibeSky Execution Node"
            />
          </WindowFrame>
        )}

        {/* Local Document Engine Core (Quran PDF) */}
        {openWindows["quran"] && (
          <WindowFrame id="quran" title="Quran.pdf">
            <iframe
              src="./pdf/quran.pdf"
              title="Quran Core Framework Asset"
              className="w-full h-full min-h-[350px] border-none block rounded bg-white/5"
            />
          </WindowFrame>
        )}

        {openWindows["documentation"] && (
          <WindowFrame id="documentation" title="documentation.pdf">
            <iframe
              src="./pdf/documentation.pdf"
              title="Documentation Core Framework Asset"
              className="w-full h-full min-h-[350px] border-none block rounded bg-white/5"
            />
          </WindowFrame>
        )}

        {/* Terminal Subsystem Node */}
        {openWindows["terminal"] && (
          <WindowFrame id="terminal" title="Terminal.exe">
            <TerminalApp />
          </WindowFrame>
        )}
        {openWindows["settings"] && (
          <WindowFrame id="settings" title="Settings.exe">
            <SettingsApp />
          </WindowFrame>
        )}

        {/* CyberNotes Memory Layer */}
        {openWindows["cybernotes"] && (
          <WindowFrame id="cybernotes" title="CyberNotes Terminal v1.0">
            <NotesApp />
          </WindowFrame>
        )}

        {/* NeonCanvas Pixel Layer */}
        {openWindows["neoncanvas"] && (
          <WindowFrame id="neoncanvas" title="NeonCanvas Visual Interface">
            <DrawingApp />
          </WindowFrame>
        )}
        {openWindows["calculator"] && (
          <WindowFrame id="calculator" title="Calculator.sys Core ALU">
            <CalculatorApp />
          </WindowFrame>
        )}

        {openWindows["tictactoe"] && (
          <WindowFrame id="tictactoe" title="TicTacToe Logic Sandbox Engine">
            <TicTacToeApp />
          </WindowFrame>
        )}

        {/* Render Dynamic Hobby Processes */}
        {(profile?.hobbies || []).map((hobby, index) => {
          const appKey = `hobby_${index}`;
          return (
            openWindows[appKey] && (
              <WindowFrame key={appKey} id={appKey} title={`${hobby.name}.exe`}>
                <HobbyApp name={hobby.name} />
              </WindowFrame>
            )
          );
        })}
      </div>

      {/* Watermark & Screenshot Stack System */}
      <div className="absolute bottom-16 right-4 z-10 flex flex-col items-end gap-2">
        {/* Screenshot Interactive Button Layer placed strictly at the top */}
        <button
          type="button"
          onClick={captureDesktopEnvironment}
          className="flex items-center justify-center p-1.5 bg-black/20 backdrop-blur-xs rounded border border-white/5 hover:border-cyber-primary/40 hover:bg-cyber-primary/10 transition-all duration-200 active:scale-95 group shadow-sm"
          title="Capture Core System Viewport"
        >
          <img
            src="./icons/screenshot.png"
            alt="Screenshot Icon"
            className="w-8 h-8 opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] transition-all duration-200"
          />
        </button>

        {/* Existing Credits Watermark Div */}
        <div className="font-mono text-[11px] text-white/30 tracking-wider text-right bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded border border-white/5">
          <span>
            Syscore{" "}
            <img
              src="./icon.png"
              alt="Syscore Logo"
              className="inline-block w-4 h-4 ml-1"
            />{" "}
            // Miniverse by{" "}
          </span>
          <a
            href="https://zubyr.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-primary hover:text-white font-bold underline underline-offset-4 decoration-cyber-primary/40 hover:decoration-white transition-all duration-200"
          >
            Zubyr
          </a>
        </div>
      </div>

      {/* Styled Taskbar Interface Layer */}
      <footer className="w-full h-12 bg-black/60 border-t border-white/10 backdrop-blur-md px-4 flex items-center justify-between gap-4 z-[999] font-mono text-xs shrink-0 select-none">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-6 h-6 filter drop-shadow-md flex items-center justify-center">
            {systemLogoObj?.image ? (
              <img
                src={systemLogoObj.image}
                alt={systemLogoObj.name || "OS Core Logo"}
                className="w-full h-full object-contain"
              />
            ) : (
              <PiImageBrokenBold size={20} className="text-white/40" />
            )}
          </div>
          <div className="hidden sm:block border-l border-white/20 h-4" />
          <span className="text-white/80 font-bold tracking-wider hidden sm:inline uppercase truncate max-w-[140px] md:max-w-none">
            {profile?.username || "Operator"} // SYSCAPE OS
          </span>
        </div>

        {/* Active Taskbar Track - Re-engineered as a high-end Icon Dock Slot system */}
        <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-none py-1 max-w-[45%] sm:max-w-[55%] md:max-w-[65%] select-none justify-start">
          {Object.keys(openWindows).map((winKey) => {
            const app = openWindows[winKey];
            const isWindowFocused =
              focusedWindow === winKey && !app.isMinimized;
            const iconConfig = compositeIcons.find((ico) => ico.id === winKey);

            return (
              <button
                key={winKey}
                type="button"
                onClick={() => toggleWindow(winKey, app.title)}
                title={app.title} // UX Improvement: Native tooltip fallback on icon hover
                className={`w-9 h-9 rounded flex flex-col items-center justify-center relative transition-all shrink-0 border select-none duration-150 active:scale-95 ${
                  isWindowFocused
                    ? "bg-cyber-primary/10 border-cyber-primary shadow-[0_0_8px_rgba(0,255,255,0.2)] text-cyber-primary"
                    : app.isMinimized
                      ? "bg-white/5 border-white/5 opacity-40 hover:opacity-70 text-white/30"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {/* Dynamically downscaled context window icon */}
                <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
                  {iconConfig ? (
                    iconConfig.icon
                  ) : (
                    <PiImageBrokenBold size={16} className="text-white/40" />
                  )}
                </div>

                {/* Micro-interactive active/minimized indicator layer */}
                <span
                  className={`absolute bottom-0.5 h-1 rounded-full transition-all duration-200 ${
                    isWindowFocused
                      ? "bg-cyber-primary shadow-[0_0_4px_#00ffff] w-2.5"
                      : app.isMinimized
                        ? "bg-white/20 animate-pulse w-1"
                        : "bg-white/60 w-1"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* System Clock */}
        <div className="text-white/50 text-[10px] tracking-wider select-none font-mono text-right shrink-0 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
          {systemTime || "LOADING SYSTEM TIME..."}
        </div>
      </footer>
    </div>
  );
}
