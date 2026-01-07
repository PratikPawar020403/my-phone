
import React, { useState } from 'react';
import { Phone, Trash2, Zap } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';

export const RotaryDialApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [number, setNumber] = useState('');
    const [rotating, setRotating] = useState<number | null>(null);
    const [rotation, setRotation] = useState(0);
    const styles = getThemeStyles(theme);

    const dialNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const handleDial = (num: number) => {
        if (rotating !== null) return;
        setRotating(num);
        const angle = 30 + (num === 0 ? 10 : num) * 25;
        setRotation(angle);
        setTimeout(() => {
            setRotation(0);
            setTimeout(() => {
                setRotating(null);
                setNumber(prev => prev + num);
            }, 500);
        }, 500);
    };

    const handleSubmit = () => {
        if (number.length < 3) return;
        alert("It's just a mock");
        setNumber('');
    };

    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0 z-10"}>
                <div className="flex items-center">
                    <BackButton onClick={onClose} theme={theme} />
                    <h1 className="text-xl font-bold ml-2">Contact</h1>
                </div>
                <Phone className={styles.accent} />
            </header>

            <div className="flex-1 flex flex-col items-center justify-center relative z-0">
                <div className={`mb-8 text-3xl font-bold tracking-widest h-12 flex items-center px-6 min-w-[200px] justify-center ${theme === 'frutiger' ? 'bg-white/60 rounded-xl shadow-inner text-gray-800 border border-white' : 'bg-black border border-cyan-500 text-cyan-500 clip-path-polygon-[10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px]'}`}>
                    {number || (theme === 'cyber' ? "_ _ _" : "Dial Number")}
                </div>

                <div className={`relative w-64 h-64 rounded-full ${theme === 'frutiger' ? 'bg-white/40 border border-white/60 shadow-2xl backdrop-blur-md' : 'bg-gray-900 border-2 border-cyan-800 rounded-full'}`}>
                    <div
                        className="absolute inset-2 rounded-full z-10 transition-transform duration-500 ease-in-out origin-center"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            background: theme === 'frutiger'
                                ? 'conic-gradient(from 0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3))'
                                : 'radial-gradient(circle, #001 0%, #000 100%)',
                        }}
                    >
                        {dialNumbers.map((num, i) => {
                            const angle = (i * 30) + 60;
                            const radius = 90;
                            const x = radius * Math.cos(angle * Math.PI / 180);
                            const y = radius * Math.sin(angle * Math.PI / 180);

                            return (
                                <div
                                    key={num}
                                    onClick={() => handleDial(num)}
                                    className={`absolute w-12 h-12 rounded-full cursor-pointer active:scale-95 transition-transform flex items-center justify-center shadow-inner ${theme === 'frutiger' ? 'bg-white/60 border border-white/80 shadow-md' : 'bg-black border border-cyan-900'}`}
                                    style={{
                                        top: `calc(50% + ${y}px - 24px)`,
                                        left: `calc(50% + ${x}px - 24px)`
                                    }}
                                >
                                    <span className={`text-xl font-bold pointer-events-none ${theme === 'frutiger' ? 'text-gray-800' : 'text-cyan-500'}`}>
                                        {num}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`absolute bottom-6 right-8 w-8 h-12 z-20 rounded-lg transform rotate-45 pointer-events-none ${theme === 'frutiger' ? 'bg-gradient-to-br from-gray-100 to-gray-300 shadow-md' : 'bg-cyan-900/50 border border-cyan-500'}`} />
                </div>

                <div className="mt-12 flex gap-4">
                    <button onClick={() => setNumber('')} className={`p-3 rounded-full ${theme === 'frutiger' ? 'bg-red-500 text-white shadow-lg border border-red-400' : 'bg-red-900/20 text-red-500 border border-red-900'}`}>
                        <Trash2 size={24} />
                    </button>
                    <button onClick={handleSubmit} className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 ${theme === 'frutiger' ? 'bg-green-500 text-white shadow-lg border border-green-400' : 'bg-cyan-900/30 border border-cyan-500 text-cyan-400'}`}>
                        CONNECT <Zap size={18} fill="currentColor" />
                    </button>
                </div>
                <p className={`mt-4 text-sm font-medium ${theme === 'frutiger' ? 'text-gray-500' : 'text-cyan-600'}`}>
                    its just a mock
                </p>
            </div>
        </div>
    );
};
