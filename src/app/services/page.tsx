import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Truck, Building2, Briefcase, Package, Wrench, Archive, ArrowRight, Phone, CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Moving Services Seattle | Seattle Prime Movers",
  description:
    "Full-service moving company in Seattle WA. Local moving, long-distance, apartment, office relocation, packing, furniture assembly, storage. Licensed & insured. Get a free quote!",
};

const iconMap: Record<string, React.ElementType> = {
  MapPin, Truck, Building2, Briefcase, Package, Wrench, Archive,
};

const SERVICES_DETAIL = [
  {
    id: "local-moving",
    icon: "MapPin",
    title: "Local Moving",
    price: "From $120/hr (2-man crew)",
    description: "Fast and stress-free local moves anywhere within the greater Seattle area and surrounding cities.",
    features: [
      "2 or 3-man professional crews",
      "Furniture padding & wrapping included",
      "Moving truck & equipment provided",
      "Floor & doorframe protection",
      "Same-day availability",
    ],
  },
  {
    id: "long-distance",
    icon: "Truck",
    title: "Long Distance Moving",
    price: "Custom quote",
    description: "Reliable, on-time long-distance moves throughout Washington State, up to 150 miles from Seattle.",
    features: [
      "Full inventory tracking",
      "GPS-tracked trucks",
      "Dedicated move coordinator",
      "Full cargo insurance",
      "Flexible scheduling",
    ],
  },
  {
    id: "apartment-moving",
    icon: "Building2",
    title: "Apartment Moving",
    price: "From $120/hr",
    description: "Expert apartment movers who handle elevators, stairs, tight hallways, and parking restrictions.",
    features: [
      "Elevator reservation coordination",
      "Staircase-trained crew",
      "Building regulations compliance",
      "High-rise specialists",
      "Efficient, careful packing",
    ],
  },
  {
    id: "office-relocation",
    icon: "Briefcase",
    title: "Office Relocation",
    price: "Custom quote",
    description: "Minimize downtime with our professional commercial moving services — weekends and after-hours available.",
    features: [
      "After-hours & weekend moves",
      "IT equipment handling",
      "Furniture disassembly/reassembly",
      "Secure document handling",
      "Project management included",
    ],
  },
  {
    id: "packing-services",
    icon: "Package",
    title: "Packing Services",
    price: "From $50/hr",
    description: "Full or partial packing with premium materials. We bring everything — you just tell us what to pack.",
    features: [
      "All packing supplies provided",
      "Fragile item specialists",
      "Custom crating available",
      "Unpacking service add-on",
      "Eco-friendly materials",
    ],
  },
  {
    id: "furniture-assembly",
    icon: "Wrench",
    title: "Furniture Assembly",
    price: "From $80/hr",
    description: "Professional assembly and disassembly of all furniture — IKEA, custom-built, and complex pieces.",
    features: [
      "IKEA & flat-pack experts",
      "All tools provided",
      "Bed frames & wardrobes",
      "Office furniture",
      "Same-day service",
    ],
  },
  {
    id: "storage-solutions",
    icon: "Archive",
    title: "Storage Solutions",
    price: "From $99/month",
    description: "Secure, climate-controlled storage for short or long-term needs in the Seattle area.",
    features: [
      "24/7 secured facilities",
      "Climate-controlled units",
      "Multiple unit sizes",
      "Month-to-month terms",
      "Pick-up & delivery available",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark">
      <div className="container-max px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Our Services</span>
          </div>
          <h1 className="section-title mb-4">
            Complete Moving Services in{" "}
            <span className="gradient-text">Seattle, WA</span>
          </h1>
          <p className="section-subtitle mx-auto">
            From a single room to a full corporate relocation — we handle every move with care,
            speed, and professionalism.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-6">
          {SERVICES_DETAIL.map((service, i) => {
            const Icon = iconMap[service.icon] || Truck;
            return (
              <div
                key={service.id}
                id={service.id}
                className="card-dark grid md:grid-cols-3 gap-6 scroll-mt-24"
              >
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="font-heading font-semibold text-white text-lg">{service.title}</h2>
                      <span className="text-emerald-400 text-sm">{service.price}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <Link href={`/book?moveType=${encodeURIComponent(service.title)}`} className="btn-primary justify-center">
                    Book This Service <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href={COMPANY.phoneHref} className="btn-secondary justify-center text-sm">
                    <Phone className="w-4 h-4" />
                    Call for Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center glass rounded-3xl p-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-3">
            Not sure which service you need?
          </h2>
          <p className="text-gray-400 mb-6">
            Our team will help you plan the perfect move. Call us or fill out a quick form.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book" className="btn-primary">Get Free Quote</Link>
            <a href={COMPANY.phoneHref} className="btn-secondary">
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
