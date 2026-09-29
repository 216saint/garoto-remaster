"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sac } from "@/data/site";

const subjects = ["Dúvida sobre produto", "Elogio", "Sugestão", "Reclamação", "Chocotour", "Outros"];

/**
 * Formulário do SAC. Sem backend configurado, abre o e-mail do SAC com a
 * mensagem preenchida; troque o handler pelo endpoint oficial quando houver.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const field =
    "peer w-full rounded-2xl border-2 border-choco/15 bg-white px-4 pb-2.5 pt-6 text-lg font-semibold outline-none transition focus:border-garoto-red";
  const lbl =
    "label-caps pointer-events-none absolute left-4 top-2 text-sm text-choco/55 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-garoto-red";

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const body = `Nome: ${d.get("nome")}\nE-mail: ${d.get("email")}\nTelefone: ${d.get("telefone") || "-"}\n\n${d.get("mensagem")}`;
        window.location.href = `mailto:${sac.email}?subject=${encodeURIComponent(String(d.get("assunto")))}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <label className="relative block">
        <input name="nome" required placeholder=" " className={field} autoComplete="name" />
        <span className={lbl}>Nome</span>
      </label>
      <label className="relative block">
        <input name="email" type="email" required placeholder=" " className={field} autoComplete="email" />
        <span className={lbl}>E-mail</span>
      </label>
      <label className="relative block">
        <input name="telefone" type="tel" placeholder=" " className={field} autoComplete="tel" />
        <span className={lbl}>Telefone (opcional)</span>
      </label>
      <label className="relative block">
        <select name="assunto" className={`${field} appearance-none`} defaultValue={subjects[0]}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="label-caps pointer-events-none absolute left-4 top-2 text-sm text-choco/55">Assunto</span>
      </label>
      <label className="relative block sm:col-span-2">
        <textarea name="mensagem" required placeholder=" " className={`${field} min-h-40`} />
        <span className={lbl}>Mensagem</span>
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className="label-caps rounded-full bg-garoto-red px-8 py-4 text-xl text-white shadow-[0_6px_0_#8f0009] transition-transform hover:-translate-y-1 active:translate-y-1">
          Enviar mensagem
        </button>
        <AnimatePresence>
          {sent && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} role="status" className="font-bold text-garoto-leaf">
              Obrigado! Seu e-mail foi preparado para envio.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
