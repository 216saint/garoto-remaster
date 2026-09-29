export type Palette = {
  /** fundo do card/cena */
  bg: string;
  /** cor principal da embalagem */
  pack: string;
  /** faixa/detalhe da embalagem */
  accent: string;
  /** cor do texto sobre a embalagem */
  ink: string;
};

export type Variation = {
  id: string;
  name: string;
  format: string;
  palette: Palette;
  note?: string;
  /** packshot oficial opcional em /public/assets/products */
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: "Tabletes" | "Bombons" | "Snacks" | "Caixas";
  tagline: string;
  description: string;
  palette: Palette;
  /** "descricionário": verbetes do produto */
  glossary: { term: string; definition: string }[];
  variations: Variation[];
  image?: string;
};

const red = "#E30613";
const yellow = "#FFCB05";
const choco = "#3B1A0E";
const milk = "#7A3E1D";
const cream = "#FFF4DC";

export const products: Product[] = [
  {
    slug: "baton",
    name: "Baton",
    category: "Snacks",
    tagline: "Compre Baton. Compre Baton. Seu filho merece Baton.",
    description:
      "O bastão de chocolate Garoto que atravessa gerações. Cremoso, do tamanho certo e com aquele jeito de descascar que todo mundo conhece.",
    palette: { bg: "#FFE7A0", pack: red, accent: yellow, ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bastão individual de chocolate, embalado em papel metalizado." },
      { term: "Textura", definition: "Macia e cremosa, derrete na medida certa." },
      { term: "Ocasião", definition: "Lancheira, recreio, sobremesa rápida — qualquer hora." },
      { term: "Porção", definition: "1 unidade de 16 g." },
      { term: "Alergênicos", definition: "Contém leite e derivados de soja. Pode conter trigo, amendoim e castanhas." },
    ],
    variations: [
      { id: "ao-leite", name: "Baton Ao Leite", format: "16 g", palette: { bg: "#FFE7A0", pack: red, accent: yellow, ink: "#FFFFFF" } },
      { id: "branco", name: "Baton Branco", format: "16 g", palette: { bg: "#E9F2FF", pack: "#1A5FB4", accent: cream, ink: "#FFFFFF" } },
      { id: "duo", name: "Baton Duo", format: "16 g", palette: { bg: "#FDE2E4", pack: "#6A2C8C", accent: yellow, ink: "#FFFFFF" }, note: "Chocolate ao leite e branco juntos." },
      { id: "multipack", name: "Baton Multipack", format: "Pacote 30 unidades", palette: { bg: "#FFE7A0", pack: "#C00010", accent: yellow, ink: "#FFFFFF" } },
    ],
  },
  {
    slug: "talento",
    name: "Talento",
    category: "Tabletes",
    tagline: "Chocolate com pedaços de verdade.",
    description:
      "Tabletes Garoto com generosos pedaços de castanhas e ingredientes selecionados, para quem sabe apreciar cada mordida.",
    palette: { bg: "#F3E3CF", pack: "#3A1C6E", accent: "#D4A94F", ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Tablete com gomos, ideal para compartilhar." },
      { term: "Textura", definition: "Cremosa, com crocância das castanhas e cereais." },
      { term: "Ocasião", definition: "Pausa do dia, sobremesa, presente." },
      { term: "Porção", definition: "1/4 do tablete (22,5 g)." },
      { term: "Alergênicos", definition: "Contém leite, soja e castanhas. Pode conter trigo e amendoim." },
    ],
    variations: [
      { id: "castanha-do-para", name: "Talento Castanhas-do-Pará", format: "90 g", palette: { bg: "#F3E3CF", pack: "#6B2A7A", accent: "#D4A94F", ink: "#FFFFFF" } },
      { id: "avelas", name: "Talento Avelãs", format: "90 g", palette: { bg: "#F1E0CC", pack: "#1E4D8C", accent: "#D4A94F", ink: "#FFFFFF" } },
      { id: "amendoas", name: "Talento Amêndoas", format: "90 g", palette: { bg: "#F7E6D2", pack: "#B0412B", accent: "#E8C477", ink: "#FFFFFF" } },
      { id: "cereais", name: "Talento Cereais", format: "90 g", palette: { bg: "#EEF2D9", pack: "#2F6B3A", accent: "#E8C477", ink: "#FFFFFF" } },
      { id: "meio-amargo", name: "Talento Meio Amargo", format: "85 g", palette: { bg: "#E8DCD3", pack: "#1B1B1B", accent: "#C9A14A", ink: "#FFFFFF" } },
    ],
  },
  {
    slug: "serenata-de-amor",
    name: "Serenata de Amor",
    category: "Bombons",
    tagline: "O bombom que é uma declaração.",
    description:
      "Wafer crocante com recheio de castanha de caju, envolvido em chocolate ao leite. O jeito mais doce de dizer o que se sente.",
    palette: { bg: "#FFE0E6", pack: "#C8102E", accent: "#F7C6D0", ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bombom individual em embalagem vermelha com coração." },
      { term: "Recheio", definition: "Creme de castanha de caju com wafer crocante." },
      { term: "Ocasião", definition: "Dia dos Namorados, declarações e surpresas." },
      { term: "Porção", definition: "1 unidade de 20 g." },
      { term: "Alergênicos", definition: "Contém leite, trigo, soja e castanha de caju. Pode conter amendoim." },
    ],
    variations: [
      { id: "unidade", name: "Serenata de Amor", format: "20 g", palette: { bg: "#FFE0E6", pack: "#C8102E", accent: "#F7C6D0", ink: "#FFFFFF" } },
      { id: "caixa", name: "Serenata de Amor Caixa", format: "Caixa 250 g", palette: { bg: "#FFD6DE", pack: "#9E0B22", accent: "#F7C6D0", ink: "#FFFFFF" } },
      { id: "tablete", name: "Serenata de Amor Tablete", format: "90 g", palette: { bg: "#FFE9EC", pack: "#D6203A", accent: cream, ink: "#FFFFFF" } },
    ],
  },
  {
    slug: "caixa-de-bombons",
    name: "Caixa de Bombons Garoto",
    category: "Caixas",
    tagline: "A caixa amarela mais querida do Brasil.",
    description:
      "Uma seleção dos bombons Garoto mais amados em uma só caixa: Serenata de Amor, Crocante, Caribe, Opereta, Mundy, Baton e muito mais.",
    palette: { bg: "#FFF1B8", pack: yellow, accent: red, ink: red },
    glossary: [
      { term: "Formato", definition: "Caixa sortida de bombons Garoto." },
      { term: "Sabores", definition: "Serenata de Amor, Crocante, Caribe, Opereta, Mundy, Baton, Lollo e Tortuguita variam por edição." },
      { term: "Ocasião", definition: "Visitas, festas, datas especiais e aquele presente que nunca erra." },
      { term: "Porção", definition: "3 bombons (aprox. 25 g)." },
      { term: "Alergênicos", definition: "Contém leite, trigo, soja, amendoim e castanhas." },
    ],
    variations: [
      { id: "250g", name: "Caixa Amarela", format: "250 g", palette: { bg: "#FFF1B8", pack: yellow, accent: red, ink: red } },
      { id: "300g", name: "Caixa Amarela Tamanho Família", format: "300 g", palette: { bg: "#FFF1B8", pack: "#FFB800", accent: red, ink: red } },
      { id: "natal", name: "Edição de Natal", format: "250 g", palette: { bg: "#E6F4EA", pack: "#1F7A3A", accent: yellow, ink: "#FFFFFF" }, note: "Edição sazonal." },
    ],
  },
  {
    slug: "crocante",
    name: "Crocante",
    category: "Bombons",
    tagline: "Crocância que faz barulho.",
    description: "Chocolate ao leite com pedacinhos de amendoim crocante. Um clássico dos bombons Garoto.",
    palette: { bg: "#FFE3C4", pack: "#E06A00", accent: yellow, ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bombom individual." },
      { term: "Textura", definition: "Chocolate cremoso com crocante de amendoim." },
      { term: "Ocasião", definition: "Beliscar a qualquer hora." },
      { term: "Porção", definition: "1 unidade." },
      { term: "Alergênicos", definition: "Contém leite, soja e amendoim." },
    ],
    variations: [
      { id: "bombom", name: "Crocante Bombom", format: "Unidade", palette: { bg: "#FFE3C4", pack: "#E06A00", accent: yellow, ink: "#FFFFFF" } },
      { id: "tablete", name: "Crocante Tablete", format: "90 g", palette: { bg: "#FFE9D1", pack: "#C85A00", accent: yellow, ink: "#FFFFFF" } },
    ],
  },
  {
    slug: "caribe",
    name: "Caribe",
    category: "Bombons",
    tagline: "Um toque tropical de banana.",
    description: "Recheio cremoso sabor banana envolvido por chocolate ao leite Garoto.",
    palette: { bg: "#FFF6BF", pack: "#00857C", accent: yellow, ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bombom individual." },
      { term: "Recheio", definition: "Creme sabor banana." },
      { term: "Ocasião", definition: "Sobremesa com cara de Brasil." },
      { term: "Porção", definition: "1 unidade." },
      { term: "Alergênicos", definition: "Contém leite e soja." },
    ],
    variations: [{ id: "bombom", name: "Caribe", format: "Unidade", palette: { bg: "#FFF6BF", pack: "#00857C", accent: yellow, ink: "#FFFFFF" } }],
  },
  {
    slug: "opereta",
    name: "Opereta",
    category: "Bombons",
    tagline: "Wafer e chocolate em harmonia.",
    description: "Camadas de wafer com recheio de chocolate, cobertas com chocolate ao leite.",
    palette: { bg: "#E6E3FF", pack: "#3D2A8C", accent: "#F2B632", ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bombom individual." },
      { term: "Textura", definition: "Wafer crocante com recheio cremoso." },
      { term: "Ocasião", definition: "Café da tarde." },
      { term: "Porção", definition: "1 unidade." },
      { term: "Alergênicos", definition: "Contém leite, trigo e soja." },
    ],
    variations: [{ id: "bombom", name: "Opereta", format: "Unidade", palette: { bg: "#E6E3FF", pack: "#3D2A8C", accent: "#F2B632", ink: "#FFFFFF" } }],
  },
  {
    slug: "mundy",
    name: "Mundy",
    category: "Bombons",
    tagline: "Pequeno no tamanho, gigante no sabor.",
    description: "Chocolate ao leite com recheio cremoso e flocos crocantes.",
    palette: { bg: "#DDF1FF", pack: "#0067B1", accent: yellow, ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Bombom individual." },
      { term: "Textura", definition: "Cremoso com flocos crocantes." },
      { term: "Ocasião", definition: "Depois do almoço." },
      { term: "Porção", definition: "1 unidade." },
      { term: "Alergênicos", definition: "Contém leite, trigo e soja." },
    ],
    variations: [{ id: "bombom", name: "Mundy", format: "Unidade", palette: { bg: "#DDF1FF", pack: "#0067B1", accent: yellow, ink: "#FFFFFF" } }],
  },
  {
    slug: "chocolate-garoto",
    name: "Chocolate Garoto",
    category: "Tabletes",
    tagline: "O sabor Garoto em tablete.",
    description: "O chocolate Garoto de sempre em tabletes para comer, compartilhar e usar nas receitas.",
    palette: { bg: "#F4E1CF", pack: milk, accent: yellow, ink: "#FFFFFF" },
    glossary: [
      { term: "Formato", definition: "Tablete com gomos." },
      { term: "Textura", definition: "Lisa e cremosa." },
      { term: "Ocasião", definition: "Receitas, sobremesas e aquele pedacinho depois do almoço." },
      { term: "Porção", definition: "1/4 do tablete (20 g)." },
      { term: "Alergênicos", definition: "Contém leite e soja. Pode conter trigo, amendoim e castanhas." },
    ],
    variations: [
      { id: "ao-leite", name: "Ao Leite", format: "80 g", palette: { bg: "#F4E1CF", pack: milk, accent: yellow, ink: "#FFFFFF" } },
      { id: "meio-amargo", name: "Meio Amargo", format: "80 g", palette: { bg: "#E6D6CB", pack: choco, accent: "#C9A14A", ink: "#FFFFFF" } },
      { id: "branco", name: "Branco", format: "80 g", palette: { bg: "#FFF8EA", pack: cream, accent: red, ink: red } },
      { id: "culinario", name: "Culinário Ao Leite", format: "1 kg", palette: { bg: "#F4E1CF", pack: "#5C2A12", accent: yellow, ink: "#FFFFFF" } },
    ],
  },
];

export const categories = ["Todos", "Snacks", "Tabletes", "Bombons", "Caixas"] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
