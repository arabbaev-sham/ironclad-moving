import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY, SERVICE_CITIES } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      {/* CTA strip */}
      <div className="bg-gold-gradient py-6 px-4">
        <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-navy-950 text-lg">Ready to move?</p>
            <p className="text-navy-800 text-sm">Get a free quote — no obligations.</p>
          </div>
          <div className="flex gap-3">
            <a href={COMPANY.phoneHref}
              className="inline-flex items-center gap-2 bg-navy-950/20 hover:bg-navy-950/30 text-navy-950 font-semibold px-5 py-2.5 rounded-xl border border-navy-950/20 transition-colors text-sm cursor-pointer">
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
            <Link href="/book"
              className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 hover:bg-navy-800 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm cursor-pointer">
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="section-padding py-16">
        <div className="container-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image
                src="/logo.png"
                alt="IronClad Moving logo"
                width={40}
                height={40}
                className="rounded-xl object-contain"
              />
              <div>
                <span className="font-heading font-bold text-white">IronClad</span>
                <span className="font-heading font-bold text-gold-400"> Movers</span>
                <div className="text-[9px] text-text-muted tracking-widest -mt-0.5 uppercase">Est. 2024</div>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              Seattle&apos;s premier moving company. Licensed, insured, and trusted by 500+ happy customers across Washington State.
            </p>
            <div className="flex gap-2">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11a4.5 4.5 0 0 1-4.5 4.5h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z" },
                { label: "X / Twitter", path: "M4 4l16 16M20 4 4 20" },
              ].map(({ label, path }) => (
                <a key={label} href="#" aria-label={label} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-text-muted hover:text-gold-400 hover:border-gold-500/30 transition-all cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path d={path} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Services</h3>
            <ul className="space-y-2">
              {["Local Moving", "Long Distance", "Apartment Moving", "Office Relocation", "Packing Services", "Furniture Assembly", "Storage Solutions"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-text-muted hover:text-gold-400 transition-colors cursor-pointer">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Company</h3>
            <ul className="space-y-2">
              {[["About Us", "/about"], ["Reviews", "/reviews"], ["Gallery", "/gallery"], ["Blog", "/blog"], ["Contact", "/contact"], ["Book Now", "/book"]].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-text-muted hover:text-gold-400 transition-colors cursor-pointer">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact</h3>
            <ul className="space-y-3">
              {[
                { Icon: Phone, value: COMPANY.phone, href: COMPANY.phoneHref },
                { Icon: Mail, value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { Icon: MapPin, value: COMPANY.address, href: null },
                { Icon: Clock, value: COMPANY.hours, href: null },
              ].map(({ Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3 text-sm text-text-muted">
                  <Icon className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  {href ? <a href={href} className="hover:text-gold-400 transition-colors cursor-pointer">{value}</a> : <span>{value}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities */}
        <div className="container-max mt-12 pt-8 border-t border-white/5">
          <p className="text-[10px] text-text-muted font-semibold uppercase tracking-[0.2em] mb-3">Service Areas</p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CITIES.slice(0, 10).map((city) => (
              <Link key={city.slug} href={`/service-areas/${city.slug}`}
                className="text-xs text-text-muted hover:text-gold-400 transition-colors bg-white/3 hover:bg-gold-500/10 px-3 py-1 rounded-full border border-white/5 hover:border-gold-500/20 cursor-pointer">
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-5 px-4">
        <div className="container-max flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} IronClad Movers. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms</Link>
            <span>{COMPANY.license}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
