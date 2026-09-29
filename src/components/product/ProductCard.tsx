"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Product } from "@/data/products";
import { PackArt } from "./PackArt";

export function ProductCard({ product }: { product: Product }) {
  const { palette } = product;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 });
  const packX = useSpring(useTransform(mx, [0, 1], [-14, 14]), { stiffness: 150, damping: 16 });

  return (
    <motion.div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", background: palette.bg }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group relative h-full overflow-hidden rounded-[32px] shadow-[inset_0_0_0_3px_rgb(59_26_14/0.08)]"
      >
        <Link href={`/produtos/${product.slug}/`} className="flex h-full flex-col">
          {/* disco de cor da embalagem atrás do produto */}
          <div className="relative aspect-[5/4] overflow-hidden">
            <div
              className="absolute left-1/2 top-[58%] size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
              style={{ background: `radial-gradient(circle at 35% 30%, ${palette.accent}, ${palette.pack})` }}
            />
            <div className="bg-dots absolute inset-0 opacity-60" />
            <motion.div style={{ x: packX, translateZ: 60 }} className="absolute inset-0 grid place-items-center p-6">
              <PackArt
                name={product.name}
                kind={product.category}
                palette={palette}
                image={product.image}
                className="h-full w-full transition-transform duration-500 ease-[var(--ease-pop)] group-hover:-translate-y-3 group-hover:scale-105"
              />
            </motion.div>
            <span className="label-caps absolute left-4 top-4 rounded-full bg-choco px-3 py-1.5 text-sm text-cream">
              {product.category}
            </span>
            <span className="label-caps absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1.5 text-sm text-choco backdrop-blur">
              {product.variations.length} {product.variations.length > 1 ? "variações" : "variação"}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 px-6 pb-6 pt-2">
            <h3 className="font-round text-3xl font-extrabold italic leading-none" style={{ color: palette.pack === "#FFCB05" ? "#E30613" : palette.pack }}>
              {product.name}
            </h3>
            <p className="font-semibold text-choco/75">{product.tagline}</p>
            <span className="label-caps mt-auto flex items-center gap-2 pt-3 text-lg text-choco">
              Ver produto
              <span className="grid size-8 place-items-center rounded-full bg-choco text-cream transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
