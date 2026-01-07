
import React, { useState, useEffect } from 'react';
import { Zap, Leaf, Hexagon } from 'lucide-react';
import { Theme } from '../shared/types/common.types';

export const BootLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 200);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="absolute inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-white">
            <div className="mb-8 relative">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={24} className="animate-pulse" />
                </div>
            </div>
            <h1 className="text-xl tracking-widest font-bold mb-4">PSP </h1>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <div
                    className="h-full bg-white transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-2 text-xs text-gray-500">
                Booting up... {Math.round(progress)}%
            </div>
        </div>
    );
};

export const ThemeSelector: React.FC<{ onSelect: (theme: Theme) => void }> = ({ onSelect }) => {
    return (
        <div className="absolute inset-0 bg-black z-[90] flex flex-col p-6 animate-fade-in">
            <h1 className="text-white text-2xl font-bold text-center mt-8 mb-2 font-['Inter']">Initialize Interface</h1>
            <p className="text-gray-400 text-center text-sm mb-8">Select your operating environment.</p>

            <div className="flex-1 flex flex-col gap-6">
                {/* Aero Option - Updated to Eco Green/Blue */}
                <button
                    onClick={() => onSelect('frutiger')}
                    className="group relative flex-1 rounded-3xl overflow-hidden border-4 border-white/20 hover:border-green-400 transition-all duration-300 active:scale-95"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                        <div className="bg-white/30 p-4 rounded-full backdrop-blur-md shadow-lg mb-3 border border-white/50 group-hover:scale-110 transition-transform">
                            <Leaf size={32} className="drop-shadow-md text-lime-100" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-['Varela_Round'] font-bold drop-shadow-md">Eco.Aero</span>
                        <span className="text-xs opacity-90 font-medium bg-white/20 px-2 py-1 rounded-full mt-2">Organic • Future</span>
                    </div>

                    {/* Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                </button>

                {/* Cyber Option - Updated to HUD/Hex */}
                <button
                    onClick={() => onSelect('cyber')}
                    className="group relative flex-1 rounded-3xl overflow-hidden border-2 border-cyan-900 hover:border-cyan-400 transition-all duration-300 active:scale-95 bg-gray-900"
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black opacity-80" />
                    {/* Hex Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-400 z-10 font-['Orbitron']">
                        <div className="bg-black/50 p-4 border border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)] mb-3 clip-path-polygon-[50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%]">
                            <Hexagon size={32} />
                        </div>
                        <span className="text-2xl font-bold tracking-widest uppercase group-hover:text-white transition-colors">MECH_OS</span>
                        <span className="text-xs bg-cyan-900/30 px-2 py-1 mt-2 border border-cyan-800 tracking-wider">ROBOTIC • HUD</span>
                    </div>
                </button>
            </div>

            <p className="text-gray-600 text-center text-xs mt-6">Environment can be reconfigured in Settings.</p>
        </div>
    );
};
