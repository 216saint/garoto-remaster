"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Todos");
  const list = cat === "Todos" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorias">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`label-caps relative rounded-full border-2 border-choco px-5 py-2.5 text-lg transition-colors ${
              cat === c ? "text-garoto-yellow" : "text-choco hover:bg-choco/5"
            }`}
          >
            {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-choco" />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
