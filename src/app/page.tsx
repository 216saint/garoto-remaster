import { BatonHero } from "@/components/home/BatonHero";
import { SocialCarousel } from "@/components/home/SocialCarousel";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { PackArt } from "@/components/product/PackArt";
import { getProduct, products } from "@/data/products";

export default function Home() {
  const featured = ["baton", "talento", "serenata-de-amor"].map((s) => getProduct(s)!);
  const caixa = getProduct("caixa-de-bombons")!;

  return (
    <>
      <BatonHero />

      <Marquee
        className="-rotate-1 bg-garoto-red text-garoto-yellow"
        items={["Feito de Brasil", "Baton", "Talento", "Serenata de Amor", "Caixa de Bombons", "Chocotour"]}
      />

      <section className="mx-auto max-w-6xl px-6 py-24" aria-labelledby="destaques">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-caps text-xl text-garoto-blue">Nossos chocolates</p>
            <h2 id="destaques" className="font-round text-5xl font-extrabold italic leading-none text-garoto-red md:text-7xl">
              Os queridinhos do Brasil
            </h2>
          </div>
          <Button href="/produtos/" variant="choco">Ver todos os {products.length} produtos</Button>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.1} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-garoto-red py-24 text-white" aria-labelledby="caixa">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <Reveal>
            <p className="label-caps text-2xl text-garoto-yellow">Caixa mais vendida</p>
            <h2 id="caixa" className="font-round text-5xl font-extrabold italic leading-[0.95] md:text-7xl">
              A caixa amarela mais querida do Brasil.
            </h2>
            <p className="mt-6 max-w-md text-xl font-semibold text-white/85">{caixa.description}</p>
            <div className="mt-8">
              <Button href="/caixa-mais-vendida/" variant="yellow">Abrir a caixa</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="animate-bob">
            <PackArt name="Garoto" subtitle="Bombons sortidos" kind="Caixas" palette={caixa.palette} className="mx-auto w-full max-w-md" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-2" aria-label="Conheça a Garoto">
        <Reveal className="relative overflow-hidden rounded-[36px] bg-garoto-sky p-10 text-white">
          <p className="label-caps text-2xl text-garoto-yellow">Chocotour Garoto</p>
          <h3 className="font-round text-4xl font-extrabold italic leading-tight">Visite a fábrica da Garoto em Vila Velha - ES.</h3>
          <p className="mt-4 max-w-sm text-lg font-semibold text-white/85">
            Um passeio pela história, pela produção e pelo sabor do chocolate Garoto.
          </p>
          <div className="mt-8">
            <Button href="/chocotour/" variant="yellow">Agende sua visita</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative overflow-hidden rounded-[36px] bg-[#FFE0E6] p-10">
          <p className="label-caps text-2xl text-[#C8102E]">Serenata de Amor</p>
          <h3 className="font-round text-4xl font-extrabold italic leading-tight text-[#9E0B22]">O bombom que é uma declaração.</h3>
          <p className="mt-4 max-w-sm text-lg font-semibold text-choco/75">
            Monte a sua Serenata e mande para quem faz o seu coração bater mais forte.
          </p>
          <div className="mt-8">
            <Button href="/serenata-de-amor/">Fazer uma Serenata</Button>
          </div>
        </Reveal>
      </section>

      <SocialCarousel />
    </>
  );
}
