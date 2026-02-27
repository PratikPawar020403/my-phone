export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'image';
    size?: string;
    date: string;
    content?: string;
    children?: FileItem[];
}

export interface StackSkill {
    id: string;
    name: string;
    category: string;
    successMessage: string;
}

export const GUESTBOOK_INITIAL = [
    { id: '1', author: 'Sarah J.', title: 'Amazing work!', content: 'Love the retro vibe of this portfolio. Very creative!', date: '10/24/2023' },
    { id: '2', author: 'Mike R.', title: 'Cyberpunk!', content: 'The theme switching is seamless. Great React skills.', date: '11/02/2023' },
    { id: '3', author: 'Recruiter_Dave', title: 'Hiring?', content: 'Are you open to freelance work? Dropping my contact.', date: '11/05/2023' },
];

export const AVAILABLE_WALLPAPERS = [
    {
        id: 'frutiger-default',
        name: 'Eco Future',
        theme: 'frutiger',
        url: '/assets/eco-aero.png'
    },
    {
        id: 'cyber-default',
        name: 'Hex Core',
        theme: 'cyber',
        url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'frutiger-cloud',
        name: 'Dream Sky',
        theme: 'frutiger',
        url: 'https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'frutiger-nature',
        name: 'Zen Garden',
        theme: 'frutiger',
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2064&auto=format&fit=crop'
    },
    {
        id: 'cyber-neon',
        name: 'Neon City',
        theme: 'cyber',
        url: 'https://images.unsplash.com/photo-1565626424177-879e612f0e0c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'frutiger-glass',
        name: 'Glass Waves',
        theme: 'frutiger',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'cyber-matrix',
        name: 'Data Rain',
        theme: 'cyber',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
    }
];

