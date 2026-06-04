"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Upload, CheckCircle, Loader2, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [moveType, setMoveType] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    onDrop: (files) => setImages((p) => [...p, ...files].slice(0, 5)),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setError("Please select a star rating"); return; }
    if (!text.trim()) { setError("Please write a review"); return; }
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("rating", String(rating));
      fd.append("text", text);
      fd.append("moveType", moveType);
      images.forEach((f) => fd.append("images", f));
      const res = await fetch("/api/reviews", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10"
      >
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">
          Your review has been submitted and will appear after approval. We appreciate your feedback!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star rating */}
      <div>
        <label className="label-dark">Your Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              className="cursor-pointer transition-transform hover:scale-110"
              aria-label={`${i} stars`}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  i <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-dark">Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-dark"
            placeholder="Jane Smith"
            required
          />
        </div>
        <div>
          <label className="label-dark">Email (private)</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="input-dark"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label className="label-dark">Move Type</label>
        <select
          value={moveType}
          onChange={(e) => setMoveType(e.target.value)}
          className="input-dark cursor-pointer"
        >
          <option value="" className="bg-dark">Select type...</option>
          {["Local Move", "Long Distance", "Apartment Move", "Office Move", "Packing Services"].map((t) => (
            <option key={t} value={t} className="bg-dark">{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="label-dark">Your Review *</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-dark min-h-[120px] resize-none"
          placeholder="Tell us about your experience with Seattle Prime Movers..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">{text.length}/1000 characters</p>
      </div>

      {/* Image upload */}
      <div>
        <label className="label-dark">Add Photos (optional)</label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            isDragActive ? "border-emerald-400 bg-emerald-500/10" : "border-white/20 hover:border-emerald-500/40"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">Drop photos here or click to upload</p>
          <p className="text-xs text-gray-500 mt-1">Max 5 photos · 5MB each</p>
        </div>
        {images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {images.map((f, i) => (
              <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                  className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center cursor-pointer"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          <>Submit Review</>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Reviews are verified and appear after admin approval (typically within 24 hours).
      </p>
    </form>
  );
}
