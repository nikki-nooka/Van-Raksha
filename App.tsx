import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageAnalyzer from './components/ImageAnalyzer';
import Chatbot from './components/Chatbot';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from './constants';
import IntroAnimation from './components/IntroAnimation';
import ThreatAnimationOverlay from './components/animations/ThreatAnimationOverlay';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [threatAnimation, setThreatAnimation] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIntroComplete(true);
    }, 5500); // New animation duration
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (threatAnimation) {
      // Duration of the threat animation before it fades
      const animationTimer = setTimeout(() => {
        setThreatAnimation(null);
        setIsShaking(false);
      }, 3500); // More impactful duration
      return () => clearTimeout(animationTimer);
    }
  }, [threatAnimation]);

  const handleThreatDetected = (threatName: string) => {
    const primaryThreat = threatName.toLowerCase();
    if (primaryThreat.includes('fire')) {
        setThreatAnimation('Wildfire');
    } else if (primaryThreat.includes('flood')) {
        setThreatAnimation('Flood');
    } else if (primaryThreat.includes('tornado') || primaryThreat.includes('cyclone')) {
        setThreatAnimation('Tornado');
    } else if (primaryThreat.includes('earthquake') || primaryThreat.includes('seismic')) {
        setIsShaking(true);
        setThreatAnimation('Earthquake'); // Also trigger overlay for cracks
    } else if (primaryThreat.includes('volcanic')) {
        setThreatAnimation('Volcanic Eruption');
    } else if (primaryThreat.includes('landslide')) {
        setThreatAnimation('Landslide');
    }
  };

  const appClassName = `min-h-screen bg-slate-100 text-slate-800 flex flex-col ${introComplete ? 'animate-fade-in-app' : 'opacity-0'} ${isShaking ? 'animate-[earthquake-shake-violent_3.5s_linear_1]' : ''}`;

  return (
    <>
      {!introComplete && <IntroAnimation />}
      {threatAnimation && (
        <ThreatAnimationOverlay threatType={threatAnimation} />
      )}
      {introComplete && (
          <div className={appClassName}>
            <Header />
            <main className="flex-grow p-4 sm:p-6 lg:p-8 flex flex-col items-center">
              <div className="w-full max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                          Your AI Environmental Guardian
                      </h2>
                      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                          Upload an image to detect environmental threats. VanRaksha analyzes for signs of fire, floods, and more, providing actionable insights to protect our world.
                      </p>
                  </div>
                  <ImageAnalyzer onThreatDetected={handleThreatDetected} />
              </div>
            </main>
            
            {/* Floating Chat Components */}
            <div className="fixed bottom-6 right-6 z-20">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-emerald-500 transition-transform hover:scale-110"
                aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
              >
                {isChatOpen ? <XMarkIcon className="w-7 h-7"/> : <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7" />}
              </button>
            </div>
            
            {isChatOpen && (
              <div className="fixed bottom-24 right-6 z-20 w-[calc(100vw-3rem)] max-w-md">
                  <Chatbot />
              </div>
            )}
            
            <footer className="text-center p-4 text-xs text-slate-500 mt-8">
              VanRaksha | AI for a greener planet
            </footer>
          </div>
        )}
    </>
  );
};

export default App;