"use client";

import { useState, FormEvent } from "react";
import FadeIn from "./FadeIn";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
            On est à l’écoute
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
            Contactez-nous
          </h2>
          <p className="mt-4 text-gray-500 text-sm">
            Une question ? Envoyez-nous un message.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">

          {/* Left — info */}
          <div className="md:col-span-2 bg-blue-600 p-10 flex flex-col gap-8 justify-center">
            <div>
              <p className="text-blue-100 text-xs font-semibold tracking-widest uppercase mb-6">
                Informations
              </p>
              <div className="flex flex-col gap-7">
                <a href="tel:+33758105944" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Téléphone</p>
                    <p className="text-white font-semibold text-sm">07 58 10 59 44</p>
                  </div>
                </a>

                <a href="mailto:contact@bh-platrier.fr" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Email</p>
                    <p className="text-white font-semibold text-sm">contact@bandarhamoud.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs">Zone</p>
                    <p className="text-white font-semibold text-sm">Partout en France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          {sent ? (
            <div className="md:col-span-3 bg-gray-900 flex items-center justify-center p-14 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-white mb-2">Message envoyé !</p>
                <p className="text-gray-400 text-sm">Nous vous répondrons très rapidement.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="md:col-span-3 bg-gray-900 p-10 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nom *</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email *</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="votre@email.fr"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Votre message…"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                {loading ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
