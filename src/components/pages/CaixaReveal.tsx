"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { PackArt } from "../product/PackArt";
import { getProduct } from "@/data/products";

const inside = ["serenata-de-amor", "crocante", "caribe", "opereta", "mundy", "baton"].map((s) => getProduct(s)!);

/** Caixa que abre a tampa e solta os bombons quando entra na tela. */
export function CaixaReveal() {
  return (
    <motion.div initial="closed" whileInView="open" viewport={{ once: true, amount: 0.4 }} className="relative mx-auto max-w-5xl">
      <div className="relative mx-auto h-40 w-full max-w-2xl [perspective:900px]">
        <motion.div
          variants={{ closed: { rotateX: 0 }, open: { rotateX: -115 } }}
          transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
          style={{ transformOrigin: "50% 0%" }}
          className="absolute inset-x-0 top-0 z-10 grid h-24 place-items-center rounded-t-3xl bg-garoto-yellow shadow-[0_8px_0_#c79a00]"
        >
          <span className="font-round text-4xl font-extrabold italic text-garoto-red [backface-visibility:hidden]">Garoto</span>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-28 rounded-b-3xl bg-garoto-red" />
      </div>
      <ul className="relative z-20 -mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {inside.map((p, i) => (
          <motion.li
            key={p.slug}
            variants={{ closed: { y: 120, opacity: 0, scale: 0.4 }, open: { y: 0, opacity: 1, scale: 1 } }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.7 + i * 0.09 }}
          >
            <Link
              href={`/produtos/${p.slug}/`}
              className="group flex flex-col items-center rounded-[28px] p-5 transition-transform duration-500 hover:-translate-y-2"
              style={{ background: p.palette.bg }}
            >
              <PackArt name={p.name} kind={p.category} palette={p.palette} className="size-36 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
              <span className="font-round text-2xl font-extrabold italic">{p.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
