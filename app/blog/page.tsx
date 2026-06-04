import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Moving Tips & Resources | Seattle Prime Movers Blog",
  description:
    "Moving tips, neighborhood guides, and resources for Seattle-area residents. Expert advice from Seattle's top-rated moving company.",
};

const POSTS = [
  {
    slug: "how-much-do-movers-cost-seattle",
    title: "How Much Do Movers Cost in Seattle? (2025 Pricing Guide)",
    excerpt: "A complete breakdown of moving costs in Seattle — hourly rates, flat-rate options, and money-saving tips from local experts.",
    category: "Pricing",
    readTime: "8 min read",
    date: "May 2025",
    featured: true,
  },
  {
    slug: "best-neighborhoods-seattle-2025",
    title: "Best Neighborhoods in Seattle for Families, Young Professionals & Retirees",
    excerpt: "Thinking of moving to Seattle? Here's an honest guide to Seattle's best neighborhoods — from Capitol Hill to Ballard.",
    category: "Seattle Guide",
    readTime: "10 min read",
    date: "April 2025",
    featured: true,
  },
  {
    slug: "apartment-moving-tips-seattle",
    title: "Apartment Moving Tips in Seattle: High-Rise, Condo & Studio Guide",
    excerpt: "Moving in or out of a Seattle apartment? Here's everything you need to know — elevator reservations, parking permits, and more.",
    category: "Moving Tips",
    readTime: "6 min read",
    date: "March 2025",
    featured: false,
  },
  {
    slug: "how-to-move-cheaply-washington",
    title: "How to Move Cheaply in Washington State (Without Cutting Corners)",
    excerpt: "Smart strategies to reduce your moving costs without sacrificing reliability or safety. Practical tips from real movers.",
    category: "Moving Tips",
    readTime: "7 min read",
    date: "February 2025",
    featured: false,
  },
  {
    slug: "office-moving-checklist-seattle",
    title: "Office Moving Checklist: A Complete Guide for Seattle Businesses",
    excerpt: "Planning a commercial move in Seattle? Use this step-by-step checklist to minimize downtime and keep your business running.",
    category: "Business",
    readTime: "9 min read",
    date: "January 2025",
    featured: false,
  },
  {
    slug: "moving-to-bellevue-guide",
    title: "Moving to Bellevue, WA: Everything You Need to Know",
    excerpt: "Bellevue is one of Washington's most desirable cities. Here's your complete relocation guide — neighborhoods, costs, and tips.",
    category: "City Guides",
    readTime: "8 min read",
    date: "December 2024",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = POSTS.filter((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Moving Resources</span>
          </div>
          <h1 className="section-title mb-4">Moving Tips & Seattle Guides</h1>
          <p className="section-subtitle mx-auto">
            Expert advice for your move — from Seattle neighborhoods to packing hacks.
          </p>
        </div>

        {/* Featured posts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-dark group cursor-pointer block">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h2 className="font-heading font-semibold text-white text-lg mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{post.date}</span>
                <span className="flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* More posts */}
        <div className="space-y-4">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-dark flex items-start justify-between gap-6 group cursor-pointer block">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h2 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 mt-1 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
