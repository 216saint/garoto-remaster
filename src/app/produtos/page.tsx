import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PackArt } from "@/components/product/PackArt";
import { getProduct } from "@/data/products";

export const metadata: Metadata = { title: "Produtos" };

export default function ProdutosPage() {
  const talento = getProduct("talento")!;
  return (
    <>
      <PageHero
        kicker="Produtos Garoto"
        title="Chocolate pra todo momento"
        intro="Do Baton da lancheira à caixa de bombons das visitas: conheça todos os produtos Garoto."
        art={<PackArt name="Talento" subtitle="Castanhas-do-Pará" kind="Tabletes" palette={talento.variations[0].palette} className="animate-bob mx-auto w-full max-w-sm" />}
      />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ProductGrid />
      </section>
    </>
  );
}
