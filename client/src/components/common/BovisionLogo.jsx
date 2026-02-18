import React from 'react';
import { motion } from 'framer-motion';

const BovisionLogo = ({ size = 'md', showTagline = false, collapsed = false, animate = true }) => {
  const sizes = {
    sm: { icon: 36, text: 'text-lg', tagline: 'text-[9px]', gap: 'gap-2' },
    md: { icon: 40, text: 'text-xl', tagline: 'text-[10px]', gap: 'gap-2.5' },
    lg: { icon: 48, text: 'text-2xl', tagline: 'text-xs', gap: 'gap-3' },
    xl: { icon: 56, text: 'text-3xl', tagline: 'text-sm', gap: 'gap-3' },
  };

  const s = sizes[size] || sizes.md;
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 } } : {};

  return (
    <Wrapper className={`flex items-center ${s.gap}`} {...wrapperProps}>
      {/* Bovine head icon with digital eye */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="bovision-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="bovision-green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="bovision-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#bovision-bg)" />

        {/* Horns */}
        <path
          d="M14 18C10 12 8 10 6 11C4.5 12 6 15 10 20"
          stroke="url(#bovision-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 18C54 12 56 10 58 11C59.5 12 58 15 54 20"
          stroke="url(#bovision-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ears */}
        <path
          d="M15 22C12 19 11 21 13 25"
          stroke="url(#bovision-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M49 22C52 19 53 21 51 25"
          stroke="url(#bovision-blue)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Head shape */}
        <path
          d="M16 24C16 20 20 16 32 16C44 16 48 20 48 24V34C48 42 42 48 32 48C22 48 16 42 16 34V24Z"
          fill="url(#bovision-blue)"
          opacity="0.15"
          stroke="url(#bovision-blue)"
          strokeWidth="1.5"
        />

        {/* Digital eye - left */}
        <g>
          <path
            d="M20 28C20 28 24 24 28 28C24 32 20 28 20 28Z"
            fill="url(#bovision-green)"
            opacity="0.3"
          />
          <circle cx="24" cy="28" r="2.5" fill="url(#bovision-green)" />
          <circle cx="24" cy="28" r="1" fill="white" opacity="0.9" />
          {/* Scan lines */}
          <line x1="20" y1="28" x2="28" y2="28" stroke="url(#bovision-green)" strokeWidth="0.5" opacity="0.5" />
          <line x1="24" y1="24.5" x2="24" y2="31.5" stroke="url(#bovision-green)" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Digital eye - right */}
        <g>
          <path
            d="M36 28C36 28 40 24 44 28C40 32 36 28 36 28Z"
            fill="url(#bovision-green)"
            opacity="0.3"
          />
          <circle cx="40" cy="28" r="2.5" fill="url(#bovision-green)" />
          <circle cx="40" cy="28" r="1" fill="white" opacity="0.9" />
          {/* Scan lines */}
          <line x1="36" y1="28" x2="44" y2="28" stroke="url(#bovision-green)" strokeWidth="0.5" opacity="0.5" />
          <line x1="40" y1="24.5" x2="40" y2="31.5" stroke="url(#bovision-green)" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Nose / muzzle */}
        <ellipse cx="32" cy="40" rx="7" ry="5" fill="url(#bovision-blue)" opacity="0.2" stroke="url(#bovision-blue)" strokeWidth="1" />
        <circle cx="29" cy="40" r="1.2" fill="url(#bovision-blue)" opacity="0.5" />
        <circle cx="35" cy="40" r="1.2" fill="url(#bovision-blue)" opacity="0.5" />

        {/* Circuit / digital lines on forehead */}
        <line x1="32" y1="18" x2="32" y2="23" stroke="url(#bovision-green)" strokeWidth="0.8" opacity="0.4" />
        <line x1="28" y1="20" x2="32" y2="23" stroke="url(#bovision-green)" strokeWidth="0.8" opacity="0.4" />
        <line x1="36" y1="20" x2="32" y2="23" stroke="url(#bovision-green)" strokeWidth="0.8" opacity="0.4" />
        <circle cx="32" cy="23" r="1.2" fill="url(#bovision-green)" opacity="0.6" />
      </svg>

      {/* Text */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${s.text} tracking-tight whitespace-nowrap`}>
            <span className="bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-300">
              Bovision
            </span>
            {' '}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-300 bg-clip-text text-transparent">
              AI
            </span>
          </span>
          {showTagline && (
            <span
              className={`${s.tagline} text-gray-400 dark:text-gray-500 tracking-wide mt-0.5 whitespace-nowrap`}
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              पशु दृष्टि बुद्धिः
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default BovisionLogo;
