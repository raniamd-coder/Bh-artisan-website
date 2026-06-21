"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingActions({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"confirmer" | "annuler" | "supprimer" | null>(null);

  const handleAction = async (action: "confirmer" | "annuler") => {
    setLoading(action);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    router.refresh();
    setLoading(null);
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer ce rendez-vous ?")) return;
    setLoading("supprimer");
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(null);
  };

  const deleteBtn = (
    <button
      onClick={handleDelete}
      disabled={loading !== null}
      className="text-xs bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-400 px-2 py-1 rounded-full transition-colors disabled:opacity-50"
      title="Supprimer"
    >
      {loading === "supprimer" ? "…" : "🗑"}
    </button>
  );

  if (status === "confirmé") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-green-600/20 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
          ✓ Confirmé
        </span>
        <button
          onClick={() => handleAction("annuler")}
          disabled={loading !== null}
          className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
        >
          {loading === "annuler" ? "…" : "Annuler"}
        </button>
        {deleteBtn}
      </div>
    );
  }

  if (status === "annulé") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs bg-red-600/20 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
          ✗ Annulé
        </span>
        <button
          onClick={() => handleAction("confirmer")}
          disabled={loading !== null}
          className="text-xs bg-green-600/20 hover:bg-green-600/40 text-green-400 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
        >
          {loading === "confirmer" ? "…" : "Confirmer"}
        </button>
        {deleteBtn}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction("confirmer")}
        disabled={loading !== null}
        className="text-xs bg-green-600/20 hover:bg-green-600/40 text-green-400 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
      >
        {loading === "confirmer" ? "…" : "Confirmer"}
      </button>
      <button
        onClick={() => handleAction("annuler")}
        disabled={loading !== null}
        className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
      >
        {loading === "annuler" ? "…" : "Annuler"}
      </button>
      {deleteBtn}
    </div>
  );
}
