'use client';

import './gradient-text.css';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

export default function GradientText({
  children,
  className = '',
  colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--primary))'],
  animationSpeed = 8,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}
