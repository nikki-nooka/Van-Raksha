import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-lg border border-slate-200/80 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
