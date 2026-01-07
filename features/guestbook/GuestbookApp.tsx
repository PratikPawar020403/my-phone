import React from 'react';
import { Globe, Github, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { PINNED_CONTACT_NOTE } from './notes.static';

export const GuestbookApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const styles = getThemeStyles(theme);
    const isAero = theme === 'frutiger';
    const date = new Date().toLocaleDateString();

    // Helper to get icon for link type
    const getIcon = (type: string) => {
        switch (type) {
            case 'github': return <Github size={18} />;
            case 'email': return <Mail size={18} />;
            case 'phone': return <Phone size={18} />;
            case 'linkedin': return <Linkedin size={18} />;
            default: return <ExternalLink size={18} />;
        }
    };

    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            {/* Header - Original Vibe */}
            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0 z-10"}>
                <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="text-xl font-bold ml-2">Notes</h1></div>
                <Globe className={styles.accent} />
            </header>

            {/* Content Area - Original Card Style */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 z-10 app-scroll">

                {/* Intro Card */}
                <div className={`${styles.card} p-5 animate-fade-in`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className={`font-bold text-sm ${theme === 'frutiger' ? 'text-cyan-700' : 'text-cyan-400'}`}>@Pratik</span>
                        <span className={`text-xs opacity-60 ${theme === 'frutiger' ? 'text-slate-500' : 'text-cyan-700'}`}>{date}</span>
                    </div>
                    <div className={`${styles.text} text-base leading-relaxed font-medium mb-1`}>
                        {PINNED_CONTACT_NOTE.greeting}
                    </div>
                    <div className={`${styles.text} text-sm leading-relaxed opacity-90`}>
                        {PINNED_CONTACT_NOTE.intro}
                    </div>
                </div>

                {/* Contact Links as Cards */}
                {PINNED_CONTACT_NOTE.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.value}
                        target={link.type === 'phone' || link.type === 'email' ? undefined : '_blank'}
                        rel={link.type === 'phone' || link.type === 'email' ? undefined : 'noopener noreferrer'}
                        className={`${styles.card} p-4 animate-fade-in block group relative overflow-hidden transition-transform active:scale-[0.99]`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full shrink-0 ${isAero ? 'bg-cyan-100 text-cyan-600' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'}`}>
                                {getIcon(link.label.toLowerCase())}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isAero ? 'text-slate-400' : 'text-cyan-600'}`}>
                                    {link.label}
                                </div>
                                <div className={`font-medium truncate ${isAero ? 'text-slate-700 group-hover:text-cyan-700' : 'text-cyan-200 group-hover:text-cyan-400'} transition-colors`}>
                                    {link.display}
                                </div>
                            </div>
                            <ExternalLink size={16} className={`opacity-0 group-hover:opacity-50 transition-opacity ${isAero ? 'text-slate-400' : 'text-cyan-500'}`} />
                        </div>
                    </a>
                ))}

                {/* Footer Card */}
                <div className={`${styles.card} p-4 animate-fade-in text-center opacity-80`} style={{ animationDelay: '400ms' }}>
                    <p className={`${styles.text} text-sm italic`}>{PINNED_CONTACT_NOTE.footer}</p>
                </div>

            </div>
        </div>
    );
};
