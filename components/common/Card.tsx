import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-slate-900/60 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;