export const PLAYLIST = [
    { id: '1', title: 'Neon Blade', artist: 'MoonDeity', duration: '4:25', coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop' },
    { id: '2', title: 'Aquatic Ambiance', artist: 'Scythe', duration: '3:12', coverUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop' },
    { id: '3', title: 'Midnight City', artist: 'M83', duration: '4:03', coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop' },
    { id: '4', title: 'Veridis Quo', artist: 'Daft Punk', duration: '5:01', coverUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop' }
];

export const FILE_SYSTEM: FileItem[] = [
    {
        id: 'certifications',
        name: 'Certifications',
        type: 'folder',
        date: '01/2026',
        children: [
            { id: 'ai-cert', name: 'AiCertificate.pdf', type: 'image', size: '425 KB', date: '01/2026', content: '/assets/docs/AiCertificate.pdf' },
            { id: 'ml-cert', name: 'mlcerti.pdf', type: 'image', size: '1.6 MB', date: '01/2026', content: '/assets/docs/mlcerti.pdf' },
            { id: 'cs-cert', name: 'CS.pdf', type: 'image', size: '548 KB', date: '01/2026', content: '/assets/docs/CS.pdf' },
            { id: 'iit-cert', name: 'iit.pdf', type: 'image', size: '1.4 MB', date: '01/2026', content: '/assets/docs/iit.pdf' },
            { id: 'lue-1', name: 'LUEBCOCT12455.pdf', type: 'image', size: '1.5 MB', date: '01/2026', content: '/assets/docs/LUEBCOCT12455.pdf' },
            { id: 'lue-2', name: 'LUELLMJUN12545.pdf', type: 'image', size: '1.6 MB', date: '01/2026', content: '/assets/docs/LUELLMJUN12545.pdf' },
            { id: 'lue-3', name: 'LUEPEOCT124299.pdf', type: 'image', size: '1.5 MB', date: '01/2026', content: '/assets/docs/LUEPEOCT124299.pdf' },
            { id: 'pieces', name: 'piecesCerti.pdf', type: 'image', size: '62 KB', date: '01/2026', content: '/assets/docs/piecesCerti.pdf' },
            { id: 'forage-1', name: 'forage.pdf', type: 'image', size: '215 KB', date: '01/2026', content: '/assets/docs/forage.pdf' },
            { id: 'forage-2', name: 'forage2.pdf', type: 'image', size: '396 KB', date: '01/2026', content: '/assets/docs/forage2.pdf' },
            { id: 'certi9', name: 'certi9.pdf', type: 'image', size: '2.1 MB', date: '01/2026', content: '/assets/docs/certi9.pdf' },
            { id: 'pratik-cert', name: 'Pratik_S_Pawar_Certificate.pdf', type: 'image', size: '170 KB', date: '01/2026', content: '/assets/docs/Pratik_S_Pawar_Certificate.pdf' },
            { id: 'guvi-buildathon', name: 'guvibuildathon.pdf', type: 'image', size: '90.5 KB', date: '02/2026', content: '/assets/docs/guvibuildathon.pdf' },
            {
                id: 'research-paper-old',
                name: 'A Paradigm Shift in Enterprise.pdf',
                type: 'image',
                size: '1.4 MB',
                date: '01/2026',
                content: '/assets/docs/A Paradigm Shift in Enterprise and Startup Opportunities.pdf'
            }
        ]
    },
    {
        id: 'research',
        name: 'Research',
        type: 'folder',
        date: '01/2026',
        children: [
            {
                id: 'research-paper-new',
                name: 'Research Paper.pdf',
                type: 'image',
                size: '2.5 MB',
                date: '01/2026',
                content: '/assets/docs/research paper.pdf'
            }
        ]
    },
    {
        id: 'resume',
        name: 'Pratik S Pawar - Resume.pdf',
        type: 'image',
        size: '150 KB',
        date: '01/2026',
        content: '/assets/docs/Pratik S Pawar - Resume.pdf'
    }
];

export const STACK_GAME_SKILLS: StackSkill[] = [
    // LANGUAGES
    { id: 'python', name: 'Python', category: 'Languages', successMessage: 'Python is the foundation of my AI and backend work.' },
    { id: 'js', name: 'JavaScript', category: 'Languages', successMessage: 'JavaScript drives my client-side logic and interactions.' },
    { id: 'sql', name: 'SQL', category: 'Languages', successMessage: 'SQL handles my structured data storage and querying.' },

    // ML / AI
    { id: 'llm', name: 'LLM APIs', category: 'ML / AI', successMessage: 'This powers my large-language-model integrations.' },
    { id: 'tf', name: 'TensorFlow', category: 'ML / AI', successMessage: 'This is part of my deep learning model training stack.' },
    { id: 'pytorch', name: 'PyTorch', category: 'ML / AI', successMessage: 'This is my go-to framework for advanced model experimentation.' },
    { id: 'sklearn', name: 'Scikit-Learn', category: 'ML / AI', successMessage: 'This supports my classical machine learning pipelines.' },
    { id: 'pandas', name: 'Pandas', category: 'ML / AI', successMessage: 'This is my core data analysis and preprocessing tool.' },
    { id: 'numpy', name: 'NumPy', category: 'ML / AI', successMessage: 'This handles numerical computation at the core of my ML work.' },
    { id: 'opencv', name: 'OpenCV', category: 'ML / AI', successMessage: 'This powers my real-time computer vision processing.' },
    { id: 'yolov8', name: 'YOLOv8', category: 'ML / AI', successMessage: 'This is used for real-time object detection tasks.' },
    { id: 'hf', name: 'Hugging Face', category: 'ML / AI', successMessage: 'This supports my model hosting and NLP workflows.' },

    // WEB
    { id: 'html', name: 'HTML', category: 'Web', successMessage: 'HTML defines the structure of my web interfaces.' },
    { id: 'css', name: 'CSS', category: 'Web', successMessage: 'CSS controls the layout and visual styling of my UIs.' },
    { id: 'react', name: 'React.js', category: 'Web', successMessage: 'React is my primary frontend framework.' },
    { id: 'streamlit', name: 'Streamlit', category: 'Web', successMessage: 'Streamlit helps me rapidly deploy interactive ML apps.' },

    // TOOLS & PLATFORMS
    { id: 'git', name: 'Git', category: 'Tools & Platforms', successMessage: 'Git manages my entire version control workflow.' },
    { id: 'docker', name: 'Docker', category: 'Tools & Platforms', successMessage: 'Docker powers my containerized deployments.' },
    { id: 'figma', name: 'Figma', category: 'Tools & Platforms', successMessage: 'Figma is where I design my UI and UX.' },
    { id: 'powerbi', name: 'Power BI', category: 'Tools & Platforms', successMessage: 'Power BI supports my data visualization work.' },
    { id: 'supabase', name: 'Supabase', category: 'Tools & Platforms', successMessage: 'Supabase is part of my backend and database stack.' },
    { id: 'ai-assist', name: 'AI-Assisted Development', category: 'Tools & Platforms', successMessage: 'These tools accelerate my entire development process.' },
];