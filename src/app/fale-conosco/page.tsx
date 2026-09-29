import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/pages/ContactForm";
import { Faq } from "@/components/pages/Faq";
import { SocialIcon } from "@/components/SocialIcon";
import { sac, socials } from "@/data/site";

export const metadata: Metadata = { title: "Fale Conosco" };

const faq = [
  { q: "Onde encontro os produtos Garoto?", a: "Os produtos Garoto estão à venda em supermercados, atacadistas e lojas de todo o Brasil, além da Chocolateria na fábrica em Vila Velha - ES." },
  { q: "Como agendar o Chocotour?", a: "Entre em contato pelo SAC para conferir datas disponíveis, horários e orientações de visita." },
  { q: "Onde vejo as informações nutricionais?", a: "Na página de cada produto e na embalagem você encontra ingredientes, porção e alergênicos." },
  { q: "Como enviar um currículo?", a: "Acesse a página Trabalhe Conosco e cadastre-se no portal de carreiras." },
];

export default function FalePage() {
  return (
    <>
      <PageHero
        kicker="Fale Conosco"
        title="A gente adora uma boa conversa"
        intro="Dúvidas, elogios ou sugestões? O Serviço ao Consumidor Garoto está pronto para te ouvir."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          <a href={sac.phoneHref} className="group block rounded-[28px] bg-garoto-red p-7 text-white transition-transform hover:-translate-y-1">
            <p className="label-caps text-lg text-garoto-yellow">Ligue grátis</p>
            <p className="font-display text-5xl">{sac.phone}</p>
          </a>
          <a href={`mailto:${sac.email}`} className="block rounded-[28px] bg-garoto-yellow p-7 transition-transform hover:-translate-y-1">
            <p className="label-caps text-lg text-garoto-red">E-mail</p>
            <p className="break-all font-display text-3xl">{sac.email}</p>
          </a>
          <div className="rounded-[28px] bg-choco p-7 text-cream">
            <p className="label-caps text-lg text-garoto-yellow">Redes</p>
            <ul className="mt-3 flex gap-3">
              {socials.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-12 place-items-center rounded-full bg-cream text-choco transition-transform hover:-translate-y-1 hover:rotate-6">
                    <SocialIcon name={s.key} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1} id="cadastro" className="scroll-mt-28">
          <h2 className="label-caps text-5xl">Envie sua mensagem</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </section>

      <section id="faq" className="mx-auto max-w-6xl scroll-mt-28 px-6" aria-labelledby="faq-title">
        <Reveal>
          <h2 id="faq-title" className="font-round text-5xl font-extrabold italic text-garoto-red md:text-6xl">Perguntas frequentes</h2>
        </Reveal>
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {[
          { id: "comunicados", t: "Comunicados", d: "Informações oficiais e avisos da Garoto aos consumidores." },
          { id: "privacidade", t: "Política de Privacidade", d: "Como tratamos e protegemos os seus dados pessoais." },
          { id: "termos", t: "Termos e Condições", d: "Regras de uso deste site e das nossas campanhas." },
        ].map((b, i) => (
          <Reveal key={b.id} id={b.id} delay={i * 0.08} className="scroll-mt-28 rounded-[28px] border-4 border-choco p-7">
            <h3 className="label-caps text-3xl">{b.t}</h3>
            <p className="mt-2 text-choco/75">{b.d}</p>
          </Reveal>
        ))}
      </section>
    </>
  );
}
