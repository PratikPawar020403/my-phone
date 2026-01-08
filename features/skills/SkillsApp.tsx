
import React, { useState, useEffect } from 'react';
import { Layers, MousePointer2, Check, X, Lock } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { StackSkill, STACK_GAME_SKILLS } from '../../os/os.types';

// --- SKILLS APP ---


// --- STACK GAME APP (TAP VERSION) ---
export const StackGameApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'completed'>('start');
    const [placedSkills, setPlacedSkills] = useState<Set<string>>(new Set());
    const [selectedSkill, setSelectedSkill] = useState<StackSkill | null>(null);
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' | 'milestone' } | null>(null);
    const [shaking, setShaking] = useState<string | null>(null);

    // Initialize gameSkills with a shuffled version of STACK_GAME_SKILLS
    const [gameSkills, setGameSkills] = useState<StackSkill[]>(() =>
        [...STACK_GAME_SKILLS].sort(() => Math.random() - 0.5)
    );

    const styles = getThemeStyles(theme);

    const categories = ['Languages', 'ML / AI', 'Web', 'Tools & Platforms'];

    // Random Error Messages
    const ERROR_MESSAGES = [
        "Wrong room, buddy!",
        "404: Right slot not found!",
        "Wrong zone!",
        "Skill said ‘not here!’"
    ];

    // Get skills that haven't been placed yet, using the randomized gameSkills list
    const unplacedSkills = gameSkills.filter(s => !placedSkills.has(s.id));

    const handleSkillClick = (skill: StackSkill) => {
        // If already selected, deselect
        if (selectedSkill?.id === skill.id) {
            setSelectedSkill(null);
        } else {
            setSelectedSkill(skill);
            // Play selection haptic/sound (simulated visual)
        }
    };

    const handleSlotClick = (category: string) => {
        if (!selectedSkill) {
            // User tapped slot without tile
            setToast({ msg: "Tap a skill first.", type: 'error' });
            setShaking('pool'); // Shake the skill pool area
            setTimeout(() => setShaking(null), 500);
            return;
        }

        if (selectedSkill.category === category) {
            // Success Logic
            const newPlaced = new Set(placedSkills);
            newPlaced.add(selectedSkill.id);
            setPlacedSkills(newPlaced);

            const count = newPlaced.size;
            const total = STACK_GAME_SKILLS.length;

            // Determine Toast Message
            let message = selectedSkill.successMessage;
            let type: 'success' | 'milestone' = 'success';

            if (count === Math.floor(total / 2)) {
                message = "🔥 Nice progress! You’re halfway through my tech stack.";
                type = 'milestone';
            } else if (count === total) {
                message = "🎉 Stack fully assembled! You’ve now seen my complete technical skillset.";
                type = 'milestone';
                setTimeout(() => setGameState('completed'), 2000);
            }

            setToast({ msg: message, type: type });
            setSelectedSkill(null);

        } else {
            // Error Logic
            const randomError = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
            setToast({ msg: randomError, type: 'error' });
            setShaking(category); // Shake the slot
            setTimeout(() => setShaking(null), 500);
            setSelectedSkill(null); // Return to pool
        }
    };

    // Auto hide toast
    useEffect(() => {
        if (toast) {
            const duration = toast.type === 'milestone' ? 4000 : 2000;
            const timer = setTimeout(() => setToast(null), duration);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // --- RENDER HELPERS ---

    // Start Screen
    if (gameState === 'start') {
        return (
            <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
                <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0"}>
                    <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="ml-2 font-bold text-xl">Assemble My Stack</h1></div>
                    <Layers className={styles.accent} />
                </header>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <div className={`w-36 h-36 mb-6 flex items-center justify-center rounded-[2rem] ${theme === 'frutiger' ? 'bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white' : 'border-2 border-cyan-500 bg-black'}`}>
                        <Layers size={72} className={theme === 'frutiger' ? 'text-[#0B2535]' : 'text-cyan-400'} />
                    </div>
                    <h2 className={`text-2xl font-bold mb-4 ${styles.text}`}>Assemble My Stack</h2>
                    <p className={`mb-8 opacity-80 ${styles.text}`}>Tap a skill, then tap its correct stack layer to explore how I build applications.</p>
                    <button
                        onClick={() => setGameState('playing')}
                        className={`px-8 py-3 text-lg font-bold rounded-xl transition-transform active:scale-95 ${theme === 'frutiger' ? 'bg-cyan-500 text-white shadow-lg' : 'bg-cyan-900 border border-cyan-500 text-cyan-400'}`}
                    >
                        Start Building
                    </button>
                </div>
            </div>
        );
    }

    // Completion Screen
    if (gameState === 'completed') {
        return (
            <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    {theme === 'cyber' && <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>}

                    <div className={`mb-6 p-6 rounded-full animate-bounce ${theme === 'frutiger' ? 'bg-green-100 text-green-600' : 'bg-cyan-900/30 text-cyan-400 border border-cyan-500'}`}>
                        <Check size={48} />
                    </div>

                    <h2 className={`text-2xl font-bold mb-2 ${styles.text}`}>Stack Successfully Assembled</h2>
                    <p className={`mb-8 opacity-80 ${styles.text}`}>You’ve now explored my complete technical skill architecture.</p>

                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        <button
                            onClick={onClose}
                            className={`w-full py-3 font-bold rounded-xl ${theme === 'frutiger' ? 'bg-cyan-500 text-white shadow-lg' : 'bg-cyan-900 border border-cyan-500 text-cyan-400'}`}
                        >
                            Close
                        </button>
                        <button
                            onClick={() => {
                                setPlacedSkills(new Set());
                                // Reshuffle skills on replay
                                setGameSkills([...STACK_GAME_SKILLS].sort(() => Math.random() - 0.5));
                                setGameState('playing');
                            }}
                            className={`w-full py-3 font-bold rounded-xl ${theme === 'frutiger' ? 'bg-white text-slate-700 border border-slate-200' : 'bg-black border border-cyan-800 text-cyan-600'}`}
                        >
                            Replay Puzzle
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Game Screen
    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font} relative overflow-hidden select-none`}>


            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0 z-10"}>
                <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="ml-2 font-bold text-xl">Assemble My Stack</h1></div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full ${theme === 'frutiger' ? 'bg-slate-200 text-slate-700' : 'bg-cyan-900 text-cyan-400 border border-cyan-700'}`}>
                    {placedSkills.size} / {STACK_GAME_SKILLS.length}
                </div>
            </header>

            {/* Hint Bar */}
            {/* Hint Bar - Now handles Feedback */}
            <div className={`flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all duration-300 relative
                ${toast
                    ? (theme === 'frutiger'
                        ? (toast.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')
                        : (toast.type === 'error' ? 'bg-red-900/20 text-red-400 border-y border-red-500/50' : 'bg-green-900/20 text-green-400 border-y border-green-500/50')
                    )
                    : (selectedSkill
                        ? (theme === 'frutiger' ? 'bg-cyan-100 text-cyan-800' : 'bg-cyan-900 text-cyan-300')
                        : (theme === 'frutiger' ? 'bg-slate-100 text-slate-500' : 'bg-black text-gray-500')
                    )
                }`}>

                {/* Content Logic */}
                {toast ? (
                    <>
                        {toast.type === 'error' ? <X size={14} /> : <Check size={14} />}
                        <span>{toast.msg}</span>
                    </>
                ) : (
                    <span>{selectedSkill ? `Place ${selectedSkill.name} into a stack layer...` : "Tap a skill below to select it..."}</span>
                )}
            </div>

            {/* Game Area */}
            <div className="flex-1 flex flex-col relative">

                {/* Drop Zones (Top) */}
                <div className="grid grid-cols-2 gap-3 p-4 shrink-0">
                    {categories.map(cat => (
                        <div
                            key={cat}
                            onClick={() => handleSlotClick(cat)}
                            className={`min-h-[9rem] p-2 flex flex-col items-center justify-start text-center transition-all cursor-pointer 
                    ${theme === 'frutiger' ? 'bg-white/40 border-2 border-dashed border-white/60 rounded-xl active:bg-white/60 active:scale-95' : 'bg-black/50 border border-dashed border-cyan-800 rounded-none active:bg-cyan-900/20'} 
                    ${shaking === cat ? 'animate-glitch border-red-500' : ''}
                    ${selectedSkill ? (theme === 'frutiger' ? 'hover:border-cyan-300 hover:bg-cyan-50/50' : 'hover:border-cyan-500') : ''}
                  `}
                        >
                            <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${theme === 'frutiger' ? 'text-cyan-700' : 'text-cyan-500'}`}>{cat}</span>

                            {/* Visual indication of placed items - LOCKED PILLS */}
                            <div className="flex flex-wrap gap-1.5 justify-center w-full content-start">
                                {STACK_GAME_SKILLS.filter(s => s.category === cat && placedSkills.has(s.id)).map(s => (
                                    <div
                                        key={s.id}
                                        className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider animate-fade-in flex items-center gap-1.5
                             ${theme === 'frutiger'
                                                ? 'bg-white/80 text-slate-700 border border-white/60 shadow-sm rounded-full'
                                                : 'bg-cyan-900/30 text-cyan-400 border border-cyan-600 rounded-none'
                                            }`}
                                    >
                                        <Lock size={8} className="opacity-50" />
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skill Pool (Bottom) */}
                <div className={`flex-1 overflow-hidden relative flex flex-col ${theme === 'frutiger' ? 'bg-white/30 backdrop-blur-sm rounded-t-3xl border-t border-white/40' : 'bg-black/80 border-t border-cyan-900'}`}>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-current opacity-20" />

                    <div className={`flex-1 p-6 overflow-y-auto app-scroll pt-8 ${shaking === 'pool' ? 'animate-glitch' : ''}`}>
                        <div className="flex flex-wrap gap-3 justify-center content-start pb-48">
                            {unplacedSkills.map(skill => (
                                <button
                                    key={skill.id}
                                    onClick={() => handleSkillClick(skill)}
                                    className={`px-4 py-3 flex items-center gap-2 transition-all duration-200 
                        ${theme === 'frutiger'
                                            ? (selectedSkill?.id === skill.id
                                                ? 'bg-cyan-500 text-white shadow-lg scale-105 border-2 border-white rounded-xl'
                                                : 'bg-white text-slate-700 rounded-xl shadow-md border border-slate-100 hover:scale-105')
                                            : (selectedSkill?.id === skill.id
                                                ? 'bg-cyan-900 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_cyan] rounded-none'
                                                : 'bg-black text-cyan-600 border border-cyan-800 rounded-none hover:border-cyan-500')
                                        }`}
                                >
                                    <MousePointer2 size={14} className={selectedSkill?.id === skill.id ? 'opacity-100' : 'opacity-30'} />
                                    <span className="font-bold text-sm">{skill.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
