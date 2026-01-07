
import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { Theme } from '../shared/types/common.types';

export const StatusBar: React.FC<{ theme: Theme }> = ({ theme }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`absolute top-0 w-full px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 flex justify-between items-end z-50 text-xs font-bold tracking-wider transition-colors duration-500 ${theme === 'frutiger' ? 'text-white/90 drop-shadow-md' : 'text-cyan-500 font-[\'Orbitron\']'}`}>
            <span>{theme === 'cyber' ? 'SYS_READY' : 'Eco.OS v2.0'}</span>
            <div className="flex items-center gap-4">
                <span suppressHydrationWarning>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex gap-1.5">
                    <Wifi size={14} />
                    <Battery size={14} />
                </div>
            </div>
        </div>
    );
};
