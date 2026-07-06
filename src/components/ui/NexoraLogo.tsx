import { SVGProps } from "react";

export function NexoraLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="helix-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" /> {/* red-500 */}
          <stop offset="100%" stopColor="#ea580c" /> {/* orange-600 */}
        </linearGradient>
        
        <linearGradient id="helix-right" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" /> {/* rose-500 */}
          <stop offset="100%" stopColor="#f97316" /> {/* orange-500 */}
        </linearGradient>

        <filter id="helix-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Left-to-Right Sweeping Ribbon */}
      <path
        d="M 15 30 C 50 30, 50 85, 85 85 L 85 65 C 50 65, 50 10, 15 10 Z"
        fill="url(#helix-left)"
        filter="url(#helix-glow)"
      />
      
      {/* Right-to-Left Sweeping Ribbon */}
      <path
        d="M 85 30 C 50 30, 50 85, 15 85 L 15 65 C 50 65, 50 10, 85 10 Z"
        fill="url(#helix-right)"
        opacity="0.95"
        style={{ mixBlendMode: 'hard-light' }}
      />
    </svg>
  );
}
