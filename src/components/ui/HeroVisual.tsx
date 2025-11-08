import React from "react";

type Props = {
  className?: string;
};

const HeroVisual: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background"></div>

      <svg className="absolute -left-20 -top-10 w-[110%] h-[120%] opacity-40" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hv-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2d95" />
            <stop offset="100%" stopColor="#7a4bff" />
          </linearGradient>
          <filter id="hv-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        <g filter="url(#hv-blur)">
          <path fill="url(#hv-grad)">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M421,60 C482,73 560,31 598,79 C636,127 634,222 583,269 C532,316 416,313 347,294 C278,275 185,262 152,206 C119,150 167,75 233,55 C299,35 360,47 421,60 Z;M442,47 C494,26 576,47 609,95 C642,143 625,211 572,254 C519,297 424,299 357,286 C290,273 175,258 143,206 C111,154 145,96 208,68 C271,40 390,68 442,47 Z;M421,60 C482,73 560,31 598,79 C636,127 634,222 583,269 C532,316 416,313 347,294 C278,275 185,262 152,206 C119,150 167,75 233,55 C299,35 360,47 421,60 Z"
            />
          </path>
        </g>

        <g fill="#ffffff" opacity="0.75">
          <circle cx="100" cy="120" r="2">
            <animate attributeName="cy" dur="6s" values="120;140;120" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="80" r="2.5">
            <animate attributeName="cy" dur="8s" values="80;100;80" repeatCount="indefinite" />
          </circle>
          <circle cx="420" cy="200" r="3">
            <animate attributeName="cy" dur="7s" values="200;180;200" repeatCount="indefinite" />
          </circle>
          <circle cx="680" cy="140" r="2">
            <animate attributeName="cy" dur="9s" values="140;160;140" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default HeroVisual;
