
export interface Project {
    id: number;
    title: string;
    tagline: string;
    category: string;
    description: string;
    tags: string[];
    imageUrl: string;
    rating: number;
    downloads: string;
    version: string;
    size: string;

    repoUrl: string;
    demoUrl: string;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "ani-realm",
        tagline: "Scroll, explore, and enjoy anime by mood and era",
        category: "UI",
        description: "A fun and immersive anime discovery web app where users can scroll, explore, and enjoy anime by mood and era through a visually engaging interface.",
        tags: ["HTML5", "Vanilla JavaScript", "TailwindCSS", "Three.js", "Anime API"],
        imageUrl: "/assets/pro-images/logo.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/ani-realm",
        demoUrl: "https://ani-realm.netlify.app/"
    },
    {
        id: 2,
        title: "FitFocus Dashboard",
        tagline: "Track your health metrics in one clear dashboard",
        category: "UI",
        description: "A fitness web app that calculates key health metrics such as BMI, BMR, and TDEE, presenting the results in a clean and easy-to-understand dashboard.",
        tags: ["Vite", "React", "TypeScript", "Tailwind CSS"],
        imageUrl: "/assets/pro-images/fit1.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/fitfocus",
        demoUrl: "https://fit-focus.netlify.app/"
    },
    {
        id: 3,
        title: "India Population Insights Dashboard",
        tagline: "Explore India’s population trends through interactive visuals",
        category: "Web",
        description: "An interactive dashboard to visualize and explore India’s population trends using maps and charts, enabling state-wise and year-by-year data analysis.",
        tags: ["Python", "Streamlit", "Plotly", "Pandas"],
        imageUrl: "/assets/pro-images/popu.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/India-Population-Dashboard",
        demoUrl: "https://india-population.streamlit.app/"
    },
    {
        id: 4,
        title: "Iris Flower Predictor",
        tagline: "Predict iris flower types with images and probabilities",
        category: "AI",
        description: "A simple and interactive machine learning app that predicts the type of Iris flower based on user input, displaying results with images and probability scores.",
        tags: ["Python", "Streamlit", "Scikit-learn", "PIL"],
        imageUrl: "/assets/pro-images/1q.jpg",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/Iris-Flower-Prediction-App",
        demoUrl: "https://basiciris.streamlit.app/"
    },
    {
        id: 5,
        title: "Keyboard Monitoring Tool",
        tagline: "Ethical keyboard monitoring for cybersecurity research",
        category: "Automation",
        description: "A Python-based tool designed for authorized environments to capture and analyze keyboard input for ethical cybersecurity research and system behavior studies.",
        tags: ["Python", "pynput", "smtplib", "pandas"],
        imageUrl: "/assets/pro-images/keylog1.jpg",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/keylog",
        demoUrl: ""
    },
    {
        id: 6,
        title: "Legal-Sakha",
        tagline: "AI-powered legal guidance for Indian laws",
        category: "AI",
        description: "A RAG-based chatbot built for the Indian legal framework that answers legal queries using accurate retrieval from pre-provided legal documents.",
        tags: ["Python", "Gemma 3n E4B (GGUF)", "FAISS", "BAAI BGE Embeddings", "Gradio", "llama-cpp-python"],
        imageUrl: "/assets/pro-images/ragi.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/Legal-Sakha",
        demoUrl: ""
    },
    {
        id: 7,
        title: "Lung-Check",
        tagline: "Assess lung cancer risk with data-driven insights",
        category: "AI",
        description: "A machine learning tool that uses patient data to assess lung cancer risk, providing clear insights and visualizations through an interactive interface.",
        tags: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy"],
        imageUrl: "/assets/pro-images/2lung.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/Lung-Cancer-Risk-Assessment-System",
        demoUrl: "https://lungcheck.streamlit.app/"
    },
    {
        id: 8,
        title: "PotholeSahayak",
        tagline: "AI-powered pothole detection for safer roads",
        category: "AI",
        description: "A deep learning tool that uses YOLOv8 to detect potholes in images and videos, helping authorities monitor road conditions and improve maintenance efficiency.",
        tags: ["Python", "YOLOv8 (Ultralytics)", "Streamlit"],
        imageUrl: "/assets/pro-images/pothole.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/PotholeSahayak/tree/main",
        demoUrl: "https://potholesahayak.streamlit.app/"
    },
    {
        id: 9,
        title: "Privacy Guard",
        tagline: "Prevent accidental leaks of sensitive Indian data",
        category: "Automation",
        description: "A browser extension that detects Indian PAN, Aadhaar, and bank details in real time to prevent accidental data leaks during web form submissions.",
        tags: ["JavaScript", "HTML", "CSS"],
        imageUrl: "/assets/pro-images/pg1.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Small",

        repoUrl: "https://github.com/PratikPawar020403/Privacy-Guard",
        demoUrl: ""
    },
    {
        id: 10,
        title: "TreaQi",
        tagline: "Predict air quality and recommend trees for cleaner cities",
        category: "AI",
        description: "A machine learning platform that predicts air quality, provides AQI insights, and recommends suitable trees to support effective urban pollution management.",
        tags: ["Python", "Streamlit", "Scikit-learn", "Pandas", "Plotly"],
        imageUrl: "/assets/pro-images/airiq2.png",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Medium",

        repoUrl: "https://github.com/PratikPawar020403/aqi-tree-recommender",
        demoUrl: "https://aqi-tree-recommender.streamlit.app/"
    },
    {
        id: 11,
        title: "Unicorn Explorer",
        tagline: "Explore India’s unicorn startups with data-driven insights",
        category: "Web",
        description: "An interactive dashboard to explore India’s unicorn startups using filters, funding insights, and growth trends through rich visualizations.",
        tags: ["Streamlit", "Pandas", "Plotly", "Wordcloud"],
        imageUrl: "/assets/pro-images/21.webp",
        rating: 0,
        downloads: "—",
        version: "1.0.0",
        size: "Large",

        repoUrl: "https://github.com/PratikPawar020403/Indian-Unicorn-Startups-Dashboard",
        demoUrl: "https://inspdash.streamlit.app/"
    }
];
