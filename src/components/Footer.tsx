"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { footerColumns, sac, socials } from "@/data/site";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";

const ease = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const dripY = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);

  return (
    <footer ref={ref} className="relative mt-32 overflow-hidden bg-garoto-green text-white">
      {/* Borda de chocolate derretendo que "escorre" conforme a footer entra. */}
      <motion.svg
        style={{ y: dripY }}
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-px h-16 w-full text-cream"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 0h1440v28c-40 0-52 44-78 44s-30-40-66-40-44 58-80 58-36-54-78-54-40 30-72 30-38-38-80-38-50 46-86 46-40-40-76-40-44 22-78 22-36-36-72-36-42 52-80 52-38-44-74-44-46 30-82 30-40-34-76-34-44 48-82 48-38-40-74-40-44 26-80 26-34-30-66-30-44 42-82 42S58 30 0 30Z"
        />
      </motion.svg>

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-28">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="flex gap-5"
          >
            <Image
              src="/assets/brand/mascote-baton.png"
              alt="Mascote Garoto segurando um Baton"
              width={74}
              height={165}
              className="animate-bob h-36 w-auto shrink-0 drop-shadow-[0_8px_0_rgb(0_0_0/0.15)]"
            />
            <div>
              <p className="label-caps text-2xl text-garoto-yellow">{sac.title}</p>
              <ul className="mt-4 space-y-2 text-lg font-semibold">
                <li>
                  <a href={sac.phoneHref} className="link-sweep">{sac.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${sac.email}`} className="link-sweep text-base">{sac.email}</a>
                </li>
                <li>
                  <a href="https://twitter.com/sacgaroto" target="_blank" rel="noreferrer" className="link-sweep">
                    {sac.handle}
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {footerColumns.map((col, ci) => (
            <div key={col.title}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + ci * 0.08, ease }}
                className="label-caps text-2xl text-garoto-yellow"
              >
                {col.title}
              </motion.p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, li) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.18 + ci * 0.08 + li * 0.05, ease }}
                  >
                    <Link href={l.href} className="link-sweep text-[1.05rem] font-semibold text-white/90 hover:text-white">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t-2 border-white/30 pt-8">
          <Logo className="h-12 w-auto" />
          <ul className="flex gap-3">
            {socials.map((s, i) => (
              <motion.li
                key={s.key}
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.1 + i * 0.07 }}
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full bg-white text-garoto-green transition-transform duration-300 ease-[var(--ease-pop)] hover:-translate-y-1 hover:rotate-6 hover:scale-110 hover:bg-garoto-yellow hover:text-garoto-red"
                >
                  <SocialIcon name={s.key} className="size-5" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-wider text-white/80">
          <span>© {new Date().getFullYear()} Garoto. Todos os direitos reservados.</span>
          <Link href="/fale-conosco/#privacidade" className="link-sweep hover:text-white">Política de Privacidade</Link>
          <Link href="/fale-conosco/#termos" className="link-sweep hover:text-white">Termos e Condições</Link>
        </div>
      </div>

      <motion.p
        style={{ x: wordX }}
        className="label-caps pointer-events-none select-none whitespace-nowrap pb-4 text-center text-[22vw] leading-[0.8] text-white/10"
        aria-hidden
      >
        Feito de Brasil
      </motion.p>
    </footer>
  );
}
