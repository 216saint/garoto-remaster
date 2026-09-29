type Props = { className?: string; title?: string };

/** Selo Garoto redesenhado em SVG (substitua por /assets/brand/logo-garoto.svg oficial se preferir). */
export function Logo({ className, title = "Garoto" }: Props) {
  return (
    <svg viewBox="0 0 160 64" className={className} role="img" aria-label={title}>
      <ellipse cx="80" cy="32" rx="78" ry="30" fill="#E30613" />
      <ellipse cx="80" cy="32" rx="72" ry="25" fill="none" stroke="#FFCB05" strokeWidth="2.5" />
      <text
        x="80"
        y="43"
        textAnchor="middle"
        fontFamily="'Baloo 2', sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="34"
        fill="#fff"
        letterSpacing="-0.5"
      >
        Garoto
      </text>
    </svg>
  );
}
