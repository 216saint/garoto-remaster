# Garoto — Remaster

Remasterização do site [garoto.com.br](https://www.garoto.com.br/): home com Baton 3D sendo descascado no scroll, catálogo de produtos redesenhado e sub-páginas novas.

## Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Framework | **Next.js 15** (App Router, `output: "export"`) | HTML estático por rota (SEO), roda em qualquer CDN |
| 3D | **three.js + @react-three/fiber + drei** | Baton procedural (sem modelo .glb), luz por `Lightformer` (sem HDR externo) |
| Scroll | **GSAP ScrollTrigger + Lenis** | Scroll suave com a timeline do descasque sincronizada ao ticker do GSAP |
| UI motion | **Motion** (Framer Motion) | Navbar, pop-up cards, filtros, reveals, footer |
| Carrossel | **Embla** + autoplay | Posts sociais com loop, arraste e acessibilidade |
| Estilo | **Tailwind CSS v4** | Tokens de marca em `src/app/globals.css` (`@theme`) |
| Tipografia | Bebas Neue (rótulos/nav/footer), Baloo 2 (títulos), Nunito Sans (texto) via `@fontsource` | Uma família para cada papel, em todo o site |

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera /out estático
```

## Estrutura

- `src/components/home/BatonScene.tsx` — bastão (LatheGeometry) + embalagem em 4 pétalas deformadas na CPU a cada frame conforme o progresso do scroll.
- `src/components/home/BatonHero.tsx` — seção de 420vh com canvas sticky e textos em 3 passos.
- `src/components/home/SocialCarousel.tsx` — carrossel dos posts com pop-up card.
- `src/components/product/*` — cards, grade filtrável, e página de produto (card principal, **descricionário**, **mostruário** de variações).
- `src/data/*` — todas as copys, produtos, variações e links. Edite aqui.

## Assets

- `public/assets/social/post-*.webp` — posts recortados do feed da home original.
- `public/assets/brand/mascote-baton.png` — mascote da footer original.
- Packshots: enquanto não houver PNGs oficiais, `PackArt` desenha as embalagens em SVG. Para usar fotos reais, adicione `image: "/assets/products/xxx.png"` no produto/variação em `src/data/products.ts`.

## Pendências de conteúdo (validar com o cliente)

- Links oficiais de carreiras (`careersUrl`) e agenda/ingressos do Chocotour.
- Marcos da linha do tempo em `/chocotour` e textos de variações/alergênicos.
- Substituir o selo SVG (`Logo.tsx`) pelo logotipo oficial.
