"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BatonScene = dynamic(() => import("./BatonScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <span className="label-caps animate-pulse text-2xl text-garoto-red">Desembrulhando…</span>
    </div>
  ),
});

const steps = [
  { kicker: "Garoto apresenta", title: "Baton", body: "O bastão de chocolate que o Brasil inteiro conhece." },
  { kicker: "Devagarinho", title: "Descasca…", body: "Aquele barulhinho do papel é o começo da melhor parte." },
  { kicker: "Chocolate Garoto", title: "…e aproveita!", body: "Cremoso, do tamanho certo, feito de Brasil." },
];

export function BatonHero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      // Cada passo entra, fica e sai conforme a casca desce.
      steps.forEach((_, i) => {
        const el = `[data-step="${i}"]`;
        if (i > 0) tl.fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5 }, i * 1.2 - 0.3);
        if (i < steps.length - 1) tl.to(el, { autoAlpha: 0, y: -60, duration: 0.5 }, i * 1.2 + 0.6);
      });
      tl.fromTo("[data-hero-bar]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
      tl.fromTo("[data-hero-cta]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.6");
      tl.to("[data-hero-hint]", { autoAlpha: 0, duration: 0.3 }, 0);
      tl.fromTo("[data-hero-word]", { xPercent: 0 }, { xPercent: -35, ease: "none", duration: tl.duration() }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[420vh] bg-garoto-yellow" aria-label="Baton sendo descascado">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* fundo: sol, dots e o nome gigante deslizando */}
        <div className="bg-dots absolute inset-0" aria-hidden />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fff3b0_0%,#ffd84d_55%,transparent_70%)]"
        />
        <p
          data-hero-word
          aria-hidden
          className="label-caps pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[38vw] leading-none text-garoto-red/10"
        >
          Baton Baton Baton
        </p>

        <div className="absolute inset-0">
          <BatonScene progress={progress} />
        </div>

        <div className="pointer-events-none relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 md:justify-center md:pb-0">
          <div className="relative h-56 md:max-w-sm">
            {steps.map((s, i) => (
              <div key={s.title} data-step={i} className={`absolute inset-x-0 bottom-0 md:top-0 ${i > 0 ? "invisible opacity-0" : ""}`}>
                <p className="label-caps text-xl text-garoto-blue">{s.kicker}</p>
                <h1 className="font-round text-6xl font-extrabold italic leading-[0.9] text-garoto-red md:text-8xl">{s.title}</h1>
                <p className="mt-3 max-w-xs text-lg font-semibold text-choco/80">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-cta className="invisible absolute bottom-24 right-6 md:bottom-20 md:right-[max(1.5rem,calc(50vw-36rem))]">
          <Link
            href="/produtos/baton/"
            className="label-caps inline-flex items-center gap-3 rounded-full bg-garoto-red px-7 py-4 text-2xl text-white shadow-[0_8px_0_#8f0009] transition-transform duration-300 ease-[var(--ease-pop)] hover:-translate-y-1 active:translate-y-1 active:shadow-[0_2px_0_#8f0009]"
          >
            Conheça o Baton <span aria-hidden>→</span>
          </Link>
        </div>

        <p data-hero-hint className="label-caps absolute bottom-8 left-1/2 -translate-x-1/2 text-lg text-choco/70">
          Role para descascar ↓
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-choco/10">
          <div data-hero-bar className="h-full origin-left bg-garoto-red" />
        </div>
      </div>
    </section>
  );
}
