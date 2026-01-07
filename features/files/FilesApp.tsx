import React, { useState } from 'react';
import { ChevronLeft, Folder, FileText } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { FileItem, FILE_SYSTEM } from '../../os/os.types';

export const FilesApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [currentPath, setCurrentPath] = useState<FileItem[]>([]); // Stack of folders
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null); // For preview
    const styles = getThemeStyles(theme);

    const currentFolderContents = currentPath.length === 0
        ? FILE_SYSTEM
        : currentPath[currentPath.length - 1].children || [];

    const handleNavigate = (item: FileItem) => {
        if (item.type === 'folder') {
            setCurrentPath([...currentPath, item]);
        } else {
            setSelectedFile(item);
        }
    };

    const handleBack = () => {
        if (selectedFile) {
            setSelectedFile(null);
        } else if (currentPath.length > 0) {
            setCurrentPath(currentPath.slice(0, -1));
        } else {
            onClose();
        }
    };

    const getBreadcrumbs = () => {
        if (currentPath.length === 0) return 'Root';
        return currentPath.map(p => p.name).join(' / ');
    };

    // Preview Modal
    if (selectedFile) {
        return (
            <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font} relative z-20`}>
                <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0"}>
                    <div className="flex items-center">
                        <button onClick={() => setSelectedFile(null)} aria-label="Back" className={`p-1 -ml-2 mr-1 rounded-full ${theme === 'frutiger' ? 'text-slate-700' : 'text-cyan-500'}`}>
                            <ChevronLeft size={28} />
                        </button>
                        <h1 className="text-sm font-bold ml-1 truncate max-w-[200px]">{selectedFile.name}</h1>
                    </div>

                </header>

                <div className="flex-1 flex flex-col items-center justify-center p-4 bg-black/5">
                    {/* Centered Preview Container with Landscape support */}
                    <div className={`w-full max-h-[80%] aspect-[4/3] relative shadow-2xl overflow-hidden flex flex-col ${theme === 'frutiger' ? 'bg-white rounded-lg p-2' : 'bg-black border border-cyan-500'}`}>
                        {selectedFile.content ? (
                            selectedFile.name.toLowerCase().endsWith('.pdf') ? (
                                <iframe
                                    src={`${selectedFile.content}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full h-full bg-white"
                                    title={selectedFile.name}
                                />
                            ) : (
                                <img src={selectedFile.content} className="w-full h-full object-contain bg-gray-100" alt={selectedFile.name} />
                            )
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">Preview Not Available</div>
                        )}
                    </div>
                    <div className={`mt-4 text-xs ${theme === 'frutiger' ? 'text-gray-500' : 'text-cyan-700 font-mono'}`}>
                        SIZE: {selectedFile.size} | DATE: {selectedFile.date}
                    </div>
                </div>
            </div>
        );
    }

    // File Explorer View
    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            <header className={styles.header + " px-4 py-3 flex flex-col shrink-0"}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <BackButton onClick={handleBack} theme={theme} />
                        <h1 className="text-xl font-bold ml-1">Files</h1>
                    </div>
                    <Folder className={styles.accent} />
                </div>
                {/* Breadcrumb Bar */}
                <div className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${theme === 'frutiger' ? 'bg-black/5 text-gray-600' : 'bg-cyan-900/20 text-cyan-600 font-mono'}`}>
                    <span className="opacity-50">/home/</span>
                    <span className="truncate max-w-[200px]">{getBreadcrumbs()}</span>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 app-scroll">
                <div className="grid grid-cols-2 gap-4 max-w-[340px] mx-auto content-start">
                    {currentFolderContents.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleNavigate(item)}
                            className={`flex flex-col items-center justify-center p-4 gap-2 cursor-pointer transition-all active:scale-95 group ${theme === 'frutiger' ? 'bg-white/40 hover:bg-white/60 rounded-2xl shadow-sm border border-white/50' : 'bg-black/40 hover:bg-cyan-900/10 border border-cyan-900 hover:border-cyan-500'}`}
                        >
                            {item.type === 'folder' ? (
                                <Folder
                                    size={48}
                                    className={`drop-shadow-sm transition-transform group-hover:-translate-y-1 ${theme === 'frutiger' ? 'text-amber-400 fill-amber-100' : 'text-cyan-500 fill-cyan-900/20'}`}
                                    strokeWidth={1.5}
                                />
                            ) : (
                                <div className="relative">
                                    <FileText
                                        size={40}
                                        className={`drop-shadow-sm transition-transform group-hover:-translate-y-1 ${theme === 'frutiger' ? 'text-blue-500 fill-blue-50' : 'text-cyan-300'}`}
                                        strokeWidth={1.5}
                                    />
                                    {theme === 'frutiger' && <span className="absolute -bottom-1 -right-1 bg-white text-[8px] font-bold px-1 rounded shadow-sm text-gray-500 uppercase">{item.name.split('.').pop()}</span>}
                                </div>
                            )}
                            <span className={`text-xs font-medium text-center line-clamp-2 ${styles.text} ${theme === 'cyber' ? 'font-mono' : ''}`}>
                                {item.name}
                            </span>
                            {theme === 'cyber' && item.type === 'folder' && <span className="text-[9px] text-cyan-700">[DIR]</span>}
                        </div>
                    ))}
                </div>
                {currentFolderContents.length === 0 && (
                    <div className={`text-center mt-12 opacity-50 text-sm ${styles.text}`}>Folder is empty</div>
                )}
            </div>



            {/* Footer Info */}
            <div className={`p-2 text-center text-[10px] ${theme === 'frutiger' ? 'text-gray-400 bg-white/30' : 'text-cyan-800 border-t border-cyan-900 bg-black/60 font-mono'}`}>
                {currentFolderContents.length} ITEMS | FREE SPACE: 12GB
            </div>
        </div>
    );
};
