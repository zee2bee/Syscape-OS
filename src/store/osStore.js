import { create } from "zustand";

export const useOSStore = create((set, get) => ({
  // Profile State
  profile: null,
  isSetupComplete: false,
  isBooted: false,

  // Window System State
  openWindows: {}, // Structure: { appId: { id: string, title: string, zIndex: number, isMinimized: boolean } }
  windowOrder: [], // Stack of app IDs tracking focus hierarchy
  focusedWindow: null,

  // Terminal Line Memory
  terminalHistory: [
    { text: "Syscape Kernel v2.6.1 Loaded Successfully.", type: "success" },
    {
      text: "Type 'help' to review authorized system procedures.",
      type: "info",
    },
  ],

  initializeOS: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("syscape_profile");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          set({ profile: parsed, isSetupComplete: true });
        } catch (e) {
          console.error(
            "Corruption detected during profile deserialization.",
            e,
          );
        }
      }
    }
  },

  completeSetup: (profileData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("syscape_profile", JSON.stringify(profileData));
    }
    set({ profile: profileData, isSetupComplete: true, isBooted: false });
  },

  setBootComplete: () => set({ isBooted: true }),

  openWindow: (appId, title) => {
    set((state) => {
      const currentWindows = { ...state.openWindows };
      const currentOrder = [...state.windowOrder].filter((id) => id !== appId);

      currentOrder.push(appId);
      const targetZIndex = currentOrder.length + 10;

      // When opening/re-opening an application, ensure it is visible (isMinimized: false)
      currentWindows[appId] = {
        id: appId,
        title,
        zIndex: targetZIndex,
        isMinimized: false,
      };

      return {
        openWindows: currentWindows,
        windowOrder: currentOrder,
        focusedWindow: appId,
      };
    });
  },

  closeWindow: (appId) => {
    set((state) => {
      const currentWindows = { ...state.openWindows };
      delete currentWindows[appId];
      const currentOrder = [...state.windowOrder].filter((id) => id !== appId);
      const nextFocus =
        currentOrder.length > 0 ? currentOrder[currentOrder.length - 1] : null;

      return {
        openWindows: currentWindows,
        windowOrder: currentOrder,
        focusedWindow: nextFocus,
      };
    });
  },

  focusWindow: (appId) => {
    set((state) => {
      // If window is minimized, restore it first when requested
      const currentWindows = { ...state.openWindows };
      if (currentWindows[appId]?.isMinimized) {
        currentWindows[appId].isMinimized = false;
      }

      if (
        state.focusedWindow === appId &&
        !state.openWindows[appId]?.isMinimized
      )
        return {};

      const currentOrder = [...state.windowOrder].filter((id) => id !== appId);
      currentOrder.push(appId);

      currentOrder.forEach((id, index) => {
        if (currentWindows[id]) {
          currentWindows[id].zIndex = index + 10;
        }
      });

      return {
        openWindows: currentWindows,
        windowOrder: currentOrder,
        focusedWindow: appId,
      };
    });
  },

  minimizeWindow: (appId) => {
    set((state) => {
      const currentWindows = { ...state.openWindows };
      if (currentWindows[appId]) {
        currentWindows[appId].isMinimized = true;
      }

      // Remove from active focus order stack temporarily to determine next focus target
      const currentOrder = [...state.windowOrder];
      const nonMinimizedApps = currentOrder.filter(
        (id) => id !== appId && !currentWindows[id]?.isMinimized,
      );

      const nextFocus =
        nonMinimizedApps.length > 0
          ? nonMinimizedApps[nonMinimizedApps.length - 1]
          : null;

      return {
        openWindows: currentWindows,
        focusedWindow: nextFocus,
      };
    });
  },

  toggleWindow: (appId, title) => {
    const {
      openWindows,
      focusedWindow,
      minimizeWindow,
      focusWindow,
      openWindow,
    } = get();

    // If window isn't open yet, initialize it
    if (!openWindows[appId]) {
      openWindow(appId, title);
      return;
    }

    // If open but minimized, restore and focus it
    if (openWindows[appId].isMinimized) {
      focusWindow(appId);
    }
    // If open and currently active on top, minimize it
    else if (focusedWindow === appId) {
      minimizeWindow(appId);
    }
    // If open but buried behind other apps, focus and bring to front
    else {
      focusWindow(appId);
    }
  },

  addTerminalLine: (line) =>
    set((state) => ({
      terminalHistory: [...state.terminalHistory, line],
    })),

  clearTerminal: () => set({ terminalHistory: [] }),

  resetOS: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("syscape_profile");
    }
    set({
      profile: null,
      isSetupComplete: false,
      isBooted: false,
      openWindows: {},
      windowOrder: [],
      focusedWindow: null,
      terminalHistory: [
        { text: "System memory reset cleared successfully.", type: "info" },
      ],
    });
  },
}));
