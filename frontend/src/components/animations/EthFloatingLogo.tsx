import React from 'react';

interface EthFloatingLogoProps {
  size?: number;
  className?: string;
}

export const EthFloatingLogo: React.FC<EthFloatingLogoProps> = ({
  size = 110,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow pulse */}
      <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-600/40 via-purple-500/30 to-cyan-400/40 blur-2xl animate-pulse pointer-events-none" />

      {/* Floating 3D-styled Ethereum Crystal */}
      <div className="relative animate-float-slow animate-pulse-eth">
        <svg
          width={size}
          height={size * 1.55}
          viewBox="0 0 256 397"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_15px_35px_rgba(99,102,241,0.6)]"
        >
          {/* Top Left Facet */}
          <path
            d="M128 0L125.2 9.5V270.5L128 273.3L256 197.8L128 0Z"
            fill="url(#eth-top-right)"
            fillOpacity="0.9"
          />
          {/* Top Right Facet */}
          <path
            d="M128 0L0 197.8L128 273.3V148.8V0Z"
            fill="url(#eth-top-left)"
            fillOpacity="0.75"
          />
          {/* Top Center-Right Facet */}
          <path
            d="M128 273.3L256 197.8L128 148.8V273.3Z"
            fill="url(#eth-mid-right)"
            fillOpacity="0.85"
          />
          {/* Top Center-Left Facet */}
          <path
            d="M128 273.3V148.8L0 197.8L128 273.3Z"
            fill="url(#eth-mid-left)"
            fillOpacity="0.6"
          />
          {/* Bottom Left Facet */}
          <path
            d="M128 296.8L126.4 298.8V392.2L128 396.9L256.1 221.4L128 296.8Z"
            fill="url(#eth-bot-right)"
            fillOpacity="0.95"
          />
          {/* Bottom Right Facet */}
          <path
            d="M128 396.9V296.8L0 221.4L128 396.9Z"
            fill="url(#eth-bot-left)"
            fillOpacity="0.75"
          />

          {/* Facet Gradients */}
          <defs>
            <linearGradient id="eth-top-right" x1="128" y1="0" x2="256" y2="273" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="0.5" stopColor="#6366F1" />
              <stop offset="1" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="eth-top-left" x1="0" y1="0" x2="128" y2="273" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C084FC" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="eth-mid-right" x1="128" y1="148" x2="256" y2="273" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="eth-mid-left" x1="0" y1="148" x2="128" y2="273" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8" />
              <stop offset="1" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="eth-bot-right" x1="128" y1="221" x2="256" y2="397" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="eth-bot-left" x1="0" y1="221" x2="128" y2="397" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating sparkles */}
        <div className="absolute -top-3 -right-3 text-cyan-300 text-xs animate-ping opacity-75">✦</div>
        <div className="absolute -bottom-2 -left-3 text-purple-400 text-sm animate-pulse opacity-80">✦</div>
      </div>
    </div>
  );
};
