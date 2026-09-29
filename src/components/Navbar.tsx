"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, socials } from "@/data/site";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > 40);
    setHidden(y > 200 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const activeHref = nav.find((n) => isActive(pathname, n.href))?.href;
  const pill = hovered ?? activeHref;

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
      >
        <motion.nav
          layout
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border-2 border-choco/10 px-3 transition-[background,box-shadow,padding] duration-500 ${
            compact
              ? "bg-garoto-yellow/90 py-1.5 shadow-[0_10px_30px_-12px_rgb(59_26_14/0.45)] backdrop-blur-md"
              : "bg-garoto-yellow py-2.5"
          }`}
          aria-label="Principal"
        >
          <Link href="/" className="shrink-0 transition-transform duration-300 hover:-rotate-3 hover:scale-105">
            <Logo className={`transition-all duration-500 ${compact ? "h-9" : "h-11"} w-auto`} />
          </Link>

          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {nav.map((item) => {
              const active = activeHref === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`label-caps relative z-10 block px-4 py-2.5 text-[1.15rem] transition-colors duration-300 ${
                      pill === item.href ? "text-white" : "text-choco"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {pill === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-garoto-red"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {socials.slice(0, 3).map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-full bg-garoto-red text-white transition-transform duration-300 ease-[var(--ease-pop)] hover:-translate-y-0.5 hover:rotate-6 hover:scale-110"
                  >
                    <SocialIcon name={s.key} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative grid size-11 place-items-center rounded-full bg-choco text-cream lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                className="absolute h-0.5 w-5 rounded bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                className="absolute h-0.5 w-5 rounded bg-current"
              />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-dots fixed inset-0 z-40 flex flex-col justify-between bg-garoto-red px-6 pb-10 pt-28 text-white lg:hidden"
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className={`label-caps block py-1 text-5xl sm:text-6xl ${
                      activeHref === item.href ? "text-garoto-yellow" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="flex gap-3"
            >
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-12 place-items-center rounded-full bg-garoto-yellow text-garoto-red"
                  >
                    <SocialIcon name={s.key} className="size-5" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
