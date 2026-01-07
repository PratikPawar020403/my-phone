
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';
import { BackButton } from '../../shared/components/BackButton';
import { getThemeStyles } from '../../shared/utils/theme';
import { AVAILABLE_WALLPAPERS } from '../../os/os.types';

export const SettingsApp: React.FC<AppProps> = ({ onClose, theme, setTheme, setWallpaper, currentWallpaper }) => {
    const styles = getThemeStyles(theme);

    return (
        <div className={`h-full w-full flex flex-col ${styles.container} ${styles.font}`}>
            <header className={styles.header + " px-4 py-3 flex items-center justify-between shrink-0"}>
                <div className="flex items-center"><BackButton onClick={onClose} theme={theme} /><h1 className="text-xl font-bold ml-2">Config</h1></div>
                <SettingsIcon className={styles.accent} />
            </header>

            <div className="p-6 space-y-8 app-scroll overflow-y-auto">
                <div className={styles.card + " p-6"}>
                    <h2 className={`text-lg font-bold mb-4 ${styles.text}`}>Appearance</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setTheme && setTheme('frutiger')} className={`cursor-pointer rounded-xl h-24 relative overflow-hidden border-2 ${theme === 'frutiger' ? 'border-cyan-400' : 'border-transparent'}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-cyan-200"></div>
                            <span className="absolute center inset-0 flex items-center justify-center font-bold text-cyan-800">Eco.Aero</span>
                        </div>
                        <div onClick={() => setTheme && setTheme('cyber')} className={`cursor-pointer rounded-xl h-24 relative overflow-hidden border-2 ${theme === 'cyber' ? 'border-cyan-500' : 'border-transparent'}`}>
                            <div className="absolute inset-0 bg-black"></div>
                            <span className="absolute center inset-0 flex items-center justify-center font-bold text-cyan-500 font-mono">ROBOTIC</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card + " p-6"}>
                    <h2 className={`text-lg font-bold mb-4 ${styles.text}`}>Background</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {AVAILABLE_WALLPAPERS.map((wp) => (
                            <button key={wp.id} onClick={() => setWallpaper && setWallpaper(wp.url)} className={`aspect-video rounded-lg bg-cover bg-center border-2 ${currentWallpaper === wp.url ? 'border-cyan-500' : 'border-transparent'}`} style={{ backgroundImage: `url(${wp.url})` }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
