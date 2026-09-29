import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).concat(
    products.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ).slice(0, 3);

  return (
    <>
      <ProductShowcase product={product} />
      <section className="mx-auto mt-28 max-w-6xl px-6" aria-labelledby="relacionados">
        <Reveal>
          <h2 id="relacionados" className="label-caps text-5xl md:text-6xl">Você também vai gostar</h2>
        </Reveal>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.08} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
