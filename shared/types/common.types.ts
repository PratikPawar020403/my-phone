
import React from 'react';
export type Theme = 'frutiger' | 'cyber';

export interface AppProps {
    onClose: () => void;
    theme: Theme;
    setTheme?: (theme: Theme) => void;
    setWallpaper?: (url: string) => void;
    currentWallpaper?: string;
}

export interface AppDefinition {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    component: React.FC<AppProps>;
}

export interface Wallpaper {
    id: string;
    name: string;
    theme: Theme;
    url: string;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    duration: string;
    coverUrl: string;
}

export interface Note {
    id: string;
    author: string;
    title: string;
    content: string;
    date: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
}
