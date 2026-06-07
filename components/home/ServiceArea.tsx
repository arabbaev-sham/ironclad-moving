"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_CITIES, COMPANY } from "@/lib/utils";

export default function ServiceArea() {
  return (
    <section className="section-padding bg-navy-800" id="service-area">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300 text-xs font-display font-medium tracking-wide uppercase">Coverage Area</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mb-4"
            >
              Seattle & All of{" "}
              <span className="gradient-gold">Washington State</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted leading-relaxed mb-8"
            >
              Our fleet covers every city within 150 miles of Seattle — from Olympia
              to Bellingham, from Bremerton to Spokane.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8"
            >
              {SERVICE_CITIES.map((city, i) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={`/service-areas/${city.slug}`}
                    className="flex items-center gap-2 p-2.5 glass rounded-xl hover:border-gold-500/25 hover:bg-gold-500/5 transition-all group cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-gold-500 shrink-0" />
                    <span className="text-xs text-text-muted group-hover:text-white transition-colors">{city.name}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 flex-wrap"
            >
              <Link href="/service-areas" className="btn-gold">
                All Service Areas <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={COMPANY.phoneHref} className="btn-ghost">
                Call {COMPANY.phone}
              </a>
            </motion.div>
          </div>

          {/* Right: City list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 shadow-glass border border-gold-500/10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-white font-display font-semibold text-sm uppercase tracking-wider">Cities We Serve</span>
                <div className="glass-gold rounded-xl px-3 py-1.5 border border-gold-500/20">
                  <span className="font-heading font-bold text-gold-400 text-base">150+</span>
                  <span className="text-white text-xs ml-1">Miles Covered</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Seattle", "Kent", "Bellevue", "Tacoma", "Renton",
                  "Everett", "Redmond", "Kirkland", "Olympia", "Auburn",
                  "Federal Way", "Bothell", "Lynnwood", "Shoreline", "Burien",
                  "Puyallup", "Lakewood", "Bellingham", "Bremerton", "Spokane",
                  "Issaquah", "Sammamish", "Covington", "Maple Valley", "SeaTac",
                  "Tukwila", "Des Moines", "Marysville", "Edmonds", "Mountlake Terrace",
                ].map((city) => (
                  <div key={city} className="flex items-center gap-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                    <span className="text-xs text-text-muted">{city}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 border-t border-white/5 pt-4">
                + many more cities across Washington State
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
