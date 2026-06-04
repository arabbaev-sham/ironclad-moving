"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Users, Headphones, Award, ThumbsUp } from "lucide-react";
import { STATS } from "@/lib/utils";

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const steps = 50;
    const duration = 1200;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Number.isInteger(value) ? Math.floor(current) : parseFloat(current.toFixed(1)));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, value]);

  const shown = active ? display : 0;
  return <span>{Number.isInteger(value) ? Math.floor(shown) : shown.toFixed(1)}{suffix}</span>;
}

const FEATURES = [
  { Icon: Shield, title: "Licensed & Insured", desc: "WA DOT licensed and fully insured for your complete peace of mind on every job." },
  { Icon: Zap, title: "Same-Day Moving", desc: "Need to move urgently? We offer same-day services based on daily availability." },
  { Icon: Users, title: "Professional Crew", desc: "Background-checked, uniformed movers who treat your belongings with care." },
  { Icon: Headphones, title: "24/7 Support", desc: "Our team is reachable around the clock for questions, updates, and changes." },
  { Icon: Award, title: "No Hidden Fees", desc: "Transparent pricing with a detailed quote before your move ever begins." },
  { Icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "We don't stop until you're 100% satisfied — or we make it right, free of charge." },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-navy-900" id="why-us" ref={ref}>
      <div className="container-max">
        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map(({ value, suffix, label, animated }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden card text-center group"
            >
              {/* Gold top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold-gradient rounded-full" />
              <div className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-1">
                {animated
                  ? <CountUp value={value} suffix={suffix} active={inView} />
                  : <span>{value}{suffix}</span>}
              </div>
              <div className="text-xs text-text-muted font-display tracking-wide">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
          >
            <span className="text-gold-400 text-xs font-display font-medium tracking-wide uppercase">
              Why IronClad?
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-title mb-3"
          >
            The <span className="gradient-gold">IronClad</span> Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            We&apos;re not just another moving company — we&apos;re your Seattle neighbors who
            happen to be experts at getting you moved safely.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="flex gap-4 p-5 glass rounded-2xl hover:border-gold-500/20 transition-all group cursor-default"
            >
              <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0 border border-gold-500/15 group-hover:bg-gold-500/15 transition-colors">
                <Icon className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white mb-1 text-sm">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
