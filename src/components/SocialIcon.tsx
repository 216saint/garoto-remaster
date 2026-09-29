import type { SocialKey } from "@/data/site";

const paths: Record<SocialKey, string> = {
  facebook: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v10h4V14h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z",
  instagram:
    "M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2ZM17.3 5.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1C4.6 3.3 3.3 4.6 3.1 8.3 3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.6 1.5 5 5.2 5.2 1 0 1.3.1 3.7.1s2.7 0 3.7-.1c3.6-.2 5-1.5 5.2-5.2 0-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.6-1.5-5-5.2-5.2C14.7 3 14.4 3 12 3Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  twitter:
    "M18.2 3h3.3l-7.2 8.3L22.8 21h-6.6l-5.2-6.8L5 21H1.7l7.7-8.8L1.3 3H8l4.7 6.2L18.2 3Zm-1.2 16.2h1.8L7.1 4.7H5.1l11.9 14.5Z",
};

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}
