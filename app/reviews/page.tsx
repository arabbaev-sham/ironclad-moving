import type { Metadata } from "next";
import ReviewForm from "@/components/reviews/ReviewForm";
import { Star, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews | Seattle Prime Movers",
  description:
    "Read real customer reviews of Seattle Prime Movers. 312 verified 5-star reviews from Seattle-area customers. Leave your own review today!",
};

const REVIEWS = [
  { id: 1, name: "Jennifer M.", location: "Seattle", rating: 5, text: "Best movers in Seattle! They were on time, incredibly careful with my furniture, and finished faster than expected. Will definitely use them again.", moveType: "Local Move", date: "March 2025" },
  { id: 2, name: "David K.", location: "Bellevue", rating: 5, text: "Moved from Bellevue to Tacoma and the whole experience was flawless. Professional crew, no hidden fees, and nothing broken. 10/10 recommend.", moveType: "Long Distance", date: "February 2025" },
  { id: 3, name: "Sarah L.", location: "Kirkland", rating: 5, text: "I was so stressed about moving my entire apartment. These guys made it effortless. They even helped reassemble my IKEA furniture. Amazing!", moveType: "Apartment Move", date: "January 2025" },
  { id: 4, name: "Marcus T.", location: "Redmond", rating: 5, text: "Our office relocation went incredibly smoothly. Minimal downtime, professional team, and great communication throughout. Highly recommend!", moveType: "Office Relocation", date: "December 2024" },
  { id: 5, name: "Emily R.", location: "Everett", rating: 5, text: "Called them on short notice for a same-day move and they delivered! Truly exceptional service. Fair pricing and zero damage to any items.", moveType: "Same-Day Move", date: "November 2024" },
  { id: 6, name: "Chris P.", location: "Renton", rating: 5, text: "Very professional, friendly and efficient. They wrapped everything carefully and delivered it all without a scratch. Price was fair and transparent.", moveType: "Local Move", date: "October 2024" },
  { id: 7, name: "Amanda W.", location: "Tacoma", rating: 5, text: "Used them twice now. Both times the crew showed up on time, worked hard, and were genuinely careful with our stuff. Will use again for sure.", moveType: "Local Move", date: "September 2024" },
  { id: 8, name: "Robert J.", location: "Federal Way", rating: 5, text: "The packing service was worth every penny. The team packed our entire 3-bedroom home in less than 4 hours. Incredible efficiency!", moveType: "Packing Services", date: "August 2024" },
  { id: 9, name: "Lisa H.", location: "Olympia", rating: 5, text: "Long-distance move from Olympia to Spokane. They took care of everything. Items arrived in perfect condition and ahead of schedule!", moveType: "Long Distance", date: "July 2024" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Reviews</span>
          </div>
          <h1 className="section-title mb-4">What Our Customers Say</h1>
          <p className="section-subtitle mx-auto">
            Real reviews from verified Seattle Prime Movers customers.
          </p>
          {/* Aggregate */}
          <div className="flex justify-center mt-6">
            <div className="glass rounded-2xl px-8 py-5 flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white">4.9</div>
                <StarRating rating={5} />
                <p className="text-gray-400 text-xs mt-1">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white">312</div>
                <p className="text-emerald-400 text-sm">Verified Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {REVIEWS.map((r) => (
            <div key={r.id} className="card-dark">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center font-bold text-emerald-400 shrink-0">
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.location} · {r.date}</div>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  {r.moveType}
                </span>
              </div>
              <StarRating rating={r.rating} />
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* Write a review */}
        <div id="write" className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Share Your Experience</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-white mb-2">Leave a Review</h2>
            <p className="text-gray-400 text-sm">Your feedback helps us improve and helps others make informed decisions.</p>
          </div>
          <div className="glass rounded-2xl p-6 md:p-8">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
}
