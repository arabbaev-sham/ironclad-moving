"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

const FAQS = [
  { q: "How much do movers cost in Seattle?", a: "Moving costs in Seattle typically range from $120–$160/hour for a 2-man crew, and $160–$200/hour for a 3-man crew. The total depends on move size, distance, and additional services. We provide free, detailed quotes with no hidden fees. Call 206-609-5878 or fill out our online form." },
  { q: "Do you move apartments and high-rise buildings?", a: "Absolutely. We specialize in apartment moves including high-rises, condos, and multi-floor units. Our crew handles elevator coordination, narrow hallways, and tight staircases safely." },
  { q: "Are you licensed and insured?", a: "Yes. IronClad Movers is fully licensed by the Washington State DOT and carries comprehensive liability and cargo insurance. All employees are background-checked. Proof of insurance available on request." },
  { q: "Do you offer same-day moving?", a: "Yes — based on availability. Call us as early as possible (ideally before 10 AM) to secure a same-day slot: 206-609-5878." },
  { q: "Is packing included in the price?", a: "Standard moves include loading, transport, and unloading. Full packing services are an add-on and include all materials. Partial packing (fragile items only) is also available — select it during booking." },
  { q: "How far in advance should I book?", a: "1–2 weeks ahead is ideal, especially during peak season (May–September) and end-of-month dates. We take last-minute and same-day bookings when available." },
  { q: "What areas do you serve?", a: "We serve Seattle and all cities within 150 miles in Washington State — Bellevue, Tacoma, Redmond, Everett, Kirkland, Olympia, and many more. Call us if you're unsure about your location." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-navy-900" id="faq">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-gold-300 text-xs font-display font-medium tracking-wide uppercase">FAQ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-3"
          >
            Frequently Asked <span className="gradient-gold">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Everything you need to know about moving with IronClad Movers.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-gold-500/25" : ""}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
                aria-expanded={open === i}
              >
                <span className={`font-display font-medium pr-4 transition-colors text-sm md:text-base ${
                  open === i ? "text-gold-400" : "text-white group-hover:text-gold-300"
                }`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                  open === i ? "rotate-180 text-gold-400" : "text-text-muted"
                }`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-text-muted mb-4 text-sm">Still have questions?</p>
          <Link href="/contact" className="btn-gold">Contact Us</Link>
        </motion.div>
      </div>
    </section>
  );
}
