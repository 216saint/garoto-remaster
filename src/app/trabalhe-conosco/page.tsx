import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { careersUrl } from "@/data/site";

export const metadata: Metadata = { title: "Trabalhe Conosco" };

const values = [
  { t: "Paixão pelo que faz", d: "Chocolate é coisa séria — e divertida. A gente faz com carinho." },
  { t: "Feito de Brasil", d: "Da origem do cacau à mesa das famílias, valorizamos quem faz parte." },
  { t: "Gente que cresce", d: "Desenvolvimento, aprendizado e oportunidades para quem quer ir além." },
  { t: "Respeito e diversidade", d: "Um lugar onde cada pessoa pode ser quem é." },
];

const areas = ["Produção e Fábrica", "Engenharia e Manutenção", "Qualidade", "Logística", "Marketing", "Vendas", "Administrativo", "Programas de Estágio e Trainee"];

const steps = [
  { t: "Cadastre-se", d: "Crie seu perfil no portal de carreiras." },
  { t: "Candidate-se", d: "Escolha a vaga que combina com você." },
  { t: "Processo seletivo", d: "Etapas online e entrevistas com o time." },
  { t: "Bem-vindo(a)!", d: "Seu lugar na família Garoto." },
];

export default function TrabalhePage() {
  return (
    <>
      <PageHero
        kicker="Trabalhe Conosco"
        title="Venha fazer parte da família Garoto"
        intro="Quer trabalhar com a gente? Conheça nossas áreas, nossos valores e cadastre seu currículo."
        bg="#6FB843"
        titleColor="#FFFFFF"
        ink="#FFFFFF"
      >
        <Button href={careersUrl} external variant="yellow">Ver vagas abertas</Button>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="valores">
        <Reveal>
          <h2 id="valores" className="label-caps text-6xl md:text-8xl">Nossos valores</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.t}>
              <Reveal delay={i * 0.08} className="group h-full rounded-[32px] bg-garoto-yellow p-8 transition-transform duration-500 hover:-rotate-1 hover:scale-[1.02]">
                <span className="label-caps text-5xl text-garoto-red">0{i + 1}</span>
                <h3 className="mt-3 font-round text-3xl font-extrabold italic">{v.t}</h3>
                <p className="mt-2 text-lg text-choco/80">{v.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-choco py-24 text-cream" aria-labelledby="areas">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="label-caps text-xl text-garoto-yellow">Onde você pode atuar</p>
            <h2 id="areas" className="font-round text-5xl font-extrabold italic md:text-6xl">Áreas</h2>
          </Reveal>
          <ul className="mt-10 border-t-2 border-cream/20">
            {areas.map((a, i) => (
              <li key={a}>
                <Reveal delay={i * 0.04} y={16}>
                  <a
                    href={careersUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b-2 border-cream/20 py-5 transition-colors hover:text-garoto-yellow"
                  >
                    <span className="label-caps text-3xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:text-4xl">{a}</span>
                    <span className="grid size-10 place-items-center rounded-full border-2 border-current transition-transform duration-500 group-hover:-rotate-45" aria-hidden>→</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="processo">
        <Reveal>
          <h2 id="processo" className="font-round text-5xl font-extrabold italic text-garoto-red md:text-6xl">Como funciona</h2>
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.1} className="relative h-full rounded-[28px] border-4 border-choco p-6">
                <span className="grid size-14 place-items-center rounded-full bg-garoto-red font-display text-3xl text-white">{i + 1}</span>
                <h3 className="mt-4 font-round text-2xl font-extrabold italic">{s.t}</h3>
                <p className="mt-1 text-choco/75">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button href={careersUrl} external>Cadastrar currículo</Button>
        </div>
      </section>
    </>
  );
}
