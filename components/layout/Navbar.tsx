"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { COMPANY, cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "Local Moving", href: "/services#local-moving" },
      { label: "Long Distance", href: "/services#long-distance" },
      { label: "Apartment Moving", href: "/services#apartment-moving" },
      { label: "Office Relocation", href: "/services#office-relocation" },
      { label: "Packing Services", href: "/services#packing-services" },
    ],
  },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-900/95 backdrop-blur-xl border-b border-gold-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-max px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="IronClad Moving logo"
              width={44}
              height={44}
              className="rounded-xl object-contain"
              priority
            />
            <div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">IronClad</span>
              <span className="font-heading font-bold text-lg text-gold-400"> Movers</span>
              <div className="text-[9px] text-text-muted tracking-[0.2em] -mt-0.5 font-sans uppercase">Seattle · Est. 2024</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <button className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    pathname.startsWith(link.href) ? "text-gold-400" : "text-text-muted hover:text-white"
                  )}>
                    {link.label} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 glass-navy rounded-xl p-2 shadow-glass"
                      >
                        {link.children.map((c) => (
                          <Link key={c.href} href={c.href}
                            className="block px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    pathname === link.href ? "text-gold-400" : "text-text-muted hover:text-white"
                  )}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-sm text-text-muted hover:text-gold-400 transition-colors cursor-pointer">
              <Phone className="w-4 h-4 text-gold-500" />
              {COMPANY.phone}
            </a>
            <Link href="/book" className="btn-gold text-sm px-5 py-2.5">
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-white cursor-pointer"
            aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                      pathname === link.href
                        ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                        : "text-text-muted hover:bg-white/5 hover:text-white"
                    )}>
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((c) => (
                        <Link key={c.href} href={c.href}
                          className="block px-4 py-2 rounded-lg text-xs text-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2 border-t border-white/5 space-y-2">
                <a href={COMPANY.phoneHref}
                  className="flex items-center justify-center gap-2 py-3 px-4 glass rounded-xl text-gold-400 font-semibold text-sm cursor-pointer">
                  <Phone className="w-4 h-4" /> {COMPANY.phone}
                </a>
                <Link href="/book" className="btn-gold w-full justify-center text-sm">
                  Book Your Move
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
