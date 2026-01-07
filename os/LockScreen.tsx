
import React from 'react';
import { ChevronRight, Globe, Activity } from 'lucide-react';
import { Theme } from '../shared/types/common.types';

export const LockScreen: React.FC<{ onUnlock: () => void, theme: Theme }> = ({ onUnlock, theme }) => {
    return (
        <div className={`absolute inset-0 z-40 flex flex-col items-center justify-between pb-12 pt-24 transition-all duration-500 ${theme === 'frutiger' ? 'bg-white/10 backdrop-blur-xl text-white' : 'bg-black/90 backdrop-blur-md text-cyan-500 font-[\'Orbitron\']'}`}>

            {theme === 'cyber' && (
                <>
                    <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </>
            )}

            <div className="flex flex-col items-center animate-fade-in relative z-10 w-full">

                {theme === 'frutiger' ? (
                    <div className="mb-8 p-1 rounded-full animate-float shadow-[0_0_50px_rgba(255,255,255,0.6)]">
                        <div className="p-6 rounded-full bg-gradient-to-tr from-lime-400 to-cyan-500 shadow-2xl border-4 border-white/50">
                            <Globe size={64} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                        </div>
                    </div>
                ) : (
                    <div className="mb-8 relative w-48 h-48 flex items-center justify-center">
                        {/* Arc Reactor Animation */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-900 border-t-cyan-400 animate-spin-slow"></div>
                        <div className="absolute inset-4 rounded-full border border-cyan-800 border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 flex items-center justify-center bg-cyan-900/10 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                                <Activity size={48} className="text-cyan-400 animate-pulse" />
                            </div>
                        </div>
                        {/* Decorative HUD Lines */}
                        <div className="absolute -left-12 top-1/2 w-8 h-[1px] bg-cyan-800"></div>
                        <div className="absolute -right-12 top-1/2 w-8 h-[1px] bg-cyan-800"></div>
                    </div>
                )}

                <div className={`text-7xl font-light tracking-tighter drop-shadow-lg ${theme === 'frutiger' ? 'lock-time' : ''}`} suppressHydrationWarning>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                <div className={`text-lg mt-2 font-medium tracking-wide drop-shadow-md uppercase ${theme === 'frutiger' ? 'lock-date' : 'opacity-90'}`}>
                    {theme === 'frutiger' ? new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) : 'Security Protocol Active'}
                </div>
            </div>

            <div
                onClick={onUnlock}
                className={`relative group cursor-pointer w-64 h-16 flex items-center px-2 transition-all active:scale-95 overflow-hidden ${theme === 'frutiger' ? 'rounded-full unlock-bar' : 'hud-panel'}`}
            >
                <div className={`h-12 w-12 flex items-center justify-center shadow-lg transition-all group-hover:translate-x-48 duration-500 z-10 ${theme === 'frutiger' ? 'rounded-full unlock-thumb text-[#24566B]' : 'bg-cyan-500 text-black clip-path-polygon-[20%_0,100%_0,100%_100%,0%_100%,0%_20%]'}`}>
                    <ChevronRight size={28} />
                </div>
                <span className={`absolute inset-0 flex items-center justify-center pointer-events-none text-sm uppercase drop-shadow-sm ${theme === 'frutiger' ? 'unlock-text' : 'font-bold tracking-widest opacity-90 text-white'}`}>
                    {theme === 'frutiger' ? 'Slide to Unlock' : 'Initialize'}
                </span>
                {theme === 'cyber' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>}
            </div>
        </div>
    );
};
