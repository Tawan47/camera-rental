export default function HeroSilhouette() {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-sky-900/[0.05]"
      aria-hidden="true"
    >
      {/* DSLR-style camera body */}
      <g transform="translate(120, 190)">
        <rect x="0" y="20" width="220" height="130" rx="14" fill="currentColor" />
        <rect x="20" y="-10" width="90" height="40" rx="8" fill="currentColor" />
        <circle cx="150" cy="85" r="58" fill="currentColor" />
        <circle cx="150" cy="85" r="38" fill="white" className="opacity-100" />
        <circle cx="150" cy="85" r="38" fill="none" />
        <rect x="24" y="36" width="30" height="18" rx="4" fill="white" />
      </g>

      {/* Prime lens */}
      <g transform="translate(430, 210)">
        <rect x="0" y="30" width="150" height="90" rx="10" fill="currentColor" />
        <rect x="140" y="18" width="60" height="114" rx="10" fill="currentColor" />
        <circle cx="170" cy="75" r="46" fill="currentColor" />
        <circle cx="170" cy="75" r="30" fill="white" />
      </g>

      {/* Mirrorless camera */}
      <g transform="translate(700, 200)">
        <rect x="0" y="20" width="190" height="110" rx="12" fill="currentColor" />
        <rect x="60" y="-6" width="70" height="30" rx="6" fill="currentColor" />
        <circle cx="130" cy="75" r="44" fill="currentColor" />
        <circle cx="130" cy="75" r="28" fill="white" />
      </g>

      {/* Tripod legs */}
      <g transform="translate(950, 180)" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
        <line x1="60" y1="0" x2="10" y2="150" />
        <line x1="60" y1="0" x2="60" y2="160" />
        <line x1="60" y1="0" x2="110" y2="150" />
        <circle cx="60" cy="0" r="16" fill="currentColor" stroke="none" />
      </g>

      {/* Zoom lens */}
      <g transform="translate(30, 260)">
        <rect x="0" y="10" width="130" height="46" rx="8" fill="currentColor" />
        <rect x="120" y="0" width="34" height="66" rx="6" fill="currentColor" />
      </g>
    </svg>
  );
}
