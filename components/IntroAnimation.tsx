import React from 'react';

const TreeLayer = ({ children, animation, z, opacity = 'opacity-100' }: { children: React.ReactNode, animation: string, z: number, opacity?: string }) => (
    <div className={`absolute inset-0 ${opacity}`} style={{ zIndex: z, animation }}>
        {children}
    </div>
);

// A simple SVG pine tree silhouette for robust rendering without external images
const PineTree = ({ style, className = '' }: { style: React.CSSProperties, className?: string }) => (
    <div className={`absolute bottom-0 ${className}`} style={style}>
        <svg viewBox="0 0 120 240" fill="currentColor" preserveAspectRatio="none">
            <path d="M60,0 L0,180 L20,180 L20,240 L100,240 L100,180 L120,180 Z M60,20 L20,130 L100,130 Z M60,40 L30,100 L90,100 Z" />
        </svg>
    </div>
);


const IntroAnimation: React.FC = () => {
  return (
    <div 
        className="fixed inset-0 z-50 overflow-hidden bg-slate-900"
        style={{ animation: 'fadeOut 0.5s ease-out 5s forwards' }}
    >
        <div className="absolute inset-0" style={{ animation: 'zoom-in-scene 5.5s ease-out forwards' }}>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c142c] via-[#111827] to-[#020617]"></div>
            
            {/* Stars */}
            <div className="absolute inset-0">
                {[...Array(150)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full opacity-70" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 60}%`,
                        width: `${Math.random() * 1.5}px`,
                        height: `${Math.random() * 1.5}px`,
                        animation: `star-twinkle ${Math.random() * 8 + 4}s infinite alternate`,
                    }} />
                ))}
            </div>

            {/* Tree Layers */}
            <TreeLayer z={10} animation="parallax-back 15s linear forwards" opacity="opacity-40">
                <PineTree className="w-40 h-auto text-black" style={{ left: '5%' }} />
                <PineTree className="w-32 h-auto text-black" style={{ left: '80%' }} />
                <PineTree className="w-24 h-auto text-black" style={{ left: '45%' }} />
            </TreeLayer>

            <TreeLayer z={20} animation="parallax-mid 10s linear forwards" opacity="opacity-60">
                 <PineTree className="w-56 h-auto text-black" style={{ left: '20%' }} />
                 <PineTree className="w-48 h-auto text-black" style={{ left: '60%' }} />
            </TreeLayer>
            
            {/* Fog */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" style={{ zIndex: 25 }} />

            <TreeLayer z={30} animation="parallax-fore 7s linear forwards">
                <PineTree className="w-80 h-auto text-black" style={{ left: '-10%' }} />
                <PineTree className="w-72 h-auto text-black" style={{ left: '75%' }} />
            </TreeLayer>
            
            {/* Floating Particles */}
            <div className="absolute inset-0" style={{ zIndex: 35 }}>
                {[...Array(60)].map((_, i) => (
                    <div key={i} className="absolute bottom-0 rounded-full bg-emerald-400" style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animation: `float-spores ${Math.random() * 8 + 6}s linear infinite`,
                        animationDelay: `${Math.random() * 8}s`,
                        boxShadow: '0 0 10px #6ee7b7, 0 0 15px #6ee7b7',
                        filter: 'blur(1px)',
                    }}/>
                ))}
            </div>

            {/* Title */}
            <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ animation: 'title-glow-fade-in 2s ease-out 3s forwards', opacity: 0, zIndex: 40 }}
            >
                <div className="text-center">
                    <h1 className="text-5xl sm:text-7xl font-black text-white" style={{ textShadow: '0 0 20px rgba(110, 231, 183, 0.8), 0 0 35px rgba(16, 185, 129, 0.6)' }}>
                        Van<span className="text-emerald-300">Raksha</span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
  );
};

export default IntroAnimation;