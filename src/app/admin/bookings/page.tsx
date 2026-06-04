"use client";

import { useEffect, useState } from "react";
import { Calendar, Phone, Mail, MapPin, Loader2, CheckCircle, Clock, XCircle } from "lucide-react";

interface Booking {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  move_type: string;
  move_date: string;
  pickup_address: string;
  destination_address: string;
  status: string;
  notes?: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  confirmed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  completed: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const adminKey = typeof window !== "undefined" ? sessionStorage.getItem("admin_key") || "" : "";

  useEffect(() => {
    fetch("/api/bookings", { headers: { "x-admin-key": adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setBookings(data); })
      .finally(() => setLoading(false));
  }, [adminKey]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ status }),
    });
    setBookings(b => b.map(bk => bk.id === id ? { ...bk, status } : bk));
  };

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl font-heading font-bold text-white">Bookings</h1>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                filter === s ? "bg-emerald-500 text-white" : "glass text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No bookings found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <div className="font-semibold text-white">{b.name}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1 flex-wrap">
                    <a href={`mailto:${b.email}`} className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                      <Mail className="w-3.5 h-3.5" /> {b.email}
                    </a>
                    <a href={`tel:${b.phone}`} className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                      <Phone className="w-3.5 h-3.5" /> {b.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2.5 py-1 rounded-full border capitalize ${STATUS_COLORS[b.status] || ""}`}>
                    {b.status}
                  </span>
                  <select
                    defaultValue={b.status}
                    onChange={e => updateStatus(b.id, e.target.value)}
                    className="text-xs bg-white/5 border border-white/10 text-white rounded-lg px-2 py-1 cursor-pointer"
                  >
                    {["pending", "confirmed", "completed", "cancelled"].map(s => (
                      <option key={s} value={s} className="bg-dark capitalize">{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{b.move_type} · {b.move_date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="truncate">{b.pickup_address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{b.destination_address}</span>
                </div>
              </div>
              {b.notes && (
                <div className="mt-3 text-xs text-gray-500 bg-white/5 rounded-lg px-3 py-2">
                  Note: {b.notes}
                </div>
              )}
              <div className="mt-3 text-xs text-gray-600">
                Submitted: {new Date(b.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
