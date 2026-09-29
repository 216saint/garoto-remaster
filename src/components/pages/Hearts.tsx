"use client";

import { motion } from "motion/react";

/** Corações flutuando no fundo da página Serenata de Amor. */
export function Hearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute fill-white/25"
          style={{ left: `${(i * 71) % 100}%`, width: 16 + (i % 4) * 14 }}
          initial={{ y: "110vh", rotate: -20 }}
          animate={{ y: "-20vh", rotate: 20 }}
          transition={{ duration: 9 + (i % 5) * 2, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
        >
          <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" />
        </motion.svg>
      ))}
    </div>
  );
}
