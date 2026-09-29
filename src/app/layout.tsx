import type { Metadata, Viewport } from "next";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/800.css";
import "@fontsource-variable/nunito-sans";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: { default: "Garoto — Feito de Brasil", template: "%s | Garoto" },
  description:
    "Chocolates Garoto: Baton, Talento, Serenata de Amor, a Caixa de Bombons mais vendida do Brasil e o Chocotour na fábrica em Vila Velha - ES.",
};

export const viewport: Viewport = { themeColor: "#FFCB05" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="label-caps sr-only rounded-full bg-choco px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
