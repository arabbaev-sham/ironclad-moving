"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, ArrowRight, ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category?: string;
}

// Placeholder tiles shown when no photos are uploaded yet
const PLACEHOLDER_TILES = [
  { id: "p1", label: "Local Moves", icon: "🏠" },
  { id: "p2", label: "Long Distance", icon: "🚛" },
  { id: "p3", label: "Apartment Moves", icon: "🏢" },
  { id: "p4", label: "Office Relocation", icon: "💼" },
  { id: "p5", label: "Packing Services", icon: "📦" },
  { id: "p6", label: "Our Team", icon: "👷" },
];

function EmptyGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {PLACEHOLDER_TILES.map((tile, i) => (
        <motion.div
          key={tile.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          className="aspect-video rounded-2xl glass flex flex-col items-center justify-center gap-2 border border-white/8 hover:border-gold-500/20 transition-colors cursor-default group"
        >
          <div className="text-3xl">{tile.icon}</div>
          <span className="text-text-muted text-xs font-display group-hover:text-gold-400 transition-colors">{tile.label}</span>
        </motion.div>
      ))}
      {/* Upload prompt tile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.42 }}
        className="aspect-video rounded-2xl bg-gold-500/5 border border-gold-500/20 border-dashed flex flex-col items-center justify-center gap-2 cursor-default"
      >
        <ImageIcon className="w-7 h-7 text-gold-500/50" />
        <p className="text-gold-500/60 text-xs font-display text-center px-2">
          Photos appear here after upload via Admin
        </p>
        <Link href="/admin/gallery" className="text-[10px] text-gold-400 hover:underline cursor-pointer">
          Go to Admin
        </Link>
      </motion.div>
    </div>
  );
}

// Grid layouts for different photo counts
const SPAN_PATTERNS = [
  "col-span-2 row-span-2",
  "", "",
  "", "", "",
  "col-span-2",
];

export default function Gallery({ photos }: { photos?: GalleryItem[] }) {
  const hasPhotos = photos && photos.length > 0;

  return (
    <section className="section-padding bg-navy-900" id="gallery">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
            >
              <Camera className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-gold-300 text-xs font-display font-medium tracking-wide uppercase">Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Our Work in <span className="gradient-gold">Action</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted mt-2"
            >
              Real moves, real results. Photos uploaded directly by our team.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/gallery" className="btn-outline whitespace-nowrap">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {hasPhotos ? (
          /* Masonry grid with uploaded photos */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {photos!.slice(0, 7).map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${SPAN_PATTERNS[i] || ""}`}
              >
                <Image
                  src={photo.url}
                  alt={photo.title || "IronClad Movers gallery"}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {photo.title && (
                    <span className="text-xs text-white font-display bg-navy-950/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {photo.title}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* More photos tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-gold-gradient flex items-center justify-center cursor-pointer group"
            >
              <Link href="/gallery" className="absolute inset-0 flex flex-col items-center justify-center text-navy-950 cursor-pointer">
                <Camera className="w-7 h-7 mb-1.5 group-hover:scale-110 transition-transform" />
                <span className="font-display font-semibold text-sm">All Photos</span>
                <ArrowRight className="w-4 h-4 mt-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        ) : (
          <EmptyGallery />
        )}
      </div>
    </section>
  );
}
