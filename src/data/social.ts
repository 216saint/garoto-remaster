import type { SocialKey } from "./site";

export type SocialPost = {
  id: string;
  image: string;
  title: string;
  caption: string;
  campaign: "10 Milhas Garoto" | "Feito de Brasil";
  network: SocialKey;
  href: string;
};

const ig = "https://www.instagram.com/chocolatesgaroto";
const fb = "https://www.facebook.com/chocolatesgaroto";

// Posts reaproveitados do feed exibido na home original.
export const socialPosts: SocialPost[] = [
  { id: "p01", image: "/assets/social/post-01.webp", title: "Checklist para a Dez Milhas Garoto", caption: "Checklist para a Dez Milhas Garoto: tá tudo pronto?", campaign: "10 Milhas Garoto", network: "instagram", href: ig },
  { id: "p02", image: "/assets/social/post-02.webp", title: "Tênis separado?", caption: "Tênis separado? Primeiro item do checklist conferido.", campaign: "10 Milhas Garoto", network: "instagram", href: ig },
  { id: "p03", image: "/assets/social/post-03.webp", title: "Look da corrida pronto?", caption: "Look da corrida pronto? Bora pra largada.", campaign: "10 Milhas Garoto", network: "facebook", href: fb },
  { id: "p04", image: "/assets/social/post-04.webp", title: "Playlist escolhida?", caption: "Playlist escolhida? Agora é só dar o play.", campaign: "10 Milhas Garoto", network: "instagram", href: ig },
  { id: "p05", image: "/assets/social/post-05.webp", title: "Agora só falta chegar domingo", caption: "10 Milhas Garoto, 35ª edição. Agora só falta chegar domingo.", campaign: "10 Milhas Garoto", network: "facebook", href: fb },
  { id: "p06", image: "/assets/social/post-06.webp", title: "Tá chegando!", caption: "Tá chegando! 10 Milhas Garoto é neste fim de semana.", campaign: "10 Milhas Garoto", network: "instagram", href: ig },
  { id: "p07", image: "/assets/social/post-07.webp", title: "Já separa o tênis!", caption: "Já separa o tênis! 27 de setembro — Vitória e Vila Velha - ES, 16,1 km.", campaign: "10 Milhas Garoto", network: "instagram", href: ig },
  { id: "p08", image: "/assets/social/post-08.webp", title: "Nos vemos na chegada!", caption: "10 Milhas Garoto, 35ª edição. Nos vemos na chegada!", campaign: "10 Milhas Garoto", network: "facebook", href: fb },
  { id: "p09", image: "/assets/social/post-09.webp", title: "Quem faz o cacau também faz parte da história", caption: "Quem faz o cacau também faz parte da história.", campaign: "Feito de Brasil", network: "instagram", href: ig },
  { id: "p10", image: "/assets/social/post-10.webp", title: "Quem faz o cacau também faz parte da história", caption: "Quem faz o cacau também faz parte da história.", campaign: "Feito de Brasil", network: "instagram", href: ig },
  { id: "p11", image: "/assets/social/post-11.webp", title: "Quem faz o cacau também faz parte da história", caption: "Quem faz o cacau também faz parte da história.", campaign: "Feito de Brasil", network: "facebook", href: fb },
  { id: "p12", image: "/assets/social/post-12.webp", title: "Feito de Brasil", caption: "Tem muito Brasil antes de virar Garoto. Feito de Brasil.", campaign: "Feito de Brasil", network: "instagram", href: ig },
];
