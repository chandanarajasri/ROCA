import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic pull distance
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;

    setPosition({ x: deltaX, y: deltaY });

    // Relative glow coordinate in percent
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: gx, y: gy });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold text-sm px-7 py-3.5 rounded-xl transition-transform duration-200 ease-out select-none cursor-pointer overflow-hidden group shadow-lg';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.85)] border border-indigo-400/40',
    secondary:
      'bg-slate-900/80 text-slate-200 border border-slate-700/80 hover:border-indigo-500/60 shadow-[0_0_20px_rgba(0,0,0,0.4)]',
    glass:
      'web3-glass text-white border border-white/20 hover:border-purple-400/60 shadow-[0_0_30px_rgba(168,85,247,0.3)]',
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Radial glow spotlight following cursor */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(circle 80px at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.35), transparent 80%)`,
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 tracking-wide font-semibold text-white group-hover:scale-105 transition-transform duration-200">
        {children}
      </span>
    </button>
  );
};
