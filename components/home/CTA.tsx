"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Calendar } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function CTA() {
  return (
    <section className="section-padding bg-navy-800 overflow-hidden">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gold-gradient p-10 md:p-16 text-center shadow-gold-lg"
        >
          {/* Background texture */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }} />
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-navy-950/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="text-navy-800 text-sm font-display font-semibold uppercase tracking-widest mb-3">
              IronClad Movers · Seattle, WA
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-950 mb-4">
              Ready to Make Your Move?
            </h2>
            <p className="text-navy-800 text-lg max-w-xl mx-auto mb-8">
              Join 500+ happy Seattle customers. Get a free quote in minutes — no
              obligations, no hidden fees.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/book"
                className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 hover:bg-navy-800 font-display font-semibold px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 shadow-lg">
                <Calendar className="w-5 h-5" />
                Book Your Move
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={COMPANY.phoneHref}
                className="inline-flex items-center gap-2 bg-navy-950/20 hover:bg-navy-950/30 text-navy-950 font-display font-semibold px-8 py-4 rounded-xl border border-navy-950/20 transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </div>
            <p className="text-navy-700 text-sm mt-6">
              Free quotes · No hidden fees · Licensed &amp; insured
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
