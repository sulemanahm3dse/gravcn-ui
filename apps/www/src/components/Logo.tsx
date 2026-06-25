import React from 'react';

export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path d="M16 2L2 9.5V22.5L16 30L30 22.5V9.5L16 2Z" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 9.5L16 17L30 9.5" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 30V17" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 13.5V20.5L16 24V17L10 13.5Z" className="fill-foreground opacity-20" />
      <path d="M22 13.5V20.5L16 24V17L22 13.5Z" className="fill-foreground opacity-40" />
      <path d="M16 17L10 13.5L16 10L22 13.5L16 17Z" className="fill-foreground" />
    </svg>
  );
}
