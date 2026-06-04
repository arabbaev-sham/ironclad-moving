"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Truck, Building2, Briefcase, Package, Wrench, Archive, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  MapPin, Truck, Building2, Briefcase, Package, Wrench, Archive,
};

export default function Services() {
  return (
    <section className="section-padding bg-navy-800" id="services">
      <div className="container-max">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
          >
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-gold-300 text-xs font-display font-medium tracking-wide uppercase">What We Offer</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-3"
          >
            Services Built for{" "}
            <span className="gradient-gold">Every Move</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            From studio apartments to corporate headquarters — we have the expertise
            and equipment for any job.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Truck;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/services#${service.id}`}
                  className="card flex flex-col h-full group cursor-pointer block"
                >
                  <div className="w-11 h-11 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4 border border-gold-500/15 group-hover:bg-gold-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-gold-400 text-sm font-display font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: SERVICES.length * 0.07 }}
            className="bg-gold-gradient rounded-2xl p-6 flex flex-col justify-between min-h-[180px] shadow-gold"
          >
            <div>
              <h3 className="font-heading font-semibold text-navy-950 text-lg mb-2">
                Not sure what you need?
              </h3>
              <p className="text-navy-800 text-sm">
                Our team will help you find the right solution.
              </p>
            </div>
            <Link href="/contact"
              className="mt-4 inline-flex items-center gap-2 bg-navy-900 text-gold-400 hover:bg-navy-800 font-display font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer w-fit">
              Talk to Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
