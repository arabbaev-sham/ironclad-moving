"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Review {
  id?: string;
  name: string;
  rating: number;
  text: string;
  move_type?: string;
  created_at?: string;
}

// Fallback demo reviews shown before any real ones are submitted
const DEMO_REVIEWS: Review[] = [
  { id: "d1", name: "Jennifer M.", rating: 5, text: "Absolutely incredible service. The crew showed up on time, handled everything with care, and finished ahead of schedule. IronClad Movers is the real deal!", move_type: "Local Move", created_at: "2025-03-12" },
  { id: "d2", name: "David K.", rating: 5, text: "Moved from Capitol Hill to Bellevue and it couldn't have been smoother. Transparent pricing, zero damage, friendly team. Will 100% use again.", move_type: "Local Move", created_at: "2025-02-28" },
  { id: "d3", name: "Sarah L.", rating: 5, text: "They wrapped everything perfectly and reassembled my furniture better than I could have. Worth every penny and then some.", move_type: "Apartment Move", created_at: "2025-01-19" },
  { id: "d4", name: "Marcus T.", rating: 5, text: "Office relocation done over a weekend with zero downtime. Professionalism at its finest. Highly recommend to any business.", move_type: "Office Move", created_at: "2024-12-05" },
  { id: "d5", name: "Emily R.", rating: 5, text: "Same-day move request and they made it happen! Super grateful. Fast, careful, and no surprise fees.", move_type: "Same-Day", created_at: "2024-11-20" },
];

function Stars({ n, size = "sm" }: { n: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${cls} ${i <= n ? "text-gold-400 fill-gold-400" : "text-navy-500"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className={`card relative overflow-hidden h-full flex flex-col ${featured ? "border-gold-500/20" : ""}`}>
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center font-heading font-bold text-gold-400 shrink-0">
          {review.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-white text-sm">{review.name}</div>
          <div className="text-xs text-text-muted">{date}{review.move_type && ` · ${review.move_type}`}</div>
        </div>
        <Quote className="w-6 h-6 text-gold-500/20 shrink-0" />
      </div>
      <Stars n={review.rating} />
      <p className="text-text-muted text-sm leading-relaxed mt-3 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

function SubmitForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hov, setHov] = useState(0);
  const [text, setText] = useState("");
  const [moveType, setMoveType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!rating) { setError("Please select a star rating"); return; }
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("name", name); fd.append("rating", String(rating));
      fd.append("text", text); fd.append("moveType", moveType);
      const res = await fetch("/api/reviews", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      onSuccess();
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Your Name *</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="input" placeholder="Jane Smith" required />
        </div>
        <div>
          <label className="label">Move Type</label>
          <select value={moveType} onChange={e => setMoveType(e.target.value)} className="input cursor-pointer">
            <option value="" className="bg-navy-800">Select...</option>
            {["Local Move","Long Distance","Apartment Move","Office Move","Packing Services"].map(t => (
              <option key={t} value={t} className="bg-navy-800">{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Your Rating *</label>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(i => (
            <button key={i} type="button"
              onClick={() => setRating(i)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(0)}
              className="cursor-pointer transition-transform hover:scale-110" aria-label={`${i} stars`}>
              <Star className={`w-8 h-8 transition-colors ${i <= (hov || rating) ? "text-gold-400 fill-gold-400" : "text-navy-500"}`} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Your Review *</label>
        <textarea value={text} onChange={e => setText(e.target.value)}
          className="input min-h-[100px] resize-none"
          placeholder="Tell us about your experience with IronClad Movers..." required />
      </div>

      {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>}

      <button type="submit" disabled={loading} className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <>Submit Review</>}
      </button>
      <p className="text-xs text-text-muted text-center">Reviews appear after admin approval (usually within 24 hours).</p>
    </form>
  );
}

export default function Reviews({ reviews }: { reviews?: Review[] }) {
  const displayReviews = reviews && reviews.length > 0 ? reviews : DEMO_REVIEWS;
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const prev = () => setCurrent(c => (c - 1 + displayReviews.length) % displayReviews.length);
  const next = () => setCurrent(c => (c + 1) % displayReviews.length);

  return (
    <section className="section-padding bg-navy-800" id="reviews">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4"
          >
            <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            <span className="text-gold-300 text-xs font-display font-medium tracking-wide uppercase">Customer Reviews</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-3"
          >
            What Our <span className="gradient-gold">Customers</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Real reviews from verified IronClad Movers customers across Seattle.
          </motion.p>

          {/* Aggregate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-6 glass rounded-2xl px-8 py-4 mt-6"
          >
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-white">4.9</div>
              <Stars n={5} size="lg" />
              <p className="text-text-muted text-xs mt-1">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-gold-500/20" />
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-white">{displayReviews.length}</div>
              <p className="text-gold-400 text-sm font-display">Verified Reviews</p>
            </div>
          </motion.div>
        </div>

        {/* Carousel (featured) */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative card border-gold-500/20 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient flex items-center justify-center font-heading font-bold text-navy-950 text-lg shrink-0">
                    {displayReviews[current].name[0]}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">{displayReviews[current].name}</div>
                    <div className="text-xs text-text-muted">
                      {displayReviews[current].created_at
                        ? new Date(displayReviews[current].created_at!).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                        : ""}
                      {displayReviews[current].move_type && ` · ${displayReviews[current].move_type}`}
                    </div>
                    <Stars n={displayReviews[current].rating} size="lg" />
                  </div>
                  <Quote className="w-10 h-10 text-gold-500/15 ml-auto shrink-0" />
                </div>
                <p className="text-text-muted text-lg leading-relaxed italic">
                  &ldquo;{displayReviews[current].text}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <div className="flex gap-1.5">
                {displayReviews.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === current ? "bg-gold-400 w-6" : "bg-white/20 w-1.5"}`}
                    aria-label={`Review ${i + 1}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-gold-500/30 transition-all cursor-pointer" aria-label="Previous">
                  <ChevronLeft className="w-4 h-4 text-text-muted" />
                </button>
                <button onClick={next} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:border-gold-500/30 transition-all cursor-pointer" aria-label="Next">
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid of 3 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {displayReviews.slice(0, 3).map((r, i) => (
            <motion.div key={r.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <ReviewCard review={r} featured={i === 0} />
            </motion.div>
          ))}
        </div>

        {/* Write a review + view all */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/reviews" className="btn-outline">
              View All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={() => setShowForm(s => !s)} className="btn-gold">
              <MessageSquare className="w-4 h-4" />
              {showForm ? "Hide Form" : "Write a Review"}
            </button>
          </div>

          {/* Inline review form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl overflow-hidden"
              >
                <div className="card border-gold-500/20 mt-2">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient rounded-t-2xl" />
                  {submitted ? (
                    <div className="text-center py-6">
                      <CheckCircle className="w-12 h-12 text-gold-400 mx-auto mb-3" />
                      <h3 className="font-display font-bold text-white mb-1">Thank You!</h3>
                      <p className="text-text-muted text-sm">Your review will appear after approval.</p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-heading font-semibold text-white mb-1">Leave a Review</h3>
                      <div className="gold-divider mb-4" />
                      <SubmitForm onSuccess={() => setSubmitted(true)} />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
