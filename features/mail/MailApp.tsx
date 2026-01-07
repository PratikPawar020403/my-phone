import React, { useState } from 'react';
import { Search, ArrowLeft, Star, Archive, Trash2 } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { MOCK_MAILS, Email } from './mail.data';

export const MailApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const styles = getThemeStyles(theme);

    const isAero = theme === 'frutiger';

    // Theme-specific styles
    const colors = {
        bg: isAero ? 'bg-slate-50' : 'bg-black',
        headerBg: isAero ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-black border-b border-cyan-900',
        text: isAero ? 'text-slate-800' : 'text-cyan-400',
        subText: isAero ? 'text-slate-500' : 'text-cyan-700',
        cardBg: isAero ? 'bg-white hover:bg-blue-50/50' : 'bg-gray-900/50 hover:bg-cyan-900/20',
        cardBorder: isAero ? 'border-slate-100' : 'border-cyan-900/50',
        accent: isAero ? 'text-blue-500' : 'text-cyan-400',
        readIndicator: isAero ? 'bg-blue-500' : 'bg-cyan-500'
    };

    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font} overflow-hidden`}>
            {/* Header */}
            <header className={`${colors.headerBg} px-4 py-3 flex items-center justify-between shrink-0 z-10 transition-colors duration-300`}>
                <div className="flex items-center gap-2">
                    {selectedEmail ? (
                        <button
                            onClick={() => setSelectedEmail(null)}
                            className={`p-2 rounded-full hover:bg-black/5 active:scale-95 transition-all ${colors.text}`}
                        >
                            <ArrowLeft size={20} />
                        </button>
                    ) : (
                        <BackButton onClick={onClose} theme={theme} />
                    )}
                    <h1 className={`text-xl font-bold ml-1 ${colors.text}`}>
                        {selectedEmail ? '' : 'Inbox'}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    {!selectedEmail && <Search size={20} className={colors.accent} />}
                    <div className={`text-xs px-2 py-1 rounded-full ${isAero ? 'bg-blue-100 text-blue-600' : 'bg-cyan-900/40 text-cyan-400'}`}>
                        Mock
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto ${colors.bg} relative`}>
                {selectedEmail ? (
                    // Detail View
                    <div className="p-4 animate-fade-in flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className={`text-xl font-bold leading-tight ${colors.text} flex-1 mr-4`}>
                                {selectedEmail.subject}
                            </h2>
                            <Star size={20} className={colors.subText} />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isAero ? 'bg-blue-100 text-blue-600' : 'bg-cyan-900 text-cyan-400'}`}>
                                {selectedEmail.sender[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`font-semibold ${colors.text} truncate`}>{selectedEmail.sender}</div>
                                <div className={`text-xs ${colors.subText}`}>to me</div>
                            </div>
                            <div className={`text-xs ${colors.subText}`}>{selectedEmail.time}</div>
                        </div>

                        <div className={`flex-1 whitespace-pre-wrap leading-relaxed ${isAero ? 'text-slate-600' : 'text-gray-300'}`}>
                            {selectedEmail.content}
                        </div>

                        {/* Dummy Actions */}
                        <div className="mt-8 flex gap-2 justify-end">
                            <button className={`p-3 rounded-full ${isAero ? 'bg-slate-100 text-slate-500' : 'bg-gray-800 text-gray-400'} active:scale-95`}>
                                <Archive size={20} />
                            </button>
                            <button className={`p-3 rounded-full ${isAero ? 'bg-slate-100 text-slate-500' : 'bg-gray-800 text-gray-400'} active:scale-95`}>
                                <Trash2 size={20} />
                            </button>
                            <button className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 ${isAero ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-cyan-600 text-black shadow-lg shadow-cyan-500/20'} active:scale-95`}>
                                Reply
                            </button>
                        </div>
                    </div>
                ) : (
                    // Inbox List
                    <div className="pb-20">
                        {MOCK_MAILS.map((mail) => (
                            <div
                                key={mail.id}
                                onClick={() => setSelectedEmail(mail)}
                                className={`p-4 border-b cursor-pointer transition-colors ${colors.cardBg} ${colors.cardBorder} flex gap-3`}
                            >
                                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-lg ${isAero ? 'bg-slate-200 text-slate-600' : 'bg-gray-800 text-gray-400'}`}>
                                    {mail.sender[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className={`font-bold truncate ${mail.read ? colors.subText : colors.text} ${!mail.read ? 'text-[15px]' : 'text-sm'}`}>
                                            {mail.sender}
                                        </span>
                                        <span className={`text-xs whitespace-nowrap ml-2 ${colors.subText} ${!mail.read ? 'font-semibold' : ''}`}>
                                            {mail.time}
                                        </span>
                                    </div>
                                    <div className={`text-sm truncate mb-1 ${!mail.read ? 'font-bold ' + colors.text : colors.text}`}>
                                        {mail.subject}
                                    </div>
                                    <div className={`text-xs truncate ${colors.subText}`}>
                                        {mail.preview}
                                    </div>
                                </div>
                                {!mail.read && (
                                    <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${colors.readIndicator}`} />
                                )}
                            </div>
                        ))}

                        <div className={`p-8 text-center text-xs ${colors.subText}`}>
                            No more emails
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
