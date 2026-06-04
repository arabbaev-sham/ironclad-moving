import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Award, Users, Heart, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | Seattle Prime Movers",
  description:
    "Learn about Seattle Prime Movers — Seattle's trusted, locally-owned moving company. Licensed, insured, and committed to making your move stress-free.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Our Story</span>
          </div>
          <h1 className="section-title mb-4">
            Seattle&apos;s <span className="gradient-text">Most Trusted</span> Movers
          </h1>
          <p className="section-subtitle mx-auto">
            We&apos;re a locally-owned Seattle moving company built on a simple promise: treat every
            customer&apos;s belongings like our own.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Why We Started</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Seattle Prime Movers was founded by a team of Seattle locals who were tired of
                unreliable movers, surprise fees, and damaged belongings. We knew there was a better way.
              </p>
              <p>
                Starting with a single truck and a commitment to excellence, we&apos;ve grown into one
                of Seattle&apos;s most trusted moving companies — completing over 5,000 moves across
                Washington State.
              </p>
              <p>
                Today, our team of professional, background-checked movers handles everything from
                studio apartments to full office relocations, always with the same care and transparency
                that built our reputation.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { Icon: Shield, title: "Licensed & Insured", desc: "WA DOT licensed and fully insured for your peace of mind" },
              { Icon: Award, title: "5,000+ Moves", desc: "Over 5,000 successful moves across Washington State" },
              { Icon: Users, title: "Professional Crew", desc: "Background-checked, trained, and dedicated team" },
              { Icon: Heart, title: "Community Focused", desc: "Proud Seattle locals serving our community" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="card-dark text-center p-5">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our commitment */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">Our Commitment to You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Arrive on time, every time",
              "No hidden fees — transparent pricing",
              "Professional padding and wrapping",
              "Background-checked, professional crew",
              "Real-time communication during your move",
              "Full liability insurance on every job",
              "Damage-free guarantee or we make it right",
              "Flexible scheduling, including weekends",
              "Same-day availability when needed",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-3">
            Ready to experience the Seattle Prime difference?
          </h2>
          <p className="text-gray-400 mb-6">{COMPANY.address} · {COMPANY.hours}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book" className="btn-primary">
              Book Your Move <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={COMPANY.phoneHref} className="btn-secondary">
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
