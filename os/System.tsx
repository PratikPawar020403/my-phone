
import React, { useState } from 'react';
import { Theme, AppDefinition } from '../shared/types/common.types';
import { AVAILABLE_WALLPAPERS } from './os.types';

// Components
import { StatusBar } from './StatusBar';
import { LockScreen } from './LockScreen';
import { BootLoader, ThemeSelector } from './Startup';
import { HomeScreen } from './HomeScreen';
import { APP_REGISTRY } from '../features/apps.registry';
import { Toaster } from 'sonner';

export const PhoneSystem: React.FC = () => {
    // Stages: 'boot' -> 'setup' -> 'os'
    const [bootStage, setBootStage] = useState<'boot' | 'setup' | 'os'>('boot');
    const [theme, setTheme] = useState<Theme>('frutiger');
    const [activeApp, setActiveApp] = useState<AppDefinition | null>(null);
    const [isLocked, setIsLocked] = useState(true);

    const getDefaultWallpaper = (t: Theme) => AVAILABLE_WALLPAPERS.find(w => w.theme === t && w.id.includes('default'))?.url || AVAILABLE_WALLPAPERS[0].url;
    const [wallpaper, setWallpaper] = useState<string>(getDefaultWallpaper('frutiger'));

    // When theme changes (via settings or setup), update wallpaper if it's still default
    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        setWallpaper(getDefaultWallpaper(newTheme));
    };

    const handleSetupComplete = (selectedTheme: Theme) => {
        handleThemeChange(selectedTheme);
        setBootStage('os');
    };

    // BOOT & SETUP & OS - Unified Shell Wrapper
    // This ensures consistency in the "Phone Frame" throughout the lifecycle.
    return (
        <div className="relative w-full h-full overflow-hidden bg-black">

            {/* BOOT SCREEN */}
            {bootStage === 'boot' && (
                <BootLoader onComplete={() => setBootStage('setup')} />
            )}

            {/* SETUP SCREEN */}
            {bootStage === 'setup' && (
                <ThemeSelector onSelect={handleSetupComplete} />
            )}

            {/* OS RUNNING */}
            {bootStage === 'os' && (
                <div
                    className={`absolute inset-0 flex flex-col transition-all duration-700 select-none ${theme === 'frutiger' ? 'theme-frutiger font-aero' : 'theme-cyber font-mono'} bg-cover bg-center`}
                    style={{ backgroundImage: `url("${wallpaper}")` }}
                >
                    {/* Overlay Effects */}
                    <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${theme === 'frutiger' ? 'bg-transparent' : 'bg-black/60'}`} />

                    {/* Frutiger Wallpaper Taming Layer */}
                    {theme === 'frutiger' && <div className="wallpaper-tame-overlay" />}

                    {/* Status Bar Contrast Overlay (Aero) */}
                    {theme === 'frutiger' && <div className="absolute top-0 left-0 right-0 h-24 status-bar-overlay z-0 pointer-events-none" />}

                    {theme === 'frutiger' && (
                        <>
                            {/* Aero Bubbles */}
                            <div className="bubble w-64 h-64 top-[10%] left-[-10%]" style={{ animationDelay: '0s', opacity: 0.1 }}></div>
                            <div className="bubble w-48 h-48 top-[40%] right-[-5%]" style={{ animationDuration: '15s', animationDelay: '2s', opacity: 0.08 }}></div>
                            <div className="bubble w-32 h-32 bottom-[10%] left-[20%]" style={{ animationDuration: '20s', animationDelay: '5s', opacity: 0.12 }}></div>
                            <div className="bubble w-20 h-20 top-[20%] right-[30%]" style={{ animationDuration: '25s', animationDelay: '1s', opacity: 0.05 }}></div>
                        </>
                    )}
                    {theme === 'cyber' && (
                        <>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                            <div className="scanlines opacity-20"></div>
                        </>
                    )}

                    {/* Top Status Bar (Always Visible) */}
                    <StatusBar theme={theme} />

                    {/* Main Content Area */}
                    <div className="relative flex-1 flex flex-col overflow-hidden">

                        {/* Home Screen (Widgets & Icons) - Hidden when app is active */}
                        <div className={`absolute inset-0 flex flex-col transition-all duration-500 ${activeApp ? 'scale-90 opacity-0 blur-sm pointer-events-none' : 'scale-100 opacity-100'}`}>
                            <HomeScreen theme={theme} apps={APP_REGISTRY} onAppClick={setActiveApp} />
                        </div>

                        {/* Active App Window */}
                        {activeApp && (
                            <div className="absolute inset-0 z-50 flex flex-col animate-fade-in bg-transparent">
                                <div className="h-[max(20px,env(safe-area-inset-top))]" />
                                <activeApp.component
                                    onClose={() => setActiveApp(null)}
                                    theme={theme}
                                    setTheme={handleThemeChange}
                                    setWallpaper={setWallpaper}
                                    currentWallpaper={wallpaper}
                                />
                                {/* Home Bar */}
                                <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-full z-[60] cursor-pointer transition-colors backdrop-blur-md shadow-sm ${theme === 'frutiger' ? 'bg-white/60 hover:bg-white/90' : 'bg-cyan-900/50 hover:bg-cyan-500 border border-cyan-500'}`} onClick={() => setActiveApp(null)} />
                            </div>
                        )}

                    </div>

                    {isLocked && <LockScreen theme={theme} onUnlock={() => setIsLocked(false)} />}

                    {/* 
              Safe Toast Layer 
              - Positioned absolutely within the Phone Frame
              - Respects safe-area-inset-top
              - Z-Index > Header
            */}
                    <Toaster
                        position="top-center"
                        theme={theme === 'frutiger' ? 'light' : 'dark'}
                        richColors
                        offset="4rem" // Header height + safe area approx
                        style={{
                            position: 'absolute',
                            width: '100%',
                            top: 'env(safe-area-inset-top)',
                        }}
                        toastOptions={{
                            style: {
                                // Ensure toasts don't span full width on scaling
                                maxWidth: '90%',
                                margin: '0 auto',
                                left: 0,
                                right: 0,
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};
