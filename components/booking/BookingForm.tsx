"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Calendar, MapPin, Upload, CheckCircle, Loader2, X } from "lucide-react";
import { COMPANY } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  moveType: z.string().min(1, "Select a move type"),
  moveDate: z.string().min(1, "Select a move date"),
  pickupAddress: z.string().min(5, "Pickup address required"),
  pickupFloor: z.string().default("Ground"),
  destinationAddress: z.string().min(5, "Destination address required"),
  destinationFloor: z.string().default("Ground"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const MOVE_TYPES = [
  "Local Move (within Seattle)",
  "Long Distance (within WA)",
  "Apartment Move",
  "Office / Commercial Move",
  "Packing Services Only",
  "Furniture Assembly Only",
  "Storage Move",
];

const FLOORS = [
  "Ground / 1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th+ Floor",
  "Elevator Access",
];

const STEPS = ["Details", "Addresses", "Files", "Review"];

export default function BookingForm({ defaults }: { defaults?: Partial<FormData> }) {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      moveType: defaults?.moveType || "",
      moveDate: defaults?.moveDate || "",
      pickupAddress: defaults?.pickupAddress || "",
      destinationAddress: defaults?.destinationAddress || "",
      pickupFloor: "Ground / 1st Floor",
      destinationFloor: "Ground / 1st Floor",
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024,
    onDrop: (accepted) => setPhotos((p) => [...p, ...accepted].slice(0, 10)),
  });

  const nextStep = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      0: ["name", "email", "phone", "moveType", "moveDate"],
      1: ["pickupAddress", "pickupFloor", "destinationAddress", "destinationFloor"],
    };
    if (fields[step]) {
      const valid = await trigger(fields[step]);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v || ""));
      photos.forEach((f) => formData.append("photos", f));

      const res = await fetch("/api/bookings", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at " + COMPANY.phone);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/40"
        >
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">Booking Submitted Successfully</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-white mb-3">
            You&apos;re All Set!
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-2">
            Your booking request has been received. We&apos;ll confirm and send a price estimate to your email within <strong className="text-white">1 hour</strong>.
          </p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
            Questions? Call us anytime at{" "}
            <a href={COMPANY.phoneHref} className="text-emerald-400 hover:underline font-medium">{COMPANY.phone}</a>
          </p>

          <div className="grid sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8 text-sm">
            {[
              { step: "1", text: "Request received" },
              { step: "2", text: "We review & confirm" },
              { step: "3", text: "Move day!" },
            ].map(({ step, text }) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-xl py-3 px-4">
                <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1.5">{step}</div>
                <p className="text-gray-400 text-xs">{text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setSubmitted(false); setStep(0); }}
            className="btn-outline-emerald"
          >
            Book Another Move
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                i <= step ? "text-emerald-400" : "text-gray-500"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? "bg-emerald-500 text-white"
                    : i === step
                    ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400"
                    : "bg-white/5 border border-white/10 text-gray-500"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className="hidden sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-colors ${i < step ? "bg-emerald-500" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 0: Personal Details */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-heading font-semibold text-white mb-5">Your Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-dark">Full Name</label>
                <input {...register("name")} className="input-dark" placeholder="Jane Smith" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="label-dark">Phone Number</label>
                <input {...register("phone")} className="input-dark" placeholder="206-555-0100" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <label className="label-dark">Email Address</label>
              <input {...register("email")} type="email" className="input-dark" placeholder="jane@example.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-dark">Move Type</label>
                <select {...register("moveType")} className="input-dark cursor-pointer">
                  <option value="" disabled>Select type...</option>
                  {MOVE_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-dark">{t}</option>
                  ))}
                </select>
                {errors.moveType && <p className="text-red-400 text-xs mt-1">{errors.moveType.message}</p>}
              </div>
              <div>
                <label className="label-dark">Preferred Move Date</label>
                <input
                  {...register("moveDate")}
                  type="date"
                  className="input-dark cursor-pointer"
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.moveDate && <p className="text-red-400 text-xs mt-1">{errors.moveDate.message}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Addresses */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-heading font-semibold text-white mb-5">Move Addresses</h2>
            <div className="p-4 glass rounded-xl border-l-2 border-emerald-500">
              <div className="flex items-center gap-2 text-emerald-400 mb-3 text-sm font-medium">
                <MapPin className="w-4 h-4" /> Pickup Location
              </div>
              <div className="space-y-3">
                <div>
                  <label className="label-dark">Pickup Address</label>
                  <input {...register("pickupAddress")} className="input-dark" placeholder="123 Main St, Seattle, WA 98101" />
                  {errors.pickupAddress && <p className="text-red-400 text-xs mt-1">{errors.pickupAddress.message}</p>}
                </div>
                <div>
                  <label className="label-dark">Floor / Elevator</label>
                  <select {...register("pickupFloor")} className="input-dark cursor-pointer">
                    {FLOORS.map((f) => <option key={f} value={f} className="bg-dark">{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 glass rounded-xl border-l-2 border-white/20">
              <div className="flex items-center gap-2 text-white mb-3 text-sm font-medium">
                <MapPin className="w-4 h-4" /> Destination
              </div>
              <div className="space-y-3">
                <div>
                  <label className="label-dark">Destination Address</label>
                  <input {...register("destinationAddress")} className="input-dark" placeholder="456 Oak Ave, Bellevue, WA 98004" />
                  {errors.destinationAddress && <p className="text-red-400 text-xs mt-1">{errors.destinationAddress.message}</p>}
                </div>
                <div>
                  <label className="label-dark">Floor / Elevator</label>
                  <select {...register("destinationFloor")} className="input-dark cursor-pointer">
                    {FLOORS.map((f) => <option key={f} value={f} className="bg-dark">{f}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="label-dark">Special Instructions (optional)</label>
              <textarea {...register("notes")} className="input-dark min-h-[80px] resize-none" placeholder="Fragile items, parking info, special requirements..." />
            </div>
          </motion.div>
        )}

        {/* Step 2: Photo Upload */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-heading font-semibold text-white mb-2">Upload Photos</h2>
            <p className="text-gray-400 text-sm mb-5">
              Optional: Upload photos of your items to help us provide a more accurate quote.
            </p>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragActive ? "border-emerald-400 bg-emerald-500/10" : "border-white/20 hover:border-emerald-500/40 hover:bg-white/5"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">
                {isDragActive ? "Drop photos here..." : "Drag & drop photos here"}
              </p>
              <p className="text-gray-500 text-sm">or click to browse · Max 10 photos · 5MB each</p>
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((f, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-dark-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(f)}
                      alt={`Upload ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
                      aria-label="Remove photo"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-gray-500 text-xs">
              You can skip this step — photos are optional.
            </p>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-heading font-semibold text-white mb-5">Review Your Booking</h2>
            <div className="glass rounded-2xl p-5 space-y-3 text-sm">
              {[
                { label: "Move Type", value: watch("moveType") },
                { label: "Move Date", value: watch("moveDate") },
                { label: "Name", value: watch("name") },
                { label: "Email", value: watch("email") },
                { label: "Phone", value: watch("phone") },
                { label: "From", value: `${watch("pickupAddress")} (${watch("pickupFloor")})` },
                { label: "To", value: `${watch("destinationAddress")} (${watch("destinationFloor")})` },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-gray-500 w-24 shrink-0">{label}</span>
                  <span className="text-white">{value || "—"}</span>
                </div>
              ))}
              {photos.length > 0 && (
                <div className="flex gap-3">
                  <span className="text-gray-500 w-24 shrink-0">Photos</span>
                  <span className="text-white">{photos.length} photo(s) uploaded</span>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-emerald-300">
              <strong className="text-emerald-400">What happens next?</strong> We&apos;ll review your request
              and send a confirmation + price estimate to your email within 1 hour.
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="btn-primary flex-1 justify-center">
              {step === 2 ? "Review Booking" : "Continue"}
            </button>
          ) : (
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><Calendar className="w-4 h-4" /> Confirm Booking</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
