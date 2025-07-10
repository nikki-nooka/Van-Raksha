import React from 'react';

interface AnalysisInProgressAnimationProps {
    imagePreview: string | null;
}

const AnalysisInProgressAnimation: React.FC<AnalysisInProgressAnimationProps> = ({ imagePreview }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-slate-900/80 backdrop-blur-sm z-10 p-4">
        <div className="relative w-48 h-48 flex justify-center items-center">
            {/* Pulsing Core */}
            <div 
                className="absolute w-16 h-16 bg-emerald-400 rounded-full"
                style={{
                    animation: 'core-pulse-strong 2s infinite ease-in-out',
                    filter: 'blur(15px)'
                }}
            />
            
            {/* Image being deconstructed */}
            {imagePreview && (
                <div 
                    className="w-full h-full"
                    style={{
                        maskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
                        WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 100%)',
                        animation: 'image-dissolve 2.5s forwards ease-in-out'
                    }}
                >
                    <img 
                        src={imagePreview} 
                        alt="Analyzing" 
                        className="w-full h-full object-contain"
                    />
                </div>
            )}
             
            {/* Scanning Grid Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `linear-gradient(#6ee7b7 1px, transparent 1px), linear-gradient(to right, #6ee7b7 1px, transparent 1px)`,
                backgroundSize: '25px 25px',
                animation: `scan-grid-lines 1s linear infinite`,
            }} />
        </div>
        <div className="mt-6 text-emerald-300 font-semibold text-lg">
            Deconstructing Image...
        </div>
    </div>
  );
};

export default AnalysisInProgressAnimation;