import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { chocotourInfo } from "@/data/site";

export const metadata: Metadata = { title: "Chocotour Garoto" };

// Revisar marcos históricos com o cliente antes da publicação.
const timeline = [
  { y: "1929", t: "Nasce a Garoto", d: "Em Vila Velha, no Espírito Santo, começa a história da Garoto." },
  { y: "Anos 40", t: "Bombons que viram tradição", d: "Surgem clássicos como o Serenata de Amor." },
  { y: "Anos 2000", t: "Novos sabores", d: "Chega a linha Talento, com pedaços de verdade." },
  { y: "Hoje", t: "Feito de Brasil", d: "A fábrica de Vila Velha abre as portas para o Chocotour." },
];

const tour = [
  { t: "Museu", d: "A história da Garoto contada por embalagens, fotos e curiosidades.", c: "#FFCB05" },
  { t: "Fábrica", d: "Veja de perto como o chocolate Garoto é produzido.", c: "#E30613" },
  { t: "Chocolateria", d: "Termine o passeio na loja com os produtos Garoto.", c: "#4FB3E8" },
];

export default function ChocotourPage() {
  return (
    <>
      <PageHero
        kicker="Chocotour Garoto"
        title="Um passeio pela fábrica da Garoto"
        intro="Conheça a história, o processo e o sabor do chocolate Garoto na fábrica em Vila Velha - ES."
        bg="#4FB3E8"
        titleColor="#FFFFFF"
        ink="#FFFFFF"
      >
        <Button href={chocotourInfo.mapsUrl} external variant="yellow">Como chegar</Button>
      </PageHero>

      <section id="chocolateria" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24" aria-labelledby="passeio">
        <Reveal>
          <h2 id="passeio" className="label-caps text-6xl md:text-8xl">O passeio</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {tour.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.1} className="group relative h-full overflow-hidden rounded-[32px] p-8" style={{ background: s.c }}>
                <span className="label-caps text-7xl text-white/40 transition-transform duration-700 group-hover:scale-110">0{i + 1}</span>
                <h3 className={`mt-4 font-round text-3xl font-extrabold italic ${s.c === "#FFCB05" ? "text-garoto-red" : "text-white"}`}>{s.t}</h3>
                <p className={`mt-2 text-lg ${s.c === "#FFCB05" ? "text-choco/80" : "text-white/85"}`}>{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="historia" className="scroll-mt-28 bg-choco py-24 text-cream" aria-labelledby="hist">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="label-caps text-xl text-garoto-yellow">A Garoto</p>
            <h2 id="hist" className="font-round text-5xl font-extrabold italic md:text-6xl">Nossa história</h2>
          </Reveal>
          <ol className="relative mt-14 border-l-4 border-garoto-yellow/40 pl-8 md:pl-12">
            {timeline.map((m, i) => (
              <li key={m.y} className="relative pb-12 last:pb-0">
                <Reveal delay={i * 0.05}>
                  <span className="absolute -left-[46px] top-2 size-6 rounded-full border-4 border-choco bg-garoto-yellow md:-left-[62px]" aria-hidden />
                  <span className="label-caps text-6xl text-garoto-yellow md:text-7xl">{m.y}</span>
                  <h3 className="mt-1 font-round text-3xl font-extrabold italic">{m.t}</h3>
                  <p className="mt-1 max-w-xl text-lg text-cream/75">{m.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="responsabilidade" className="mx-auto grid max-w-6xl scroll-mt-28 gap-10 px-6 py-24 md:grid-cols-2" aria-labelledby="resp">
        <Reveal>
          <p className="label-caps text-xl text-garoto-leaf">Responsabilidade Social</p>
          <h2 id="resp" className="font-round text-5xl font-extrabold italic text-garoto-red">Quem faz o cacau também faz parte da história.</h2>
          <p className="mt-4 text-lg text-choco/80">
            Tem muito Brasil antes de virar Garoto. Valorizamos os produtores de cacau e as comunidades que fazem parte da nossa trajetória.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[32px] bg-garoto-yellow p-8">
          <p className="label-caps text-2xl text-garoto-red">Planeje sua visita</p>
          <dl className="mt-4 space-y-4 text-lg">
            <div>
              <dt className="label-caps text-base text-choco/60">Endereço</dt>
              <dd className="font-bold">{chocotourInfo.address}</dd>
            </div>
            <div>
              <dt className="label-caps text-base text-choco/60">Horários e ingressos</dt>
              <dd className="font-bold">Consulte a agenda de visitas pelo SAC: 0800 055 95 50.</dd>
            </div>
          </dl>
          <div className="mt-6">
            <Button href="/fale-conosco/" variant="choco">Falar com a gente</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
