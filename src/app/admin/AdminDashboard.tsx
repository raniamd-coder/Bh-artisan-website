"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingActions } from "./BookingActions";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  workType: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

export function AdminDashboard({
  bookings,
  messages,
}: {
  bookings: Booking[];
  messages: Message[];
}) {
  const [tab, setTab] = useState<"bookings" | "messages">("bookings");
  const router = useRouter();

  const enAttente = bookings.filter((b) => b.status === "en_attente").length;
  const confirmes = bookings.filter((b) => b.status === "confirmé").length;
  const annules = bookings.filter((b) => b.status === "annulé").length;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="bh-logo text-4xl text-white leading-none">ℬℋ</span>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                Administration
              </p>
              <p className="text-xs text-gray-500">BH Artisan — Back office</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-xl transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          <StatCard label="Total RDV" value={bookings.length} color="blue" />
          <StatCard label="En attente" value={enAttente} color="amber" />
          <StatCard label="Confirmés" value={confirmes} color="green" />
          <StatCard label="Annulés" value={annules} color="red" />
          <StatCard label="Messages" value={messages.length} color="purple" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto scrollbar-hide">
          <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")}>
            Réservations
            <span className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {bookings.length}
            </span>
          </TabBtn>
          <TabBtn active={tab === "messages"} onClick={() => setTab("messages")}>
            Messages
            <span className="ml-2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {messages.length}
            </span>
          </TabBtn>
        </div>

        {/* Bookings */}
        {tab === "bookings" && (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-sm p-10 text-center">
                Aucune réservation pour le moment.
              </p>
            ) : (
              <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-5 py-4">Client</th>
                      <th className="text-left px-5 py-4">Contact</th>
                      <th className="text-left px-5 py-4">Date souhaitée</th>
                      <th className="text-left px-5 py-4">Travaux</th>
                      <th className="text-left px-5 py-4">Message</th>
                      <th className="text-left px-5 py-4">Statut</th>
                      <th className="text-left px-5 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr
                        key={b.id}
                        className={`border-t border-white/5 hover:bg-white/5 transition-colors ${
                          i % 2 !== 0 ? "bg-white/2" : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{b.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(b.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-blue-400 text-xs">{b.email}</p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {b.phone}
                          </p>
                        </td>
                        <td className="px-5 py-4 font-medium text-white">
                          {b.date}
                        </td>
                        <td className="px-5 py-4">
                          <span className="bg-blue-600/15 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/20">
                            {b.workType}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs max-w-48 truncate">
                          {b.message ?? (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="px-5 py-4">
                          <BookingActions id={b.id} status={b.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Messages */}
        {tab === "messages" && (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm p-10 text-center">
                Aucun message pour le moment.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-5 py-4">Expéditeur</th>
                      <th className="text-left px-5 py-4">Message</th>
                      <th className="text-left px-5 py-4">Reçu le</th>
                      <th className="text-left px-5 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((m, i) => (
                      <tr
                        key={m.id}
                        className={`border-t border-white/5 hover:bg-white/5 transition-colors ${
                          i % 2 !== 0 ? "bg-white/2" : ""
                        }`}
                      >
                        <td className="px-5 py-4 min-w-48">
                          <p className="font-semibold text-white">{m.name}</p>
                          <p className="text-blue-400 text-xs mt-0.5">
                            {m.email}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-gray-300 leading-relaxed">
                          {m.message}
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-5 py-4">
                          <DeleteMessageBtn id={m.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "amber" | "green" | "red" | "purple";
}) {
  const styles: Record<string, string> = {
    blue: "border-blue-500/20 text-blue-400",
    amber: "border-amber-500/20 text-amber-400",
    green: "border-green-500/20 text-green-400",
    red: "border-red-500/20 text-red-400",
    purple: "border-purple-500/20 text-purple-400",
  };

  return (
    <div
      className={`rounded-2xl border bg-white/5 p-5 ${styles[color]}`}
    >
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-xs mt-1 opacity-60 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center ${
        active
          ? "bg-white/10 text-white"
          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmé")
    return (
      <span className="text-xs bg-green-600/15 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
        ✓ Confirmé
      </span>
    );
  if (status === "annulé")
    return (
      <span className="text-xs bg-red-600/15 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
        ✗ Annulé
      </span>
    );
  return (
    <span className="text-xs bg-amber-600/15 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
      ⏳ En attente
    </span>
  );
}

function DeleteMessageBtn({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Supprimer ce message ?")) return;
    setLoading(true);
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs bg-white/5 hover:bg-red-600/20 text-gray-500 hover:text-red-400 px-2 py-1 rounded-full transition-colors disabled:opacity-50"
      title="Supprimer"
    >
      {loading ? "…" : "🗑"}
    </button>
  );
}
