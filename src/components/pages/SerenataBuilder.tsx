"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const presets = ["Você é meu bombom preferido.", "Pra você, com todo o meu amor.", "Obrigado por existir.", "Aceita uma Serenata?"];

/** Monte um cartão de Serenata de Amor e compartilhe. */
export function SerenataBuilder() {
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState(presets[0]);
  const [from, setFrom] = useState("");
  const [sent, setSent] = useState(false);

  const text = `Para ${to || "você"}: ${msg} — ${from || "alguém especial"} 💌 Serenata de Amor Garoto`;

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ text });
      else await navigator.clipboard.writeText(text);
      setSent(true);
      setTimeout(() => setSent(false), 2500);
    } catch {
      /* usuário cancelou o compartilhamento */
    }
  };

  const field = "w-full rounded-2xl border-2 border-[#9E0B22]/20 bg-white/80 px-4 py-3 text-lg font-semibold outline-none transition focus:border-[#C8102E]";

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); share(); }}>
        <label className="block">
          <span className="label-caps text-lg text-[#9E0B22]">Para</span>
          <input className={field} value={to} onChange={(e) => setTo(e.target.value)} placeholder="Nome de quem vai receber" maxLength={40} />
        </label>
        <div>
          <span className="label-caps text-lg text-[#9E0B22]">Mensagem</span>
          <div className="mb-2 mt-1 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setMsg(p)}
                className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${msg === p ? "bg-[#C8102E] text-white" : "bg-white/70 text-[#9E0B22] hover:bg-white"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <textarea className={`${field} min-h-24`} value={msg} onChange={(e) => setMsg(e.target.value)} maxLength={140} aria-label="Mensagem" />
        </div>
        <label className="block">
          <span className="label-caps text-lg text-[#9E0B22]">De</span>
          <input className={field} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Seu nome" maxLength={40} />
        </label>
        <button className="label-caps rounded-full bg-[#C8102E] px-7 py-4 text-xl text-white shadow-[0_6px_0_#7a0718] transition-transform hover:-translate-y-1 active:translate-y-1">
          Enviar minha Serenata ♥
        </button>
        <AnimatePresence>
          {sent && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-bold text-[#9E0B22]" role="status">
              Pronto! Sua Serenata está a caminho.
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <motion.div
        key={msg + to + from}
        initial={{ rotate: -3, scale: 0.97 }}
        animate={{ rotate: 2, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[36px] bg-[#C8102E] p-8 text-white shadow-[0_30px_60px_-20px_rgb(158_11_34/0.6)]"
        aria-live="polite"
      >
        <svg viewBox="0 0 24 24" className="absolute -right-10 -top-10 size-56 fill-white/10" aria-hidden>
          <path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z" />
        </svg>
        <p className="label-caps text-xl text-[#F7C6D0]">Serenata de Amor</p>
        <p className="mt-10 font-round text-lg font-semibold opacity-80">Para {to || "você"},</p>
        <p className="mt-2 font-round text-4xl font-extrabold italic leading-tight">{msg}</p>
        <p className="absolute bottom-8 left-8 font-round text-xl font-semibold">— {from || "alguém especial"}</p>
      </motion.div>
    </div>
  );
}
