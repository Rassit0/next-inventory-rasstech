
import { create } from 'zustand'

interface State {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    modeTheme: 'light' | 'dark';
    setModeTheme: (mode: 'light' | 'dark') => void;
}

export const useUIStore = create<State>((set) => ({
    isSidebarOpen: true,

    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    
    modeTheme: "light",
    setModeTheme: (mode: 'light' | 'dark') => set({ modeTheme: mode }),
}))
