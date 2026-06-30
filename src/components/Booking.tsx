"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

const workTypes = [
  "Plâtrerie",
  "Peinture intérieure",
  "Peinture extérieure",
  "Rénovation complète",
  "Autre",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/bookings/unavailable-dates")
      .then((r) => r.json())
      .then((dates) => setUnavailableDates(dates))
      .catch(() => {});
  }, []);

  const isUnavailable = (date: string) => unavailableDates.includes(date);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const selectedDate = fd.get("date") as string;

    if (isUnavailable(selectedDate)) {
      setError("Cette date est déjà réservée. Veuillez en choisir une autre.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          date: selectedDate,
          workType: fd.get("workType"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase">
            Contactez-nous
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Prendre rendez-vous
          </h2>
          <p className="mt-4 text-gray-400 text-sm">
            Réponse garantie sous 24h.
          </p>
        </div>

        {submitted ? (
          <div className="bg-gray-950 rounded-3xl p-14 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-white mb-2">Demande envoyée !</p>
            <p className="text-gray-400 text-sm">Bandar vous contactera dans les plus brefs délais.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            {/* Left panel */}
            <div className="md:col-span-2 bg-blue-600 p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">PSS Bâtiment</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-10">
                  Artisan qualifié disponible partout en France. Devis gratuit, réponse rapide.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-sm text-white font-medium">07 58 10 59 44</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-white font-medium">contact@bh-platrier.fr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-white font-medium">Partout en France</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <form onSubmit={handleSubmit} ref={formRef} className="md:col-span-3 bg-gray-950 p-10 flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Nom complet *
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="jean@email.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Téléphone *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date souhaitée *
                  </label>
                  <input
                    required
                    name="date"
                    type="date"
                    title="Date souhaitée"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (isUnavailable(val)) {
                        e.target.setCustomValidity("Cette date est déjà réservée.");
                      } else {
                        e.target.setCustomValidity("");
                      }
                    }}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500">Les dates grisées sont déjà réservées.</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type de travaux *
                </label>
                <select
                  required
                  name="workType"
                  title="Type de travaux"
                  defaultValue=""
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="" disabled className="bg-gray-900 text-gray-400">
                    Sélectionner…
                  </option>
                  {workTypes.map((t) => (
                    <option key={t} value={t} className="bg-gray-900">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Décrivez votre projet…"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
              >
                {loading ? "Envoi en cours…" : "Envoyer la demande"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
