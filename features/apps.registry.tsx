
import {
    Settings as SettingsIcon, StickyNote, Music, Phone, LayoutGrid, Folder, Layers,
    Mail, Camera, Images
} from 'lucide-react';
import { AppDefinition } from '../shared/types/common.types';

// Feature Imports
import { IdentityApp } from './identity/IdentityApp';
import { ProjectsApp } from './projects/ProjectsApp';
import { StackGameApp } from './skills/SkillsApp';
import { MailApp } from './mail/MailApp';
import { SettingsApp } from './settings/SettingsApp';
import { CameraApp } from './camera/CameraApp';
import { RotaryDialApp } from './contact/ContactApp';
import { GuestbookApp } from './guestbook/GuestbookApp';
import { MusicApp } from './music/MusicApp';
import { FilesApp } from './files/FilesApp';

// Colors now represent the Icon color inside the glass tile
// Theme updated to Green/Cyan/Blue (Eco Future) for Frutiger
// Theme updated to Neon Blue/Red for Cyber

export const APP_REGISTRY: AppDefinition[] = [
    {
        id: 'stack',
        name: 'Assemble My Stack',
        icon: Layers,
        color: 'purple',
        component: StackGameApp
    },
    {
        id: 'guestbook',
        name: 'Notes',
        icon: StickyNote,
        color: 'yellow',
        component: GuestbookApp
    },
    {
        id: 'mail',
        name: 'Mail',
        icon: Mail,
        color: 'blue',
        component: MailApp
    },
    {
        id: 'music',
        name: 'Music',
        icon: Music,
        color: 'purple',
        component: MusicApp
    },
    {
        id: 'files',
        name: 'Files',
        icon: Folder,
        color: 'orange',
        component: FilesApp
    },
    {
        id: 'contact',
        name: 'Dialer',
        icon: Phone,
        color: 'green',
        component: RotaryDialApp
    },
    {
        id: 'projects',
        name: 'Store',
        icon: LayoutGrid,
        color: 'blue',
        component: ProjectsApp
    },


    {
        id: 'camera',
        name: 'Camera',
        icon: Camera,
        color: 'blue',
        component: CameraApp
    },

    {
        id: 'about',
        name: 'Gallery',
        icon: Images,
        color: 'teal',
        component: IdentityApp
    },
    {
        id: 'settings',
        name: 'Config',
        icon: SettingsIcon,
        color: 'slate',
        component: SettingsApp
    },
];
