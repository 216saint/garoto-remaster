"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "motion/react";
import { socialPosts, type SocialPost } from "@/data/social";
import { socials } from "@/data/site";
import { SocialIcon } from "../SocialIcon";

const campaigns = ["Todos", "10 Milhas Garoto", "Feito de Brasil"] as const;

export function SocialCarousel() {
  const [filter, setFilter] = useState<(typeof campaigns)[number]>("Todos");
  const [active, setActive] = useState<SocialPost | null>(null);
  const [selected, setSelected] = useState(0);
  const posts = filter === "Todos" ? socialPosts : socialPosts.filter((p) => p.campaign === filter);

  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "center", dragFree: false }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect).on("reInit", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  useEffect(() => {
    embla?.reInit();
    embla?.scrollTo(0, true);
  }, [embla, filter]);

  useEffect(() => {
    const auto = embla?.plugins().autoplay;
    if (!auto) return;
    if (active) auto.stop();
    else auto.play();
  }, [embla, active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section className="relative overflow-hidden bg-garoto-yellow py-24" aria-labelledby="social-title">
      <div className="bg-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps text-xl text-garoto-blue">Siga a Garoto</p>
            <h2 id="social-title" className="font-round text-5xl font-extrabold italic leading-none text-garoto-red md:text-7xl">
              Tá rolando nas redes
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {socials.slice(0, 3).map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full bg-garoto-red text-white transition-transform duration-300 ease-[var(--ease-pop)] hover:-translate-y-1 hover:rotate-6"
              >
                <SocialIcon name={s.key} className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Campanhas">
          {campaigns.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`label-caps relative rounded-full px-5 py-2.5 text-lg transition-colors ${
                filter === c ? "text-white" : "text-choco hover:text-garoto-red"
              }`}
            >
              {filter === c && (
                <motion.span layoutId="social-chip" className="absolute inset-0 rounded-full bg-garoto-red" />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-10" ref={viewportRef}>
        <ul className="flex touch-pan-y py-8">
          {posts.map((post, i) => (
            <li key={post.id} className="min-w-0 shrink-0 grow-0 basis-[72%] px-3 sm:basis-[42%] md:basis-[30%] lg:basis-[24%]">
              <motion.button
                type="button"
                onClick={() => setActive(post)}
                aria-label={`Abrir post: ${post.title}`}
                animate={{ scale: i === selected ? 1 : 0.9, rotate: i === selected ? 0 : i % 2 ? 2 : -2 }}
                whileHover={{ scale: 1.04, rotate: 0, y: -10 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative block w-full overflow-hidden rounded-[28px] border-4 border-white bg-white text-left shadow-[0_18px_40px_-18px_rgb(59_26_14/0.55)]"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-gradient-to-t from-choco/90 to-choco/0 px-4 pb-4 pt-10 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                  <span className="label-caps text-lg leading-tight">{post.title}</span>
                  <SocialIcon name={post.network} className="size-5 shrink-0" />
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6">
        <div className="flex gap-1.5" aria-hidden>
          {posts.map((p, i) => (
            <span
              key={p.id}
              className={`h-2 rounded-full transition-all duration-500 ${i === selected ? "w-8 bg-garoto-red" : "w-2 bg-choco/25"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Anterior" className="grid size-12 place-items-center rounded-full border-2 border-choco text-2xl transition hover:bg-choco hover:text-garoto-yellow">←</button>
          <button onClick={next} aria-label="Próximo" className="grid size-12 place-items-center rounded-full border-2 border-choco text-2xl transition hover:bg-choco hover:text-garoto-yellow">→</button>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-choco/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="post-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.6, y: 80, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 60, rotate: 4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative grid w-full max-w-3xl overflow-hidden rounded-[32px] bg-cream shadow-2xl md:grid-cols-2"
            >
              <Image src={active.image} alt={active.caption} width={600} height={600} className="aspect-square w-full object-cover object-top" />
              <div className="flex flex-col gap-4 p-7">
                <span className="label-caps w-fit rounded-full bg-garoto-yellow px-3 py-1.5 text-base text-choco">{active.campaign}</span>
                <h3 id="post-title" className="font-round text-3xl font-extrabold italic leading-tight text-garoto-red">
                  {active.title}
                </h3>
                <p className="text-lg text-choco/80">{active.caption}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-caps inline-flex items-center gap-2 rounded-full bg-garoto-red px-5 py-3 text-lg text-white transition-transform hover:-translate-y-0.5"
                  >
                    <SocialIcon name={active.network} className="size-5" />
                    Ver no {active.network === "facebook" ? "Facebook" : "Instagram"}
                  </a>
                  <button
                    onClick={() => setActive(null)}
                    className="label-caps rounded-full border-2 border-choco px-5 py-3 text-lg transition hover:bg-choco hover:text-cream"
                  >
                    Fechar
                  </button>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Fechar"
                className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
