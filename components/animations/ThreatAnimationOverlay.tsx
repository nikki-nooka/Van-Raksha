import React from 'react';

// --- NEW & IMPROVED ANIMATIONS ---

const WildfireAnimation = () => (
    <div className="absolute inset-0 overflow-hidden bg-slate-900" style={{ filter: 'url(#heat-distortion)' }}>
        {/* Background pulsating glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-600 to-amber-600 opacity-60" style={{animation: 'inferno-flicker 1s infinite alternate'}}/>

        {/* Ember Storm */}
        {[...Array(150)].map((_, i) => (
            <div 
                key={i} 
                className="absolute bottom-0 rounded-full bg-amber-300" 
                style={{
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 8 + 2}px`,
                    height: `${Math.random() * 8 + 2}px`,
                    animation: `ember-storm ${Math.random() * 3 + 2}s linear infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                    boxShadow: `0 0 15px 5px #f97316`,
                    filter: 'blur(1px)'
                }}
            />
        ))}

        {/* Foreground Flames using SVG for more organic shapes */}
        <svg viewBox="0 0 500 200" className="absolute bottom-0 w-full h-1/2">
             <path d="M 0 200 C 50 150, 100 50, 150 200 C 200 100, 250 120, 300 200 C 350 80, 400 150, 500 200 Z" fill="#f97316" opacity="0.8" style={{animation: 'inferno-flicker 1.5s infinite alternate'}} />
             <path d="M 0 200 C 80 80, 120 180, 200 150 C 250 120, 300 180, 400 100 C 450 150, 480 50, 500 200 Z" fill="#ea580c" opacity="0.9" style={{animation: 'inferno-flicker 1s infinite alternate-reverse'}}/>
        </svg>
    </div>
);

const FloodAnimation = () => (
    <div className="absolute inset-0 overflow-hidden bg-sky-900/80" style={{ animation: 'flood-surge 3s cubic-bezier(0.25, 1, 0.5, 1) forwards' }}>
        <div className="absolute inset-0 w-full h-full">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute inset-0" style={{ animation: `wave-move ${6 + i * 2}s linear infinite`, opacity: 0.5 + i * 0.2 }}>
                    <svg viewBox="0 0 2000 300" className="w-[200%] h-full">
                        <path d="M 0 150 C 500 50, 500 250, 1000 150 S 1500 250, 2000 150 V 300 H 0 Z" fill={i === 2 ? '#0369a1' : '#075985'}/>
                    </svg>
                </div>
            ))}
             {/* Debris */}
            {[...Array(20)].map((_, i) => (
                <div key={i} className="absolute w-4 h-2 bg-yellow-900/80 rounded" style={{
                    top: `${Math.random() * 100}%`,
                    animation: `debris-float ${4 + Math.random() * 4}s linear infinite`,
                    animationDelay: `${Math.random()}s`,
                    opacity: 0.7
                }} />
            ))}
        </div>
    </div>
);


const TornadoAnimation = () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-800/80">
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-80" style={{animation: `tornado-chaos-spin 8s linear infinite`}}>
             <defs>
                <linearGradient id="funnel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>
            </defs>
            {[...Array(8)].map((_,i) => (
                <path key={i} d="M 100,0 C 80,50 120,150 100,200" stroke="url(#funnel-grad)" strokeWidth="10" fill="none"
                    style={{
                        transformOrigin: 'center',
                        transform: `rotate(${i * 45}deg) scaleY(1.5)`,
                        opacity: 0.5
                    }}
                />
            ))}
             {[...Array(200)].map((_, i) => (
                <circle key={i} fill="#d1d5db" r={`${Math.random() * 1.5 + 0.5}`} >
                    <animateMotion dur={`${0.5 + Math.random()}s`} repeatCount="indefinite" path={`M 100,180 C ${50 + Math.random() * 100},150 ${50 + Math.random() * 100},50 100,0`} />
                </circle>
            ))}
        </svg>
    </div>
);

const EarthquakeAnimation = () => (
    <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full">
            <path 
                d="M 0,50 L 40,60 60,30 100,80 140,20 180,90 200,40 M 200,120 L 150,110 130,160 80,100 40,150 20,90 0,130" 
                stroke="white" strokeWidth="3" fill="none"
                strokeDasharray="1" strokeDashoffset="1"
                style={{ animation: 'screen-crack-anim 0.4s linear forwards 0.1s', filter:'drop-shadow(0 0 5px white)'}}
            />
        </svg>
    </div>
);

const VolcanicEruptionAnimation = () => (
    <div className="absolute inset-0 overflow-hidden bg-slate-900/50" style={{ animation: 'volcano-erupt-shake 0.3s infinite linear' }}>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-red-900/50 to-transparent" />
        <svg viewBox="0 0 200 200" className="absolute inset-0">
            <path d="M 0,200 L 80,80 Q 100,60 120,80 L 200,200 Z" fill="#1e293b"/>
        </svg>
        {[...Array(50)].map((_, i) => (
             <div key={i} className="absolute bottom-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full"
                style={{
                    filter: 'blur(4px)',
                    boxShadow: '0 0 15px 8px #f97316',
                    animation: `lava-bomb-arc ${1 + Math.random() * 1.5}s ease-out forwards`,
                    transform: `translateX(-50%) rotate(${Math.random() * 140 - 70}deg)`,
                    transformOrigin: '50% 100%',
                    animationDelay: `${Math.random() * 1.5}s`
                }}
             />
        ))}
    </div>
);

const LandslideAnimation = () => (
    <div className="absolute inset-0 overflow-hidden bg-yellow-900/50">
        <div className="absolute w-full h-full" style={{
            animation: 'landslide-tumble 1s ease-in forwards',
        }}>
            {[...Array(250)].map((_, i) => (
                <div key={i} className="absolute top-0 rounded"
                    style={{
                        left: `${Math.random() * 110 - 5}%`,
                        top: `${Math.random() * 50 - 100}%`,
                        width: `${Math.random() * 50 + 20}px`,
                        height: `${Math.random() * 50 + 20}px`,
                        background: `rgb(${80 + Math.random() * 20}, ${50 + Math.random() * 20}, ${30 + Math.random() * 10})`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                />
            ))}
        </div>
    </div>
);

// --- Main Component ---
interface ThreatAnimationOverlayProps {
    threatType: string;
}

const ThreatAnimationOverlay: React.FC<ThreatAnimationOverlayProps> = ({ threatType }) => {
    
    const renderAnimation = () => {
        switch (threatType) {
            case 'Flood': return <FloodAnimation />;
            case 'Wildfire': return <WildfireAnimation />;
            case 'Tornado': return <TornadoAnimation />;
            case 'Earthquake': return <EarthquakeAnimation />;
            case 'Volcanic Eruption': return <VolcanicEruptionAnimation />;
            case 'Landslide': return <LandslideAnimation />;
            default: return null;
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ animation: 'fadeOut 0.5s ease-out 3s forwards' }}
        >
            {renderAnimation()}
        </div>
    );
};

export default ThreatAnimationOverlay;