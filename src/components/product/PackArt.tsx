import Image from "next/image";
import type { Palette, Product } from "@/data/products";

type Props = {
  name: string;
  subtitle?: string;
  kind: Product["category"];
  palette: Palette;
  image?: string;
  className?: string;
};

/**
 * Ilustração vetorial da embalagem. Usada enquanto os packshots oficiais
 * (PNG sem fundo) não são adicionados em /public/assets/products.
 */
export function PackArt({ name, subtitle, kind, palette, image, className }: Props) {
  if (image) {
    return <Image src={image} alt={name} width={640} height={640} className={`object-contain ${className ?? ""}`} />;
  }
  const { pack, accent, ink } = palette;
  const id = `g-${name.replace(/\W/g, "")}-${kind}`;
  const label = (x: number, y: number, baseSize: number, rotate = 0) => {
    // nomes longos encolhem para caber inteiros na embalagem
    const size = baseSize * Math.min(1, 9 / name.length);
    return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <text
        textAnchor="middle"
        fontFamily="'Baloo 2', sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize={size}
        fill={ink}
        stroke={pack}
        strokeWidth={size * 0.06}
        paintOrder="stroke"
      >
        {name}
      </text>
      {subtitle && (
        <text
          y={size * 0.62}
          textAnchor="middle"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={size * 0.42}
          letterSpacing="1"
          fill={ink}
          opacity={0.9}
        >
          {subtitle.toUpperCase()}
        </text>
      )}
    </g>
    );
  };
  const badge = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={r * 1.5} ry={r} fill="#E30613" stroke="#fff" strokeWidth={3} />
      <text textAnchor="middle" y={r * 0.35} fontFamily="'Baloo 2', sans-serif" fontWeight={800} fontStyle="italic" fontSize={r * 0.95} fill="#fff">
        Garoto
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={name}>
      <defs>
        <linearGradient id={`${id}-shine`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#3B1A0E" floodOpacity="0.35" />
        </filter>
      </defs>

      {kind === "Snacks" && (
        <g filter={`url(#${id}-shadow)`} transform="rotate(-18 200 200)">
          <path d="M40 170 l-18 -10 l0 80 l18 -10 Z M360 170 l18 -10 l0 80 l-18 -10 Z" fill="#cfcfd6" />
          <rect x="40" y="160" width="320" height="80" rx="40" fill={pack} />
          <path d="M40 200 q30 -26 60 0 t60 0 t60 0 t60 0 t80 0 v40 H40z" fill={accent} opacity="0.9" />
          <rect x="40" y="160" width="320" height="80" rx="40" fill={`url(#${id}-shine)`} />
          {label(200, 205, 50)}
        </g>
      )}

      {kind === "Tabletes" && (
        <g filter={`url(#${id}-shadow)`} transform="rotate(-8 200 200)">
          <rect x="70" y="60" width="260" height="280" rx="14" fill={pack} />
          <path d="M70 250 h260 v76 a14 14 0 0 1 -14 14 H84 a14 14 0 0 1 -14 -14z" fill={accent} />
          <path d="M70 82 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10 l14 -10 l14 10" stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" />
          <rect x="70" y="60" width="260" height="280" rx="14" fill={`url(#${id}-shine)`} />
          {badge(200, 118, 26)}
          {label(200, 205, 46)}
        </g>
      )}

      {kind === "Bombons" && (
        <g filter={`url(#${id}-shadow)`}>
          <path d="M92 200 L28 150 Q40 200 28 250 Z" fill={accent} />
          <path d="M308 200 L372 150 Q360 200 372 250 Z" fill={accent} />
          <ellipse cx="200" cy="200" rx="118" ry="96" fill={pack} />
          <ellipse cx="200" cy="200" rx="118" ry="96" fill={`url(#${id}-shine)`} />
          <path d="M110 240 q90 40 180 0" stroke={accent} strokeWidth="10" fill="none" strokeLinecap="round" />
          {label(200, 212, 44)}
        </g>
      )}

      {kind === "Caixas" && (
        <g filter={`url(#${id}-shadow)`}>
          <path d="M60 130 L200 80 L340 130 L200 180Z" fill={accent} />
          <path d="M60 130 L200 180 L200 340 L60 290Z" fill={pack} />
          <path d="M340 130 L200 180 L200 340 L340 290Z" fill={pack} style={{ filter: "brightness(0.85)" }} />
          <path d="M60 130 L200 180 L200 340 L60 290Z" fill={`url(#${id}-shine)`} />
          <g transform="matrix(1 0.36 0 1 0 0)">{badge(130, 145, 20)}</g>
          <g transform="matrix(1 -0.36 0 1 0 0)">{label(270, 350, 30)}</g>
          <circle cx="130" cy="265" r="16" fill="#7A3E1D" stroke="#fff" strokeWidth="3" />
          <circle cx="165" cy="275" r="12" fill="#C8102E" stroke="#fff" strokeWidth="3" />
          <circle cx="100" cy="245" r="10" fill="#0067B1" stroke="#fff" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
}
