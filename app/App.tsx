import React, { useState, useEffect } from 'react';
import { PhoneSystem } from '@/os/System';
import '../index.css';

const App: React.FC = () => {
  // Scale Controller State
  const [scale, setScale] = useState(1);

  // Constants for Physical Phone Size (iPhone 14 Pro-ish)
  const PHONE_WIDTH = 390;
  const PHONE_HEIGHT = 844;
  const DESKTOP_PADDING_X = 40; // Horizontal buffer
  const DESKTOP_PADDING_Y = 40; // Vertical buffer

  useEffect(() => {
    const handleResize = () => {
      // Only run scale logic on desktop-sized viewports to be safe, 
      // though CSS media queries handle the main switch.
      if (window.innerWidth >= 768) {
        const availableWidth = window.innerWidth - DESKTOP_PADDING_X;
        const availableHeight = window.innerHeight - DESKTOP_PADDING_Y;

        const wScale = availableWidth / PHONE_WIDTH;
        const hScale = availableHeight / PHONE_HEIGHT;

        // Use the smaller dimension to fit, cap at 1.0 (never scale up > 100%)
        const newScale = Math.min(wScale, hScale, 1);
        setScale(newScale);
      } else {
        setScale(1); // Reset on mobile
      }
    };

    // Initial calc
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    // Layer 1: Viewport Host
    // Desktop: Fixed Background, Centered, Overflow Hidden, Dark Mode
    // Mobile: Native Block Flow (bg-black)
    <div className="fixed inset-0 w-full h-full bg-black md:bg-gray-900 flex items-center justify-center overflow-hidden">

      {/* Layer 2: Scale Controller Wrapper (Desktop Only) */}
      <div
        className="relative transition-transform duration-100 ease-out origin-center hidden md:block" // Hidden on mobile
        style={{ transform: `scale(${scale})` }}
      >
        {/* Layer 3: Phone Frame (Physical Device) */}
        {/* Strict Fixed Dimensions: 390x844. NO Responsive Layout here. */}
        <div
          style={{ width: `${PHONE_WIDTH}px`, height: `${PHONE_HEIGHT}px` }}
          className="relative bg-black rounded-[3.5rem] shadow-2xl border-[8px] border-gray-800 ring-4 ring-gray-700/50 overflow-hidden shrink-0"
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex justify-center items-center pointer-events-none">
            <div className="w-16 h-4 bg-gray-900/50 rounded-full" />
          </div>

          {/* Layer 4: Screen Mask (Content Clip) */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            <PhoneSystem />
            {/* <Toaster /> goes here later */}
          </div>

          {/* Gloss Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-[3.5rem] ring-1 ring-white/5" />
        </div>
      </div>

      {/* Mobile Override Pass-Through */}
      {/* On mobile, we bypass the scale wrapper entirely to act as a native app */}
      <div className="md:hidden w-full h-[100dvh] relative bg-black overflow-hidden">
        <PhoneSystem />
        {/* <Toaster /> goes here later */}
      </div>

    </div>
  );
};

export default App;