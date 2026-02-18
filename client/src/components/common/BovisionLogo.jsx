import React from 'react';

const BovisionLogo = ({ size = 'md', showTagline = false, collapsed = false }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', tagline: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', tagline: 'text-xs' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark */}
      <div className={`${s.icon} bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-[60%] h-[60%]" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="10" r="6" />
          <circle cx="10" cy="9" r="1" fill="white" stroke="none" />
          <circle cx="14" cy="9" r="1" fill="white" stroke="none" />
          <path d="M5.5 6.5L3 4" />
          <path d="M18.5 6.5L21 4" />
          <path d="M9 14.5C9 14.5 10.5 16 12 16C13.5 16 15 14.5 15 14.5" />
          <path d="M8 20L10 16" />
          <path d="M16 20L14 16" />
        </svg>
      </div>

      {/* Text */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${s.text} text-gray-900 dark:text-white tracking-tight whitespace-nowrap`}>
            Bovision AI
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
    </div>
  );
};

export default BovisionLogo;
