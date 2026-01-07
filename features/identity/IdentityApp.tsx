
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { TIMELINE } from './identity.data.ts';

export const IdentityApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const styles = getThemeStyles(theme);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEndHandler = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) next();
        if (isRightSwipe) prev();
    };

    const next = () => setCurrentIndex((prev) => (prev + 1) % TIMELINE.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + TIMELINE.length) % TIMELINE.length);

    const currentEvent = TIMELINE[currentIndex];

    return (
        <div
            className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}
        >
            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0 absolute top-0 w-full z-20"}>
                <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="ml-2 font-bold text-xl">Gallery</h1></div>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src="/assets/identity/icon.png" alt="Identity" className="w-full h-full object-cover" />
                </div>
            </header>

            {/* Main Gallery Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#F7F7F7]">

                {/* Desktop Navigation Arrows */}
                <button onClick={prev} aria-label="Previous Slide" className={`hidden md:flex absolute left-4 z-30 p-3 rounded-full transition-all active:scale-95 bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-md`}>
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} aria-label="Next Slide" className={`hidden md:flex absolute right-4 z-30 p-3 rounded-full transition-all active:scale-95 bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-md`}>
                    <ChevronRight size={24} />
                </button>

                {/* Content Card - Identity Section Layout */}
                <div key={currentIndex} className="w-full max-w-[400px] flex flex-col items-center justify-center p-4 animate-fade-in">

                    {/* Identity Card Container - Fixed Aspect Ratio 3:4 */}
                    <div className="w-full aspect-[3/4] glass-panel shadow-[0_6px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col relative transition-transform duration-300">

                        {/* Image Area - Top 2/3 */}
                        <div className="h-[75%] w-full relative overflow-hidden bg-gray-100">
                            <img
                                src={currentEvent.imageUrl}
                                alt={currentEvent.title}
                                loading="lazy"
                                className="w-full h-full object-contain bg-black/5 transition-transform duration-700 hover:scale-105"
                            />
                            {/* Page Indicator (Mobile Style) */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                                {currentIndex + 1} / {TIMELINE.length}
                            </div>
                        </div>

                        {/* Text Area - Bottom 1/3 */}
                        <div className="flex-1 p-6 flex flex-col justify-center text-center relative z-10">
                            <div className="mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${theme === 'frutiger' ? 'text-secondary-dark bg-white/40' : 'text-cyan-600 bg-cyan-50'}`}>
                                    {currentEvent.year}
                                </span>
                            </div>
                            <h2 className={`text-xl font-bold mb-2 ${theme === 'frutiger' ? 'text-primary-dark' : 'text-slate-800'}`}>{currentEvent.title}</h2>
                            <p className={`text-sm leading-relaxed line-clamp-3 ${theme === 'frutiger' ? 'text-muted-dark' : 'text-slate-500'}`}>
                                {currentEvent.description}
                            </p>
                        </div>
                    </div>

                    {/* Mobile Swipe Hint (Optional) */}
                    <div className="md:hidden mt-4 text-xs text-gray-400 font-medium">
                        Swipe to navigate
                    </div>
                </div>
            </div>
        </div>
    )
};
