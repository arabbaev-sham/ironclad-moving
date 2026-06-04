"use client";

import { useEffect, useState } from "react";
import { Star, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Review {
  id: string;
  created_at: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  move_type?: string;
  approved: boolean;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");

  const adminKey = typeof window !== "undefined" ? sessionStorage.getItem("admin_key") || "" : "";

  useEffect(() => {
    fetch("/api/reviews", { headers: { "x-admin-key": adminKey } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReviews(data); })
      .finally(() => setLoading(false));
  }, [adminKey]);

  const approve = async (id: string, approved: boolean) => {
    await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
      body: JSON.stringify({ id, approved }),
    });
    setReviews(r => r.map(rv => rv.id === id ? { ...rv, approved } : rv));
  };

  const filtered = filter === "all" ? reviews
    : filter === "pending" ? reviews.filter(r => !r.approved)
    : reviews.filter(r => r.approved);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl font-heading font-bold text-white">
          Reviews{" "}
          <span className="text-sm text-yellow-400">
            ({reviews.filter(r => !r.approved).length} pending)
          </span>
        </h1>
        <div className="flex gap-2">
          {(["pending", "approved", "all"] as const).map(s => (
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
        <div className="text-center py-16 text-gray-500">No reviews in this category</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className={`glass rounded-2xl p-5 ${!r.approved ? "border-yellow-400/20" : "border-emerald-500/20"}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.email} · {r.move_type}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-4 h-4 ${i <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!r.approved ? (
                    <button
                      onClick={() => approve(r.id, true)}
                      className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => approve(r.id, false)}
                      className="flex items-center gap-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Unapprove
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-3 text-xs text-gray-600">
                Submitted: {new Date(r.created_at).toLocaleString()} ·{" "}
                <span className={r.approved ? "text-emerald-400" : "text-yellow-400"}>
                  {r.approved ? "✓ Approved" : "⏳ Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
