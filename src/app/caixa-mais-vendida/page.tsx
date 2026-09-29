import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PackArt } from "@/components/product/PackArt";
import { CaixaReveal } from "@/components/pages/CaixaReveal";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "Caixa mais vendida" };

const moments = [
  { title: "Visitas", text: "Chegou visita? A caixa amarela já está na mesa." },
  { title: "Datas especiais", text: "Páscoa, Natal, aniversário: presente que nunca erra." },
  { title: "Pra dividir", text: "Um bombom pra cada um — e a disputa pelo Serenata." },
];

export default function CaixaPage() {
  const caixa = getProduct("caixa-de-bombons")!;
  return (
    <>
      <PageHero
        kicker="Caixa de Bombons Garoto"
        title="A caixa mais vendida do Brasil"
        intro="A caixa amarela que reúne os bombons Garoto mais amados e está presente nos melhores momentos das famílias brasileiras."
        art={<PackArt name="Garoto" subtitle="Bombons sortidos" kind="Caixas" palette={caixa.palette} className="animate-bob mx-auto w-full max-w-md" />}
      >
        <Button href="/produtos/caixa-de-bombons/">Ver a caixa</Button>
      </PageHero>

      <Marquee className="bg-choco text-garoto-yellow" items={["Serenata de Amor", "Crocante", "Caribe", "Opereta", "Mundy", "Baton"]} />

      <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="dentro">
        <Reveal className="mb-16 text-center">
          <p className="label-caps text-xl text-garoto-blue">Abre a caixa</p>
          <h2 id="dentro" className="font-round text-5xl font-extrabold italic text-garoto-red md:text-7xl">O que tem dentro?</h2>
        </Reveal>
        <CaixaReveal />
      </section>

      <section className="bg-garoto-red py-24 text-white" aria-labelledby="momentos">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <h2 id="momentos" className="label-caps text-6xl md:text-8xl">Pra todo momento</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {moments.map((m, i) => (
              <li key={m.title}>
                <Reveal delay={i * 0.1} className="h-full rounded-[32px] bg-white/10 p-8 transition-colors hover:bg-white/15">
                  <span className="label-caps text-6xl text-garoto-yellow">0{i + 1}</span>
                  <h3 className="mt-4 font-round text-3xl font-extrabold italic">{m.title}</h3>
                  <p className="mt-2 text-lg text-white/80">{m.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
