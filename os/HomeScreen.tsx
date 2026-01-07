
import React from 'react';
import { CloudSun, Calendar, Activity } from 'lucide-react';
import { Theme, AppDefinition } from '../shared/types/common.types';

interface HomeScreenProps {
    theme: Theme;
    apps: AppDefinition[];
    onAppClick: (app: AppDefinition) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ theme, apps, onAppClick }) => {

    // Icon Color Helper for Frutiger Theme - Updated to Eco Palette
    const getIconColor = (color: string) => {
        const colors: Record<string, string> = {
            yellow: 'text-amber-400',
            green: 'text-lime-400',
            orange: 'text-orange-400',
            emerald: 'text-emerald-400',
            blue: 'text-cyan-400',
            purple: 'text-purple-400',
            cyan: 'text-cyan-400',
            teal: 'text-teal-400',
            slate: 'text-slate-400'
        };
        return colors[color] || 'text-white';
    }

    // Layout Logic
    const isAero = theme === 'frutiger';
    const preferredDockOrder = ['about', 'camera', 'settings'];

    const dockApps = isAero
        ? apps.filter(app => preferredDockOrder.includes(app.id))
            .sort((a, b) => preferredDockOrder.indexOf(a.id) - preferredDockOrder.indexOf(b.id))
        : [];

    const gridApps = isAero
        ? apps.filter(app => !preferredDockOrder.includes(app.id))
        : apps;

    return (
        <div className={`flex-1 flex flex-col pt-[max(4rem,env(safe-area-inset-top))] transition-all duration-500 animate-fade-in relative h-full`}>

            {/* Scrollable Content Area */}
            {/* Scrollable Content Area */}
            <div className="flex-1 px-6 overflow-y-auto app-scroll pb-28">
                {/* Widgets */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`h-40 p-5 flex flex-col justify-between transition-all ${isAero ? 'glass-panel text-primary-dark widget-dim' : 'hud-panel text-cyan-400'}`}>
                        <div className="flex justify-between items-start">
                            <CloudSun size={32} className={`drop-shadow-sm ${isAero ? 'text-[#6EC6FF]' : 'text-cyan-400'}`} />
                            <span className={`text-xs font-bold uppercase tracking-wide ${isAero ? 'text-secondary-dark' : 'opacity-90'}`}>
                                {isAero ? 'ECO DOME' : 'Env_Stat'}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-light tracking-tighter drop-shadow-sm">72°</span>
                            <div className={`text-sm font-medium ${isAero ? 'text-secondary-dark' : 'opacity-90'}`}>Clear Sky</div>
                        </div>
                    </div>
                    <div className={`h-40 p-5 flex flex-col justify-between transition-all ${isAero ? 'glass-panel text-primary-dark widget-dim' : 'hud-panel text-cyan-400'}`}>
                        <div className="flex justify-between items-start">
                            <Calendar size={26} className={`drop-shadow-sm ${isAero ? 'text-[#5EEAD4]' : ''}`} />
                            {theme === 'cyber' && <Activity size={16} className="animate-pulse" />}
                            <span className={`text-xs font-bold uppercase tracking-wide ${isAero ? 'text-secondary-dark' : 'hidden'}`}>
                                DATE
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xs uppercase tracking-wide mb-1 ${isAero ? 'text-muted-dark' : 'opacity-90'}`}>Day 24</span>
                            <span className="text-3xl font-bold uppercase drop-shadow-sm tracking-wide">{new Date().toLocaleDateString([], { weekday: 'short' })}</span>
                        </div>
                    </div>
                </div>

                {/* Icons Grid */}
                <div className={`grid grid-cols-4 gap-y-6 gap-x-4 ${theme === 'cyber' ? 'pt-4' : ''}`}>
                    {gridApps.map((app) => (
                        <div key={app.id} onClick={() => onAppClick(app)} className="flex flex-col items-center gap-2 cursor-pointer group">
                            {/* Frutiger / Aero Icon Style */}
                            {theme === 'frutiger' && (
                                <div
                                    className={`w-[60px] h-[60px] flex items-center justify-center glass-tile icon-enhanced group-active:scale-95`}
                                >
                                    <app.icon
                                        size={28}
                                        className={`${getIconColor(app.color)} drop-shadow-sm opacity-90`}
                                        strokeWidth={2}
                                    />
                                </div>
                            )}

                            {/* Cyber Hexagon Style - Default for Apps */}
                            {theme === 'cyber' && (
                                <div className="hex-border-wrap transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                                    <div className="w-16 h-16 hex-icon flex items-center justify-center border-2 border-cyan-500/50 bg-black/60 shadow-[inset_0_0_10px_rgba(0,255,255,0.2)]">
                                        <app.icon size={24} className="text-cyan-400 group-hover:text-white group-hover:drop-shadow-[0_0_5px_cyan]" strokeWidth={1.5} />
                                    </div>
                                </div>
                            )}

                            <span className={`text-[13px] font-medium tracking-normal text-center leading-tight ${theme === 'frutiger' ? 'text-app-label drop-shadow-none' : 'text-cyan-600 uppercase font-mono group-hover:text-cyan-400 shadow-black/10'}`}>{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* DOCK (Aero Only) */}
            {isAero && (
                <div className="absolute bottom-6 left-4 right-4 h-[90px] dock-glass flex items-center justify-around px-2 z-50">
                    {dockApps.map((app) => (
                        <div key={app.id} onClick={() => onAppClick(app)} className="h-full flex flex-col justify-center items-center cursor-pointer group w-1/4">
                            <div
                                className={`w-[54px] h-[54px] flex items-center justify-center glass-tile icon-enhanced dock-icon-scale rounded-[20px] bg-white/40 group-hover:bg-white/60 transition-all`}
                            >
                                <app.icon
                                    size={30}
                                    className={`${getIconColor(app.color)} drop-shadow-sm`}
                                    strokeWidth={2.5}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
