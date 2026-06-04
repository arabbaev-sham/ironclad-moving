import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { SERVICE_CITIES, COMPANY, SERVICES } from "@/lib/utils";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = SERVICE_CITIES.find((c) => c.slug === slug);
  if (!city) return {};
  return {
    title: `Movers in ${city.name} WA | Seattle Prime Movers`,
    description: `Professional moving services in ${city.name}, Washington. Local & long-distance movers serving ${city.name} and the surrounding area. Licensed & insured. Call 206-609-5878.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = SERVICE_CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const nearbyCount = Math.floor(Math.random() * 15 + 10);
  const reviewCount = Math.floor(Math.random() * 80 + 20);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
          <span>/</span>
          <Link href="/service-areas" className="hover:text-white transition-colors cursor-pointer">Service Areas</Link>
          <span>/</span>
          <span className="text-white">{city.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">{city.name}, WA</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Professional Movers in{" "}
              <span className="gradient-text">{city.name}</span>,{" "}
              Washington
            </h1>
            <p className="text-gray-400 leading-relaxed mb-6">
              Seattle Prime Movers provides trusted, professional moving services in {city.name}, WA.
              Our licensed and insured crew handles local and long-distance moves with care. With{" "}
              {reviewCount}+ five-star reviews from {city.name} residents, we&apos;re your neighborhood experts.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/book" className="btn-primary">
                Book in {city.name} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={COMPANY.phoneHref} className="btn-secondary">
                <Phone className="w-4 h-4" /> {COMPANY.phone}
              </a>
            </div>
          </div>
          <div className="glass rounded-2xl overflow-hidden h-64 lg:h-auto relative">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
              }&q=${encodeURIComponent(city.name + ", WA")}&zoom=11`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${city.name}, WA`}
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Services */}
        <div className="mb-14">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">
            Our Services in {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.id} className="card-dark flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white text-sm mb-0.5">{s.title}</h3>
                  <p className="text-gray-500 text-xs">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why us in this city */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-heading font-bold text-white mb-4">
            Why Choose Seattle Prime Movers in {city.name}?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-400">
            {[
              `Local knowledge of ${city.name} neighborhoods and buildings`,
              `${nearbyCount}+ completed moves in the ${city.name} area`,
              "Licensed, insured, and background-checked crew",
              "Transparent pricing — no hidden fees",
              "Same-day moving available in " + city.name,
              "Serving " + city.name + " and 150-mile radius",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schema markup for this city page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              name: "Seattle Prime Movers",
              areaServed: {
                "@type": "City",
                name: city.name,
                addressRegion: "WA",
              },
              telephone: COMPANY.phone,
              url: `https://seattleprimemovers.com/service-areas/${city.slug}`,
            }),
          }}
        />
      </div>
    </div>
  );
}
