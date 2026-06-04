"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield, Star, Clock, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

const MOVE_TYPES = ["Local Move", "Long Distance", "Apartment Move", "Office Move", "Packing Only"];

// Default fallback hero image (Unsplash — professional movers)
const DEFAULT_BG = "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1800&q=85";

export default function Hero({ heroBg }: { heroBg?: string | null }) {
  const [moveType, setMoveType] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);

  const bgUrl = heroBg || DEFAULT_BG;

  const handleQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ moveType, fromAddress, toAddress, moveDate });
    window.location.href = `/book?${params}`;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <Image
          src={bgUrl}
          alt="IronClad Movers — professional moving crew"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${bgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setBgLoaded(true)}
        />
        {/* Dark overlay: left heavy for readability, right lighter */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      </div>

      {/* Decorative gold glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container-max section-padding py-20 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: headline 3/5 */}
          <div className="lg:col-span-3">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              <span className="text-gold-300 text-xs font-display font-medium tracking-wide">
                Seattle&apos;s Trusted Movers — Est. 2024
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] mb-6"
            >
              Moving Made{" "}
              <span className="gradient-gold italic">IronClad.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-xl leading-relaxed mb-8 max-w-xl"
            >
              Professional, licensed, and insured movers serving Seattle and all of Washington State.
              500+ happy customers. Zero excuses.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { Icon: Shield, text: "Licensed & Insured" },
                { Icon: Clock, text: "Same-Day Available" },
                { Icon: CheckCircle, text: "100% Satisfaction" },
              ].map(({ Icon, text }) => (
                <div key={text}
                  className="flex items-center gap-1.5 text-sm text-text-muted bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
                  <Icon className="w-3.5 h-3.5 text-gold-400" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/book" className="btn-gold text-base px-8 py-4">
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={COMPANY.phoneHref} className="btn-ghost text-base px-8 py-4">
                <Phone className="w-4 h-4 text-gold-400" />
                {COMPANY.phone}
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { v: "500+", l: "Happy Customers" },
                { v: "4.9★", l: "Google Rating" },
                { v: "100%", l: "Satisfaction" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="text-2xl font-heading font-bold text-white">{v}</div>
                  <div className="text-xs text-text-muted mt-0.5">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Quote form 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 shadow-glass border border-gold-500/15">
              <div className="mb-5">
                <h2 className="font-heading font-semibold text-white text-lg mb-0.5">
                  Instant Quote
                </h2>
                <p className="text-text-muted text-xs">Free estimate · No spam · Reply in &lt;1 hour</p>
                <div className="gold-divider mt-2" />
              </div>

              <form onSubmit={handleQuote} className="space-y-3">
                <div>
                  <label className="label">Move Type</label>
                  <select value={moveType} onChange={e => setMoveType(e.target.value)}
                    className="input cursor-pointer" required>
                    <option value="" disabled className="bg-navy-800">Select type...</option>
                    {MOVE_TYPES.map(t => <option key={t} value={t} className="bg-navy-800">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Moving From</label>
                  <input value={fromAddress} onChange={e => setFromAddress(e.target.value)}
                    placeholder="City or address" className="input" required />
                </div>
                <div>
                  <label className="label">Moving To</label>
                  <input value={toAddress} onChange={e => setToAddress(e.target.value)}
                    placeholder="City or address" className="input" required />
                </div>
                <div>
                  <label className="label">Move Date</label>
                  <input type="date" value={moveDate} onChange={e => setMoveDate(e.target.value)}
                    className="input cursor-pointer"
                    min={new Date().toISOString().split("T")[0]} />
                </div>
                <button type="submit" className="btn-gold w-full justify-center py-3.5">
                  Get My Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Phone card */}
            <a href={COMPANY.phoneHref}
              className="mt-3 flex items-center gap-3 glass rounded-xl px-4 py-3 hover:border-gold-500/30 transition-all cursor-pointer group">
              <div className="w-9 h-9 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold-sm group-hover:shadow-gold transition-shadow">
                <Phone className="w-4 h-4 text-navy-950" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Call us directly — 7 days a week</p>
                <p className="font-display font-semibold text-white text-sm">{COMPANY.phone}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted ml-auto group-hover:text-gold-400 transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />
    </section>
  );
}
