"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  intro?: string;
  bg?: string;
  titleColor?: string;
  ink?: string;
  art?: ReactNode;
  children?: ReactNode;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Cabeçalho padrão das sub-páginas: título entra palavra por palavra. */
export function PageHero({ kicker, title, intro, bg = "#FFCB05", titleColor = "#E30613", ink = "#3B1A0E", art, children }: Props) {
  const words = title.split(" ");
  return (
    <section className="relative overflow-hidden pb-20 pt-36" style={{ background: bg, color: ink }}>
      <div className="bg-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="label-caps text-2xl opacity-80"
          >
            {kicker}
          </motion.p>
          <h1 className="font-round text-6xl font-extrabold italic leading-[0.9] md:text-8xl" style={{ color: titleColor }}>
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 pr-[0.22em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 8 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-6 max-w-xl text-xl font-semibold opacity-85"
            >
              {intro}
            </motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
              {children}
            </motion.div>
          )}
        </div>
        {art && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 }}
          >
            {art}
          </motion.div>
        )}
      </div>
    </section>
  );
}
