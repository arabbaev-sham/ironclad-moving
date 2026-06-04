import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Phone } from "lucide-react";
import { COMPANY } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const POSTS: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}> = {
  "how-much-do-movers-cost-seattle": {
    title: "How Much Do Movers Cost in Seattle? (2025 Pricing Guide)",
    excerpt: "A complete breakdown of moving costs in Seattle — hourly rates, flat-rate options, and money-saving tips.",
    category: "Pricing",
    readTime: "8 min read",
    date: "May 2025",
    content: `
      <h2>Average Moving Costs in Seattle</h2>
      <p>Moving costs in Seattle depend on several factors: crew size, distance, time of year, and additional services. Here's a breakdown:</p>
      <ul>
        <li><strong>2-man crew:</strong> $120–$160/hour</li>
        <li><strong>3-man crew:</strong> $160–$220/hour</li>
        <li><strong>Studio apartment:</strong> $300–$600 total</li>
        <li><strong>1-bedroom:</strong> $500–$900 total</li>
        <li><strong>2-bedroom:</strong> $700–$1,400 total</li>
        <li><strong>3-bedroom home:</strong> $1,000–$2,500 total</li>
      </ul>
      <h2>What Affects the Cost?</h2>
      <p>Several factors influence your final moving cost in Seattle:</p>
      <ul>
        <li><strong>Distance:</strong> Local moves are billed hourly; long-distance moves often use flat rates</li>
        <li><strong>Timing:</strong> Moving on weekends or during summer (peak season) costs more</li>
        <li><strong>Floor level:</strong> High-rise apartments with stairs add time and cost</li>
        <li><strong>Specialty items:</strong> Pianos, safes, and antiques require extra care</li>
        <li><strong>Packing services:</strong> Add $50–$100/hour for professional packing</li>
      </ul>
      <h2>How to Save Money on Your Seattle Move</h2>
      <ul>
        <li>Book mid-week (Tuesday–Thursday) for lower rates</li>
        <li>Avoid end-of-month moving dates when demand peaks</li>
        <li>Pack your own boxes and just pay for loading/unloading</li>
        <li>Get multiple quotes and compare</li>
        <li>Book at least 2 weeks in advance</li>
      </ul>
      <h2>Get an Accurate Quote</h2>
      <p>The best way to get an accurate moving cost is to request a free quote from Seattle Prime Movers. We provide transparent, itemized quotes with no hidden fees. Call us at 206-609-5878 or book online.</p>
    `,
  },
  "best-neighborhoods-seattle-2025": {
    title: "Best Neighborhoods in Seattle for Families, Young Professionals & Retirees",
    excerpt: "An honest guide to Seattle's best neighborhoods.",
    category: "Seattle Guide",
    readTime: "10 min read",
    date: "April 2025",
    content: `
      <h2>Seattle's Best Neighborhoods in 2025</h2>
      <p>Seattle is one of the most livable cities in the Pacific Northwest, but choosing the right neighborhood makes all the difference. Here's our guide:</p>
      <h2>Best for Families: Bellevue & Kirkland</h2>
      <p>Bellevue offers top-rated schools, safe streets, and easy access to tech employers like Microsoft and Amazon. Kirkland provides a smaller-town feel with waterfront parks and excellent schools.</p>
      <h2>Best for Young Professionals: Capitol Hill & South Lake Union</h2>
      <p>Capitol Hill is Seattle's most vibrant urban neighborhood — walkable, diverse, and full of restaurants and nightlife. South Lake Union puts you steps from Amazon's headquarters.</p>
      <h2>Best for Retirees: Ballard & Queen Anne</h2>
      <p>Ballard has transformed into a charming neighborhood with craft breweries, farmers markets, and a strong Scandinavian heritage. Queen Anne offers stunning views and a quiet, community feel.</p>
      <h2>Moving to Seattle?</h2>
      <p>Whether you're moving within Seattle or relocating from another state, Seattle Prime Movers can help. We know every neighborhood and building in the city.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8 cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
              {post.category}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-400 text-lg">{post.excerpt}</p>
        </div>

        <div className="w-full h-px bg-white/10 mb-8" />

        <div
          className="prose prose-invert prose-emerald max-w-none text-gray-300 leading-relaxed
            prose-h2:text-white prose-h2:font-heading prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-li:text-gray-400 prose-ul:space-y-1
            prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-12 glass-emerald rounded-2xl p-6 text-center">
          <h3 className="font-heading font-bold text-white text-lg mb-2">
            Ready to plan your Seattle move?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Get a free quote from Seattle&apos;s most trusted moving company.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/book" className="btn-primary text-sm">Get Free Quote</Link>
            <a href={COMPANY.phoneHref} className="btn-secondary text-sm">
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
