import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SERVICE_CITIES, COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Moving Service Areas | Seattle Prime Movers — Washington State",
  description:
    "Seattle Prime Movers serves Seattle and all cities within 150 miles in Washington State. Check if we service your area — we cover Bellevue, Tacoma, Everett, Olympia, and 50+ more cities.",
};

export default function ServiceAreasPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Service Areas</span>
          </div>
          <h1 className="section-title mb-4">
            We Serve Seattle &{" "}
            <span className="gradient-text">All of Washington State</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Our fleet covers every city within 150 miles of Seattle. Professional moving services
            wherever you need us in Washington State.
          </p>
        </div>

        {/* Map */}
        <div className="glass rounded-2xl overflow-hidden mb-12 h-72 md:h-96 relative">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
            }&q=Seattle,WA&zoom=7`}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Seattle Prime Movers service area map"
            className="absolute inset-0"
          />
        </div>

        {/* City grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {SERVICE_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/service-areas/${city.slug}`}
              className="card-dark flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {city.name}
                  </div>
                  <div className="text-xs text-gray-500">{city.state}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-all group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-3xl p-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-3">
            Don&apos;t see your city?
          </h2>
          <p className="text-gray-400 mb-6">
            We may still service your area. Call us or fill out a quote form and we&apos;ll let you
            know right away.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book" className="btn-primary">Get a Quote</Link>
            <a href={COMPANY.phoneHref} className="btn-secondary">Call {COMPANY.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
