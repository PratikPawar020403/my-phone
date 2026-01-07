
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Theme } from '../types/common.types';

interface BackButtonProps {
    onClick: () => void;
    theme: Theme;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, theme }) => (
    <button
        onClick={onClick}
        className={`p-1 -ml-2 mr-1 rounded-full transition-colors flex items-center gap-1 pr-3 ${theme === 'frutiger' ? 'hover:bg-white/40 text-slate-700' : 'hover:bg-cyan-500/20 text-cyan-500'}`}
    >
        <ChevronLeft size={28} />
        <span className={`text-[17px] font-medium -ml-1 ${theme === 'cyber' ? 'uppercase tracking-widest text-xs' : ''}`}>Back</span>
    </button>
);
