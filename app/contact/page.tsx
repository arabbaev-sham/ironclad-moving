"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark px-4">
      <div className="container-max">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="section-title mb-4">Contact Seattle Prime Movers</h1>
          <p className="section-subtitle mx-auto">
            Questions? Ready to book? We&apos;re available 7 days a week.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { Icon: Phone, title: "Call Us", value: COMPANY.phone, href: COMPANY.phoneHref },
              { Icon: Mail, title: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { Icon: MapPin, title: "Our Location", value: COMPANY.address, href: "#" },
              { Icon: Clock, title: "Business Hours", value: COMPANY.hours, href: null },
            ].map(({ Icon, title, value, href }) => (
              <div key={title} className="card-dark flex gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{title}</div>
                  {href ? (
                    <a href={href} className="text-white hover:text-emerald-400 transition-colors text-sm cursor-pointer">
                      {value}
                    </a>
                  ) : (
                    <span className="text-white text-sm">{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="glass rounded-2xl overflow-hidden h-48 relative">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
                }&q=2200+W+Meeker+St+Kent+WA&zoom=14`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seattle Prime Movers location"
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 md:p-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-10 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-xl font-heading font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-gray-400">We&apos;ll get back to you within 1 hour.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white mb-5">Send a Message</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-dark">Name *</label>
                    <input value={name} onChange={e => setName(e.target.value)} className="input-dark" placeholder="Jane Smith" required />
                  </div>
                  <div>
                    <label className="label-dark">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="input-dark" placeholder="206-555-0100" />
                  </div>
                </div>
                <div>
                  <label className="label-dark">Email *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="input-dark" placeholder="jane@example.com" required />
                </div>
                <div>
                  <label className="label-dark">Subject *</label>
                  <select value={subject} onChange={e => setSubject(e.target.value)} className="input-dark cursor-pointer" required>
                    <option value="">Select a topic...</option>
                    {["Get a Moving Quote", "Book a Move", "Question About Services", "Service Area Inquiry", "Other"].map(s => (
                      <option key={s} value={s} className="bg-dark">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-dark">Message *</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} className="input-dark min-h-[120px] resize-none" placeholder="Tell us about your move or ask us anything..." required />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
