import Link from "next/link";
import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "red" | "choco" | "yellow"; external?: boolean };

const styles = {
  red: "bg-garoto-red text-white shadow-[0_6px_0_#8f0009] active:shadow-[0_1px_0_#8f0009]",
  choco: "bg-choco text-cream shadow-[0_6px_0_#1c0b05] active:shadow-[0_1px_0_#1c0b05]",
  yellow: "bg-garoto-yellow text-choco shadow-[0_6px_0_#c79a00] active:shadow-[0_1px_0_#c79a00]",
};

export function Button({ href, children, variant = "red", external }: Props) {
  const cls = `label-caps inline-flex items-center gap-3 rounded-full px-7 py-4 text-xl transition-transform duration-300 ease-[var(--ease-pop)] hover:-translate-y-1 active:translate-y-1 ${styles[variant]}`;
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children} <span aria-hidden>↗</span>
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children} <span aria-hidden>→</span>
    </Link>
  );
}
