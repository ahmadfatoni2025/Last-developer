type GlobeProps = {
  className?: string;
};

export function Globe({ className = '' }: GlobeProps) {
  return (
    <div className={`pointer-events-none relative aspect-square ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="globe-sphere" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#3b2a12" />
            <stop offset="45%" stopColor="#140f08" />
            <stop offset="100%" stopColor="#050403" />
          </radialGradient>
          <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globe-rim" cx="50%" cy="50%" r="50%">
            <stop offset="82%" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="96%" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx="200" cy="200" r="150" />
          </clipPath>
        </defs>

        <circle cx="200" cy="200" r="196" fill="url(#globe-glow)" />
        <circle cx="200" cy="200" r="150" fill="url(#globe-sphere)" />
        <circle cx="200" cy="200" r="150" fill="url(#globe-rim)" />

        <g clipPath="url(#globe-clip)" stroke="#fbbf24" strokeWidth="0.75" fill="none">
          <g
            className="animate-[spin_28s_linear_infinite]"
            style={{ transformOrigin: '200px 200px' }}
            opacity="0.5"
          >
            {[0.18, 0.38, 0.6, 0.82, 1].map((k) => (
              <ellipse key={`lon-${k}`} cx="200" cy="200" rx={150 * k} ry="150" />
            ))}
          </g>

          {[-105, -75, -45, -15, 15, 45, 75, 105].map((offset) => {
            const phi = Math.asin(offset / 150);
            const rx = 150 * Math.cos(phi);
            return (
              <ellipse
                key={`lat-${offset}`}
                cx="200"
                cy={200 + offset}
                rx={rx}
                ry={rx * 0.14}
                opacity="0.32"
              />
            );
          })}
        </g>

        <circle cx="200" cy="200" r="150" fill="none" stroke="#fbbf24" strokeOpacity="0.18" />
        <ellipse cx="158" cy="142" rx="46" ry="30" fill="#fde68a" opacity="0.05" />
      </svg>
    </div>
  );
}
