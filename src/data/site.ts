// Conteúdo institucional centralizado. As copys seguem o site original
// (garoto.com.br) — ajuste aqui para refletir qualquer revisão de texto.

export const nav = [
  { href: "/", label: "Início" },
  { href: "/produtos/", label: "Produtos" },
  { href: "/caixa-mais-vendida/", label: "Caixa mais vendida" },
  { href: "/serenata-de-amor/", label: "Serenata de Amor" },
  { href: "/chocotour/", label: "Chocotour" },
  { href: "/fale-conosco/", label: "Fale Conosco" },
] as const;

export const socials = [
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/chocolatesgaroto" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/chocolatesgaroto" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/chocolatesgaroto" },
  { key: "twitter", label: "Twitter", href: "https://twitter.com/sacgaroto" },
] as const;

export type SocialKey = (typeof socials)[number]["key"];

export const footerColumns = [
  {
    title: "Institucional",
    links: [
      { label: "A Garoto", href: "/chocotour/#historia" },
      { label: "Chocolateria", href: "/chocotour/#chocolateria" },
      { label: "Comunicados", href: "/fale-conosco/#comunicados" },
      { label: "Fale Conosco", href: "/fale-conosco/" },
    ],
  },
  {
    title: "Garoto",
    links: [
      { label: "Produtos", href: "/produtos/" },
      { label: "Responsabilidade Social", href: "/chocotour/#responsabilidade" },
      { label: "Trabalhe Conosco", href: "/trabalhe-conosco/" },
      { label: "Chocotour Garoto", href: "/chocotour/" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Perguntas Frequentes", href: "/fale-conosco/#faq" },
      { label: "Cadastre-se", href: "/fale-conosco/#cadastro" },
      { label: "Política de Privacidade", href: "/fale-conosco/#privacidade" },
      { label: "Termos e Condições", href: "/fale-conosco/#termos" },
    ],
  },
] as const;

export const sac = {
  title: "Serviço ao Consumidor Garoto",
  phone: "0800 055 95 50",
  phoneHref: "tel:08000559550",
  email: "sacgaroto@garoto.com.br",
  handle: "@sacgaroto",
};

// Confirmar com o cliente os links oficiais de carreiras e ingressos.
export const careersUrl = "https://www.nestle.com.br/carreiras";
export const chocotourInfo = {
  address: "Praça Meyerfreund, 1 – Glória, Vila Velha – ES",
  mapsUrl: "https://maps.google.com/?q=Chocolates+Garoto+Vila+Velha",
};
