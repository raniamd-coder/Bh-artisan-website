"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

type Booking = {
  id: string;
  name: string;
  date: string;
  workType: string;
  status: string;
};

export default function BookingClientPage() {
  const { token } = useParams<{ token: string }>();
  const searchParams = useSearchParams();
  const defaultAction = searchParams.get("action") as "annuler" | "modifier" | null;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [action, setAction] = useState<"annuler" | "modifier" | null>(defaultAction);
  const [newDate, setNewDate] = useState("");
  const [done, setDone] = useState(false);
  const [doneMessage, setDoneMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/booking/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setBooking(data);
      })
      .catch(() => setError("Erreur de chargement"));
  }, [token]);

  const handleSubmit = async () => {
    if (!action) return;
    if (action === "modifier" && !newDate) { setError("Veuillez choisir une nouvelle date."); return; }

    setLoading(true);
    const res = await fetch(`/api/booking/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, newDate: action === "modifier" ? newDate : undefined }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error); return; }

    setDoneMessage(
      action === "annuler"
        ? "Votre rendez-vous a bien été annulé."
        : `Votre demande de modification au ${newDate} a été envoyée. Bandar vous recontactera pour confirmer.`
    );
    setDone(true);
  };

  if (error) return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <p className="text-2xl font-bold text-gray-900 mb-2">Lien invalide</p>
        <p className="text-gray-500">{error}</p>
      </div>
    </main>
  );

  if (!booking) return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Chargement…</p>
    </main>
  );

  if (done) return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
        <p className="text-xl font-bold text-gray-900 mb-2">Demande prise en compte</p>
        <p className="text-gray-500 text-sm">{doneMessage}</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gérer mon rendez-vous</h1>
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
          <p><strong>{booking.name}</strong></p>
          <p>Date : <strong>{booking.date}</strong></p>
          <p>Type : <strong>{booking.workType}</strong></p>
          <p>Statut : <strong>{booking.status}</strong></p>
        </div>

        {booking.status === "annulé" ? (
          <p className="text-center text-red-500 font-medium">Ce rendez-vous a déjà été annulé.</p>
        ) : (
          <>
            {!action && (
              <div className="flex flex-col gap-3">
                <button onClick={() => setAction("modifier")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  📅 Modifier ma date
                </button>
                <button onClick={() => setAction("annuler")}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  ❌ Annuler mon rendez-vous
                </button>
              </div>
            )}

            {action === "modifier" && (
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-700">Nouvelle date souhaitée</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button onClick={handleSubmit} disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                  {loading ? "Envoi…" : "Confirmer la modification"}
                </button>
                <button onClick={() => { setAction(null); setError(""); }}
                  className="text-gray-500 text-sm underline">
                  Retour
                </button>
              </div>
            )}

            {action === "annuler" && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 text-sm">Êtes-vous sûr de vouloir annuler votre rendez-vous du <strong>{booking.date}</strong> ?</p>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button onClick={handleSubmit} disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                  {loading ? "Annulation…" : "Confirmer l'annulation"}
                </button>
                <button onClick={() => { setAction(null); setError(""); }}
                  className="text-gray-500 text-sm underline">
                  Retour
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
