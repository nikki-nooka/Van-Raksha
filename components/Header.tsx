import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                 <svg className="w-8 h-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m4.5 9c0 2.485-2.015 4.5-4.5 4.5S7.5 14.485 7.5 12 9.515 7.5 12 7.5s4.5 2.015 4.5 4.5z" />
                </svg>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Van<span className="text-emerald-500">Raksha</span>
                </h1>
            </div>
            {/* Can add nav links here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
