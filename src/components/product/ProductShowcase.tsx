"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/data/products";
import { PackArt } from "./PackArt";
import { Reveal } from "../Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductShowcase({ product }: { product: Product }) {
  const [vi, setVi] = useState(0);
  const v = product.variations[vi];
  const titleColor = v.palette.pack === "#FFCB05" || v.palette.pack === "#FFB800" ? "#E30613" : v.palette.pack;

  return (
    <>
      {/* ——— Card principal ——— */}
      <section className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <nav aria-label="Trilha" className="label-caps mb-5 flex gap-2 text-base text-choco/60">
          <Link href="/produtos/" className="link-sweep hover:text-choco">Produtos</Link>
          <span>/</span>
          <span className="text-choco">{product.name}</span>
        </nav>

        <motion.article
          animate={{ backgroundColor: v.palette.bg }}
          transition={{ duration: 0.6 }}
          className="relative grid overflow-hidden rounded-[40px] md:grid-cols-[1.1fr_1fr]"
        >
          <div className="bg-dots absolute inset-0 opacity-70" aria-hidden />
          <div className="relative aspect-square md:aspect-auto md:min-h-[560px]">
            <motion.div
              key={`disc-${v.id}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease }}
              className="absolute left-1/2 top-1/2 size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: `radial-gradient(circle at 35% 30%, ${v.palette.accent}, ${v.palette.pack})` }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 60, rotate: -10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, rotate: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="absolute inset-0 grid place-items-center p-8"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="size-full"
                >
                  <PackArt
                    name={product.name}
                    subtitle={v.name.replace(product.name, "").trim() || v.format}
                    kind={product.category}
                    palette={v.palette}
                    image={v.image ?? product.image}
                    className="size-full"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex flex-col justify-center gap-5 p-8 md:p-12">
            <span className="label-caps w-fit rounded-full bg-choco px-3 py-1.5 text-base text-cream">{product.category}</span>
            <motion.h1
              animate={{ color: titleColor }}
              className="font-round text-5xl font-extrabold italic leading-[0.9] md:text-7xl"
            >
              {product.name}
            </motion.h1>
            <p className="font-round text-2xl font-semibold leading-snug text-choco">{product.tagline}</p>
            <p className="text-lg text-choco/75">{product.description}</p>
            <dl className="mt-2 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/55 p-4 backdrop-blur">
                <dt className="label-caps text-sm text-choco/60">Variação</dt>
                <AnimatePresence mode="wait">
                  <motion.dd key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-bold">
                    {v.name}
                  </motion.dd>
                </AnimatePresence>
              </div>
              <div className="rounded-2xl bg-white/55 p-4 backdrop-blur">
                <dt className="label-caps text-sm text-choco/60">Formato</dt>
                <AnimatePresence mode="wait">
                  <motion.dd key={v.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-bold">
                    {v.format}
                  </motion.dd>
                </AnimatePresence>
              </div>
            </dl>
            {v.note && <p className="text-sm font-semibold text-choco/60">{v.note}</p>}
          </div>
        </motion.article>
      </section>

      {/* ——— Descricionário ——— */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6" aria-labelledby="glossario">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-choco pb-4">
          <h2 id="glossario" className="label-caps text-6xl md:text-8xl">Descricionário</h2>
          <p className="max-w-xs font-semibold text-choco/70">
            Tudo o que você precisa saber sobre {product.name}, verbete por verbete.
          </p>
        </Reveal>
        <dl>
          {product.glossary.map((g, i) => (
            <Reveal key={g.term} delay={i * 0.05} y={20} className="group grid gap-2 border-b-2 border-choco/15 py-6 transition-colors md:grid-cols-[1fr_2fr] md:items-baseline">
              <dt className="flex items-baseline gap-6">
                <span className="label-caps w-10 text-xl text-garoto-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-round text-3xl font-extrabold italic transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {g.term}
                </span>
              </dt>
                <dd className="text-lg text-choco/80">{g.definition}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ——— Mostruário ——— */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6" aria-labelledby="mostruario">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-caps text-xl text-garoto-blue">Mostruário</p>
            <h2 id="mostruario" className="font-round text-5xl font-extrabold italic leading-none text-garoto-red md:text-6xl">
              Todas as variações
            </h2>
          </div>
          <p className="font-semibold text-choco/70">Toque em uma variação para ver no card principal.</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {product.variations.map((item, i) => {
            const selected = i === vi;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease }}
              >
                  <button
                    type="button"
                    onClick={() => {
                      setVi(i);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-pressed={selected}
                    className={`group relative block w-full overflow-hidden rounded-[28px] p-4 text-left transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 ${
                      selected ? "ring-4 ring-choco ring-offset-4 ring-offset-cream" : ""
                    }`}
                    style={{ background: item.palette.bg }}
                  >
                    <div className="relative aspect-square">
                      <div
                        className="absolute inset-[12%] rounded-full transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `radial-gradient(circle at 35% 30%, ${item.palette.accent}, ${item.palette.pack})` }}
                      />
                      <PackArt
                        name={product.name}
                        kind={product.category}
                        palette={item.palette}
                        image={item.image}
                        className="relative size-full transition-transform duration-500 ease-[var(--ease-pop)] group-hover:-rotate-6 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-round text-xl font-extrabold italic leading-tight">{item.name}</p>
                    <p className="label-caps mt-1 text-base text-choco/60">{item.format}</p>
                    {selected && (
                      <motion.span
                        layoutId="variation-flag"
                        className="label-caps absolute right-3 top-3 rounded-full bg-choco px-2.5 py-1 text-sm text-cream"
                      >
                        No card
                      </motion.span>
                    )}
                  </button>
              </motion.li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
