export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden py-5 ${className}`} aria-hidden>
      <div className="animate-marquee flex w-max gap-10">
        {row.map((t, i) => (
          <span key={i} className="label-caps flex items-center gap-10 text-4xl md:text-5xl">
            {t}
            <svg viewBox="0 0 24 24" className="size-7 fill-current opacity-70">
              <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
