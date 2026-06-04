import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | Seattle Prime Movers",
  description:
    "View our gallery of professional moves, trucks, and team photos. See the quality and care Seattle Prime Movers brings to every job.",
};

const GALLERY = [
  { id: 1, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Professional movers carrying sofa", category: "team", span: "lg:col-span-2 lg:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80", alt: "Moving truck Seattle", category: "truck", span: "" },
  { id: 3, src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", alt: "Packed moving boxes organized", category: "move", span: "" },
  { id: 4, src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80", alt: "New living room after move", category: "before-after", span: "" },
  { id: 5, src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80", alt: "Office furniture move", category: "move", span: "" },
  { id: 6, src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80", alt: "Moving team members", category: "team", span: "" },
  { id: 7, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Careful furniture wrapping", category: "move", span: "" },
  { id: 8, src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80", alt: "Loading moving truck", category: "truck", span: "" },
  { id: 9, src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", alt: "Apartment move complete", category: "before-after", span: "lg:col-span-2" },
];

const CATEGORIES = ["All", "team", "truck", "move", "before-after"] as const;

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Gallery</span>
          </div>
          <h1 className="section-title mb-4">Our Work in Action</h1>
          <p className="section-subtitle mx-auto">
            Real moves, real results. Browse photos and videos from our professional moving jobs.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] mb-10">
          {GALLERY.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading={item.id <= 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {item.alt}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-emerald-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full capitalize">
                  {item.category.replace("-", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-3xl p-8">
          <h2 className="text-xl font-heading font-bold text-white mb-2">Ready to become our next happy customer?</h2>
          <p className="text-gray-400 text-sm mb-5">Join thousands of Seattle-area residents who trusted us with their move.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book" className="btn-primary">Book Your Move <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/reviews" className="btn-secondary">Read Reviews</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
