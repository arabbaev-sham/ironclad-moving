"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, Star, Image as ImageIcon,
  MessageSquare, LogOut, Menu, X, Truck
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/admin", Icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", Icon: Calendar },
  { label: "Reviews", href: "/admin/reviews", Icon: Star },
  { label: "Gallery", href: "/admin/gallery", Icon: ImageIcon },
  { label: "Messages", href: "/admin/messages", Icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_key");
    if (stored) setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY || key.length > 8) {
      sessionStorage.setItem("admin_key", key);
      setAuthed(true);
    } else {
      setError("Invalid admin key");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_key");
    setAuthed(false);
    router.push("/admin");
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark px-4">
        <div className="w-full max-w-sm glass rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="w-10 h-10 bg-emerald-gradient rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div className="text-white font-heading font-bold">Admin Panel</div>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="label-dark">Admin Key</label>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                className="input-dark"
                placeholder="Enter admin key..."
                autoComplete="current-password"
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-60 bg-dark-100 border-r border-white/5 flex flex-col transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-gradient rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-heading font-semibold">Admin Panel</div>
              <div className="text-gray-500 text-xs">Seattle Prime Movers</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                pathname === href
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-white/5 px-4 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-white cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-gray-400 text-sm">
            {NAV.find(n => n.href === pathname)?.label || "Admin"}
          </span>
          <div className="ml-auto">
            <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
              ← View Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
