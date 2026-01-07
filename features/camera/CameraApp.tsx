
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AppProps } from '../../shared/types/common.types';

export const CameraApp: React.FC<AppProps> = ({ onClose, theme }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [filter, setFilter] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const filters = [
        { name: 'Normal', class: '' },
        { name: 'Retro', class: 'sepia contrast-125 brightness-90 saturate-50' },
        { name: 'Cyber', class: 'hue-rotate-90 contrast-150 grayscale' },
        { name: 'B&W', class: 'grayscale contrast-125' }
    ];

    const [isFlashing, setIsFlashing] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            setIsStreaming(true);
            setError(null);
        } catch (err: any) {
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                setError("Permission denied. Please allow camera access.");
            } else {
                setError("Could not access camera.");
            }
        }
    };

    // Initialize video stream when streaming starts
    useEffect(() => {
        if (isStreaming && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    }, [isStreaming]);

    const takePhoto = () => {
        if (!videoRef.current) return;

        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 150);

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Apply current filter to context
            // Note: complex CSS filters like 'hue-rotate' might need specific canvas filter syntax
            // For simplicity in this robust version, we'll try to map the CSS class to a canvas filter string if possible
            // or just capture the raw image for high fidelity data safety (preserving original).
            // However, user expects the filter.

            // Mapping filters:
            const currentFilter = filters[filter].name;
            if (currentFilter === 'Retro') {
                ctx.filter = 'sepia(0.5) contrast(1.25) brightness(0.9) saturate(0.5)';
            } else if (currentFilter === 'Cyber') {
                ctx.filter = 'hue-rotate(90deg) contrast(1.5) grayscale(1)';
            } else if (currentFilter === 'B&W') {
                ctx.filter = 'grayscale(1) contrast(1.25)';
            } else {
                ctx.filter = 'none';
            }

            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1); // Mirror the image to match video feed
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // Create download link
            const dataUrl = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `photo_${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    useEffect(() => {
        // Cleanup stream on unmount
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    if (error) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-black text-white relative">
                <div className="text-center p-6">
                    <p className="mb-4 text-red-400">{error}</p>
                    <button onClick={onClose} className="px-4 py-2 border border-white/20 rounded">Close App</button>
                </div>
                <button onClick={onClose} aria-label="Close" className="absolute top-4 left-4 p-2 bg-black/30 rounded-full text-white backdrop-blur"><X size={24} /></button>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-black relative flex flex-col">
            {!isStreaming ? (
                // START SCREEN - Permission Request UI
                <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-black">

                    <div className="relative z-10 text-center">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center overflow-hidden border border-white/20 bg-white/5">
                            <img src="/assets/camera/icon.png" alt="Camera Lens" className="w-full h-full object-cover scale-110" />
                        </div>

                        <button
                            onClick={startCamera}
                            className="px-8 py-4 text-lg font-bold transition-all active:scale-95 bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-lg"
                        >
                            Initialize Camera
                        </button>
                        <p className="mt-4 text-xs max-w-[200px] mx-auto text-gray-400 font-mono">
                            System permission required
                        </p>
                    </div>

                    <button onClick={onClose} aria-label="Close Camera" className="absolute top-4 left-4 p-2 bg-black/30 rounded-full text-white backdrop-blur z-20"><X size={24} /></button>
                </div>
            ) : (
                // ACTIVE CAMERA UI
                <>
                    <div className="flex-1 relative overflow-hidden">
                        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${filters[filter].class}`} />

                        {/* Flash Effect */}
                        {isFlashing && (
                            <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300 pointer-events-none"></div>
                        )}

                        {theme === 'frutiger' && <div className="absolute top-4 right-4 bg-black/40 px-2 py-1 rounded text-xs text-white backdrop-blur animate-pulse">REC</div>}
                        <button onClick={onClose} aria-label="Close Camera" className="absolute top-4 left-4 p-2 bg-black/30 rounded-full text-white backdrop-blur"><X size={24} /></button>
                    </div>
                    {/* Neutral Control Bar for both themes */}
                    <div className="h-24 bg-black border-t border-white/10 flex items-center justify-center gap-8">
                        <button
                            onClick={() => setFilter((filter + 1) % filters.length)}
                            className="text-xs px-3 py-1 rounded border border-white/20 text-gray-400"
                        >
                            {filters[filter].name}
                        </button>
                        <button
                            onClick={takePhoto}
                            aria-label="Take photo"
                            className="w-16 h-16 rounded-full border-4 border-white/80 p-1 cursor-pointer active:scale-90 transition-transform bg-transparent"
                        >
                            <div className="w-full h-full rounded-full bg-white"></div>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
