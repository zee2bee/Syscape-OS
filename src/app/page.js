"use client";
"use strict";

import React, { useEffect } from "react";
import { useOSStore } from "../store/osStore";
import SetupWizard from "../components/Setup/SetupWizard";
import BootScreen from "../components/Desktop/BootScreen";
import DesktopEnv from "../components/Desktop/DesktopEnv";

export default function Home() {
  const { isSetupComplete, isBooted, initializeOS } = useOSStore();

  useEffect(() => {
    initializeOS();
  }, [initializeOS]);

  // Initial Workspace Wizard Configuration State
  if (!isSetupComplete) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#06060c] p-4 relative overflow-hidden">
        {/* Subtle background decorative ambient glow layout */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/5 rounded-full filter blur-[120px] pointer-events-none" />
        <SetupWizard />
      </div>
    );
  }

  // Sequenced Kernel Loading Animation Transition State
  if (!isBooted) {
    return <BootScreen />;
  }

  // Active Fully Formed Desktop Operations Viewport Matrix
  return <DesktopEnv />;
}
