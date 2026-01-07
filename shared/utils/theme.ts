
import { Theme } from '../types/common.types';

export const getThemeStyles = (theme: Theme) => {
    if (theme === 'frutiger') {
        return {
            container: "glass-panel h-full flex flex-col mx-2 mt-2 overflow-hidden", // Aero glass container
            header: "px-4 py-3 flex items-center justify-between border-b border-white/40 shrink-0",
            card: "glass-panel",
            button: "bg-white/70 backdrop-blur-md text-[#1F3A4D] shadow-sm border border-white/60 rounded-xl active:scale-95 transition-all hover:bg-white hover:shadow-md",
            text: "text-[#1F3A4D]", // Soft Text Dark
            accent: "text-[#5EEAD4]", // Aqua Green
            font: "font-aero" // Inter
        };
    } else {
        // Cyber / Robot HUD Theme
        return {
            container: "bg-black/90 hud-panel mt-2 mx-1 border-t-2 border-cyan-500/50",
            header: "bg-cyan-900/20 backdrop-blur-md border-b border-cyan-500/30 text-cyan-400 clip-path-polygon-[0_0,100%_0,100%_100%,0_100%]",
            card: "bg-black/40 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,255,255,0.05)] clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]",
            button: "bg-cyan-900/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 rounded-none active:scale-95 transition-all skew-x-[-10deg]",
            text: "text-cyan-400",
            accent: "text-cyan-500",
            font: "font-['Orbitron']"
        };
    }
};
