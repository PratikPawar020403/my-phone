
import React, { useState, useEffect } from 'react';
import { Music, Disc, SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { PLAYLIST } from '../../os/os.types';

export const MusicApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const styles = getThemeStyles(theme);

    const currentSong = PLAYLIST[currentSongIndex];

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        // Auto skip to next
                        const next = (currentSongIndex + 1) % PLAYLIST.length;
                        setCurrentSongIndex(next);
                        return 0;
                    }
                    return prev + 0.5; // Simulated progress speed
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSongIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const nextTrack = () => {
        setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
        setProgress(0);
    };
    const prevTrack = () => {
        setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setProgress(0);
    };

    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0"}>
                <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="ml-2 font-bold text-xl">Music</h1></div>
                <Music className={styles.accent} />
            </header>

            <div className="flex-1 p-6 flex flex-col items-center justify-center relative">

                {/* Cyber Background Visualizer Effect */}
                {theme === 'cyber' && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-2 bg-cyan-500 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }} />
                        ))}
                    </div>
                )}

                {/* Cover Art */}
                <div className={`w-64 h-64 relative mb-8 flex items-center justify-center overflow-hidden transition-all duration-700 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''} ${theme === 'frutiger' ? 'rounded-full shadow-2xl border-4 border-white/60 bg-white/20' : 'rounded-none clip-path-polygon-[20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%] border-2 border-cyan-500 bg-black'}`}>
                    {theme === 'frutiger' ? (
                        <>
                            <img src={currentSong.coverUrl} alt={`${currentSong.title} by ${currentSong.artist}`} className="w-full h-full object-cover opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
                            <div className="absolute w-8 h-8 bg-white/50 backdrop-blur-md rounded-full border border-white/60 shadow-inner" />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-cyan-500 bg-black w-full h-full relative">
                            <div className="absolute inset-0 border border-cyan-800 opacity-50 animate-pulse"></div>
                            <Disc size={48} className={isPlaying ? 'animate-spin' : ''} />
                            <div className="mt-2 text-xs border border-cyan-500 px-1 bg-cyan-900/20">AUDIO_STREAM</div>
                        </div>
                    )}
                </div>

                {/* Track Info */}
                <div className="text-center mb-8 relative z-10">
                    <h2 className={`text-2xl font-bold mb-1 ${styles.text}`}>{currentSong.title}</h2>
                    <p className={`text-sm opacity-80 ${theme === 'frutiger' ? 'text-slate-500' : 'text-cyan-700'}`}>{currentSong.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xs mb-8 relative">
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${theme === 'frutiger' ? 'bg-slate-200/50' : 'bg-cyan-900/30'}`}>
                        <div className={`h-full transition-all duration-100 ${theme === 'frutiger' ? 'bg-cyan-500 gel-bar' : 'bg-cyan-500'}`} style={{ width: `${progress}%` }} />
                    </div>
                    <div className={`flex justify-between text-xs mt-2 font-mono ${theme === 'frutiger' ? 'text-slate-500' : 'text-cyan-700'}`}>
                        <span>0:00</span>
                        <span>{currentSong.duration}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-8 z-10">
                    <button onClick={prevTrack} aria-label="Previous Track" className={`p-4 rounded-full transition-all active:scale-90 ${theme === 'frutiger' ? 'bg-white/40 backdrop-blur-md text-slate-700 shadow-lg border border-white/50 hover:bg-white/60' : 'text-cyan-500 hover:bg-cyan-900/20 border border-cyan-500 rounded-none -skew-x-12'}`}>
                        <SkipBack size={24} fill={theme === 'frutiger' ? 'currentColor' : 'none'} className={theme === 'cyber' ? 'skew-x-12' : ''} />
                    </button>

                    <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className={`p-6 rounded-full transition-all active:scale-95 ${theme === 'frutiger' ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-xl shadow-cyan-500/30 border border-white/40' : 'bg-cyan-900/50 text-cyan-400 border border-cyan-400 hover:bg-cyan-500 hover:text-black rounded-none clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]'}`}>
                        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                    </button>

                    <button onClick={nextTrack} aria-label="Next Track" className={`p-4 rounded-full transition-all active:scale-90 ${theme === 'frutiger' ? 'bg-white/40 backdrop-blur-md text-slate-700 shadow-lg border border-white/50 hover:bg-white/60' : 'text-cyan-500 hover:bg-cyan-900/20 border border-cyan-500 rounded-none -skew-x-12'}`}>
                        <SkipForward size={24} fill={theme === 'frutiger' ? 'currentColor' : 'none'} className={theme === 'cyber' ? 'skew-x-12' : ''} />
                    </button>
                </div>

                <p className={`mt-8 text-sm font-medium ${theme === 'frutiger' ? 'text-gray-500' : 'text-cyan-600'}`}>
                    its just a mock
                </p>
            </div>
        </div>
    );
};
