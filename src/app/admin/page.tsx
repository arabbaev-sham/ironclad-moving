"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Star, MessageSquare, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react";

interface Stats {
  bookings: number;
  pending: number;
  reviews: number;
  unapproved: number;
  messages: number;
  unread: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    bookings: 0, pending: 0, reviews: 0, unapproved: 0, messages: 0, unread: 0,
  });

  useEffect(() => {
    const adminKey = sessionStorage.getItem("admin_key") || "";
    const headers = { "x-admin-key": adminKey };

    Promise.allSettled([
      fetch("/api/bookings", { headers }).then(r => r.json()),
      fetch("/api/reviews", { headers }).then(r => r.json()),
    ]).then(([bookingsRes, reviewsRes]) => {
      const bookings = bookingsRes.status === "fulfilled" ? bookingsRes.value : [];
      const reviews = reviewsRes.status === "fulfilled" ? reviewsRes.value : [];
      setStats({
        bookings: Array.isArray(bookings) ? bookings.length : 0,
        pending: Array.isArray(bookings) ? bookings.filter((b: { status: string }) => b.status === "pending").length : 0,
        reviews: Array.isArray(reviews) ? reviews.length : 0,
        unapproved: Array.isArray(reviews) ? reviews.filter((r: { approved: boolean }) => !r.approved).length : 0,
        messages: 0,
        unread: 0,
      });
    });
  }, []);

  const cards = [
    { label: "Total Bookings", value: stats.bookings, sub: `${stats.pending} pending`, Icon: Calendar, href: "/admin/bookings", color: "text-blue-400" },
    { label: "Reviews", value: stats.reviews, sub: `${stats.unapproved} awaiting approval`, Icon: Star, href: "/admin/reviews", color: "text-yellow-400" },
    { label: "Messages", value: stats.messages, sub: `${stats.unread} unread`, Icon: MessageSquare, href: "/admin/messages", color: "text-purple-400" },
    { label: "This Month", value: 24, sub: "Moves completed", Icon: TrendingUp, href: "/admin/bookings", color: "text-emerald-400" },
  ];

  const recentActivity = [
    { action: "New booking", detail: "Local move — Seattle to Bellevue", time: "5 min ago", status: "pending" },
    { action: "Review submitted", detail: "5★ from Jennifer M.", time: "1 hr ago", status: "pending" },
    { action: "Booking confirmed", detail: "Office relocation — Redmond", time: "2 hr ago", status: "confirmed" },
    { action: "Review approved", detail: "5★ from David K.", time: "3 hr ago", status: "approved" },
    { action: "New contact", detail: "Quote request — Tacoma move", time: "4 hr ago", status: "unread" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, sub, Icon, href, color }) => (
          <Link key={label} href={href} className="card-dark cursor-pointer group hover:border-emerald-500/30">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/5`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-emerald-400 transition-colors">View →</span>
            </div>
            <div className="text-3xl font-heading font-bold text-white mb-0.5">{value}</div>
            <div className="text-sm text-gray-300">{label}</div>
            <div className="text-xs text-gray-500 mt-1">{sub}</div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              {item.status === "approved" || item.status === "confirmed" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : item.status === "pending" ? (
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-blue-400 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white">{item.action}</span>
                <span className="text-sm text-gray-400"> — {item.detail}</span>
              </div>
              <span className="text-xs text-gray-500 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "View All Bookings", href: "/admin/bookings", color: "btn-primary" },
          { label: "Approve Reviews", href: "/admin/reviews", color: "btn-secondary" },
          { label: "Read Messages", href: "/admin/messages", color: "btn-secondary" },
        ].map(({ label, href, color }) => (
          <Link key={label} href={href} className={`${color} justify-center text-sm cursor-pointer`}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
