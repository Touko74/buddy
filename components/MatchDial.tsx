const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function MatchDial({ score, size = 118 }: { score: number; size?: number }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE + 20 * (1 - score / 100);
  // légère marge (20) reprise de la maquette pour que le trait ne se referme jamais totalement à 100%

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 118 118" className="-rotate-90">
        <circle cx="59" cy="59" r={RADIUS} fill="none" strokeWidth="8" className="stroke-bg-elevated-2" />
        <circle
          cx="59"
          cy="59"
          r={RADIUS}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className="dial-fill stroke-accent"
          style={{ ["--dial-offset" as string]: offset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold text-accent">{score}%</span>
        <span className="font-mono text-[9px] tracking-wider text-text-faint">MATCH</span>
      </div>
    </div>
  );
}
