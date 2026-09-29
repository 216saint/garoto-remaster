import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PackArt } from "@/components/product/PackArt";
import { SerenataBuilder } from "@/components/pages/SerenataBuilder";
import { Hearts } from "@/components/pages/Hearts";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "Serenata de Amor" };

export default function SerenataPage() {
  const p = getProduct("serenata-de-amor")!;
  return (
    <>
      <div className="relative">
        <PageHero
          kicker="Serenata de Amor"
          title="O bombom que é uma declaração"
          intro={p.description}
          bg="#C8102E"
          titleColor="#FFFFFF"
          ink="#FFFFFF"
          art={<PackArt name="Serenata de Amor" kind="Bombons" palette={p.palette} className="animate-bob mx-auto w-full max-w-md" />}
        >
          <Button href="/produtos/serenata-de-amor/" variant="yellow">Conheça o bombom</Button>
        </PageHero>
        <Hearts />
      </div>

      <section className="bg-[#FFE0E6] py-24" aria-labelledby="monte">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12">
            <p className="label-caps text-xl text-[#C8102E]">Monte a sua</p>
            <h2 id="monte" className="font-round text-5xl font-extrabold italic leading-none text-[#9E0B22] md:text-7xl">
              Mande uma Serenata
            </h2>
          </Reveal>
          <SerenataBuilder />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-3" aria-label="Por dentro do bombom">
        {[
          { t: "Wafer", d: "Camadas finas e crocantes." },
          { t: "Castanha de caju", d: "Recheio cremoso e marcante." },
          { t: "Chocolate ao leite", d: "A cobertura Garoto que envolve tudo." },
        ].map((l, i) => (
          <Reveal key={l.t} delay={i * 0.1} className="rounded-[32px] bg-[#C8102E] p-8 text-white">
            <span className="label-caps text-5xl text-[#F7C6D0]">Camada {i + 1}</span>
            <h3 className="mt-3 font-round text-3xl font-extrabold italic">{l.t}</h3>
            <p className="mt-2 text-lg text-white/85">{l.d}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
