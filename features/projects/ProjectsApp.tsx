
import React, { useState } from 'react';
import { Search, Share2, MonitorPlay, Github, ChevronRight } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { PROJECTS, Project } from './projects.data';

export const ProjectsApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const styles = getThemeStyles(theme);

    const categories = ['All', 'AI', 'Web', 'Automation', 'UI', 'Experiments'];

    const filteredProjects = PROJECTS.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const FeaturedProject = PROJECTS[1]; // Using ArtGen as featured

    // --- PROJECT DETAILS VIEW ---
    if (selectedProject) {
        return (
            <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
                <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0"}>
                    <BackButton onClick={() => setSelectedProject(null)} theme={theme} />
                    <Share2 className={styles.accent} size={20} />
                </header>

                <div className="flex-1 overflow-y-auto app-scroll pb-6">
                    {/* Hero Header */}
                    <div className={`p-6 pb-4 flex flex-col items-center border-b ${theme === 'frutiger' ? 'section-overlay border-white/40' : 'bg-black/40 border-cyan-900'}`}>
                        <div className={`w-28 h-28 mb-4 shadow-xl ${theme === 'frutiger' ? 'rounded-3xl' : 'rounded-none border-2 border-cyan-500'}`}>
                            <img src={selectedProject.imageUrl} alt={selectedProject.title} className={`w-full h-full object-cover ${theme === 'frutiger' ? 'rounded-3xl' : ''}`} />
                        </div>
                        <h1 className={`text-2xl font-bold mb-1 ${theme === 'frutiger' ? 'text-primary-dark' : styles.text}`}>{selectedProject.title}</h1>
                        <p className={`text-sm mb-4 opacity-80 ${theme === 'frutiger' ? 'text-secondary-dark' : styles.text}`}>{selectedProject.tagline}</p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 w-full max-w-sm">
                            <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 ${theme === 'frutiger' ? 'bg-[#0EA5E9] text-white shadow-lg hover:shadow-xl hover:bg-[#0284C7]' : 'bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-400'}`}
                            >
                                <MonitorPlay size={18} />
                                {theme === 'frutiger' ? 'Live Demo' : 'LIVE_DEMO'}
                            </a>
                            <a
                                href={selectedProject.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 ${theme === 'frutiger' ? 'bg-white text-secondary-dark border border-slate-200 shadow-sm hover:bg-gray-50' : 'bg-black text-cyan-500 border border-cyan-700 hover:border-cyan-500'}`}
                            >
                                <Github size={18} />
                                {theme === 'frutiger' ? 'GitHub' : 'SOURCE'}
                            </a>
                        </div>
                    </div>

                    {/* Tech Stack Row (Replaces Stats) */}
                    <div className={`py-4 px-6 border-b ${theme === 'frutiger' ? 'border-white/40' : 'border-cyan-900'}`}>
                        <h3 className={`font-bold mb-3 text-xs uppercase opacity-70 tracking-wider text-center ${theme === 'frutiger' ? 'text-muted-dark' : styles.text}`}>Technology Stack</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {selectedProject.tags.map(tag => (
                                <span key={tag} className={`px-3 py-1.5 text-xs font-bold ${theme === 'frutiger' ? 'bg-white/50 text-secondary-dark rounded-full border border-white/40' : 'bg-cyan-900/20 text-cyan-400 border border-cyan-800 font-mono'}`}>
                                    {theme === 'cyber' ? `[${tag}]` : tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 py-2 pb-8">
                        <h3 className={`font-bold mb-2 text-sm ${theme === 'frutiger' ? 'text-primary-dark' : styles.text}`}>About this app</h3>
                        <p className={`text-sm leading-relaxed opacity-90 ${theme === 'frutiger' ? 'text-secondary-dark' : styles.text}`}>
                            {selectedProject.description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // --- STORE FRONT VIEW ---
    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            {/* Header */}
            <div className={`px-4 pt-4 pb-2 flex flex-col gap-3 shrink-0 z-10 ${theme === 'frutiger' ? 'bg-white/60 backdrop-blur-md border-b border-white/50' : 'bg-black/60 border-b border-cyan-900'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <BackButton onClick={onClose} theme={theme} />
                        <h1 className={`text-2xl font-bold ml-1 ${theme === 'frutiger' ? 'text-primary-dark' : styles.text}`}>Store</h1>
                    </div>
                    <div className={`w-8 h-8 rounded-full overflow-hidden ${theme === 'frutiger' ? 'bg-gray-200' : 'border border-cyan-500'}`}>
                        <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'frutiger' ? 'text-secondary-dark' : 'text-cyan-700'}`} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search apps, plugins..."
                        aria-label="Search apps"
                        className={`w-full pl-9 pr-4 py-2 text-sm outline-none ${theme === 'frutiger' ? 'bg-white/50 rounded-xl focus:bg-white text-primary-dark placeholder:text-muted-dark' : 'bg-cyan-900/10 border border-cyan-800 text-cyan-400 placeholder-cyan-800 rounded-none focus:border-cyan-500'}`}
                    />
                </div>

                {/* Filter Chips - Horizontal Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-1 app-scroll no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat
                                ? (theme === 'frutiger' ? 'bg-[#163A4A] text-white rounded-full shadow-md' : 'bg-cyan-500 text-black border border-cyan-500')
                                : (theme === 'frutiger' ? 'bg-white/50 text-secondary-dark rounded-full hover:bg-white' : 'bg-black text-cyan-700 border border-cyan-900 hover:border-cyan-600')
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 app-scroll">

                {/* Featured Banner - Only show if no search/filter active */}
                {activeCategory === 'All' && !searchQuery && (
                    <div
                        onClick={() => setSelectedProject(FeaturedProject)}
                        className={`w-full aspect-[2/1] relative overflow-hidden cursor-pointer group shrink-0 ${theme === 'frutiger' ? 'rounded-2xl shadow-lg border border-white/40' : 'border border-cyan-500'}`}
                    >
                        <img src={FeaturedProject.imageUrl} alt={FeaturedProject.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 mb-1">Featured App</span>
                            <h2 className="text-white text-xl font-bold">{FeaturedProject.title}</h2>
                            <p className="text-gray-200 text-xs">{FeaturedProject.tagline}</p>
                        </div>
                    </div>
                )}

                {/* App List */}
                <div className="flex flex-col gap-4">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className={`flex items-center gap-4 p-3 cursor-pointer group transition-all ${theme === 'frutiger' ? 'glass-tile rounded-2xl active:scale-[0.98]' : 'bg-black/40 border border-cyan-900 hover:border-cyan-500 hover:bg-cyan-900/10'}`}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* App Icon */}
                            <div className={`w-16 h-16 shrink-0 shadow-md ${theme === 'frutiger' ? 'rounded-2xl' : 'rounded-none border border-cyan-700'}`}>
                                <img src={project.imageUrl} alt={project.title} className={`w-full h-full object-cover ${theme === 'frutiger' ? 'rounded-2xl' : ''}`} />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className={`font-bold truncate ${theme === 'frutiger' ? 'text-primary-dark' : styles.text}`}>{project.title}</h3>
                                <p className={`text-xs truncate opacity-70 mb-1 ${theme === 'frutiger' ? 'text-muted-dark' : styles.text}`}>{project.tagline}</p>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${theme === 'frutiger' ? 'bg-white/50 text-secondary-dark' : 'bg-cyan-900/30 text-cyan-600'}`}>
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Navigation Chevron (Replacement for GET button) */}
                            <ChevronRight size={18} className={`opacity-50 ${theme === 'frutiger' ? 'text-secondary-dark' : 'text-cyan-600'}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
