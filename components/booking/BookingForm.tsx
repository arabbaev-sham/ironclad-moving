"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Loader2 } from "lucide-react";
import { COMPANY } from "@/lib/utils";

type JobTab = "Moving Help" | "Labour Help" | "Commercial Help";

const schema = z.object({
  name:               z.string().min(2,  "Name is required"),
  email:              z.string().email("Valid email required"),
  phone:              z.string().min(10, "Valid phone required"),
  job_type:           z.string().min(1),
  crew_count:         z.string().min(1,  "Select crew count"),
  estimated_time:     z.string().min(1,  "Select estimated time"),
  loading_address:    z.string().min(5,  "Loading address required"),
  unloading_address:  z.string().min(5,  "Unloading address required"),
  job_date:           z.string().min(1,  "Select a date"),
  type_of_job:        z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const STEPS: string[]       = ["Details", "Job Details", "Review"];
const TABS: JobTab[]        = ["Moving Help", "Labour Help", "Commercial Help"];
const CREW_OPTIONS: string[]= ["2 crew", "3 crew", "4 crew", "5+ crew"];
const TIME_OPTIONS: string[]= ["1–2 hours", "2–4 hours", "4–6 hours", "6–8 hours", "Full day (8+ hrs)"];

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "yes" | "no" | null;
  onChange: (v: "yes" | "no") => void;
}) {
  return (
    <div>
      <label className="label-dark">{label}</label>
      <div className="flex gap-3 mt-1">
        {(["yes", "no"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              value === v
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "border-white/10 text-gray-400 hover:border-emerald-500/40 bg-white/5"
            }`}
          >
            {v === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BookingForm({ defaults }: { defaults?: Partial<FormData> }) {
  const [step, setStep]           = useState(0);
  const [tab, setTab]             = useState<JobTab>("Moving Help");
  const [needTruck, setNeedTruck] = useState<"yes" | "no" | null>(null);
  const [heavyItems, setHeavyItems] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      job_type:          "Moving Help",
      loading_address:   defaults?.loading_address   || "",
      unloading_address: defaults?.unloading_address || "",
      job_date:          defaults?.job_date           || "",
    },
  });

  const handleTabChange = (t: JobTab) => {
    setTab(t);
    setValue("job_type", t);
    setNeedTruck(null);
    setHeavyItems(null);
    setValue("type_of_job", "");
  };

  const nextStep = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      0: ["name", "email", "phone"],
      1: ["crew_count", "estimated_time", "loading_address", "unloading_address", "job_date"],
    };
    if (fields[step]) {
      const valid = await trigger(fields[step]);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });
      if (tab === "Moving Help") {
        fd.append("need_truck",  needTruck  || "");
        fd.append("heavy_items", heavyItems || "");
      }

      const res = await fetch("/api/bookings", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us at " + COMPANY.phone);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
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
            <span className="text-emerald-400 text-sm font-medium">Request Submitted Successfully</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-white mb-3">You&apos;re All Set!</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-2">
            We&apos;ll review your request and send a confirmation to your email within <strong className="text-white">1 hour</strong>.
          </p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
            Questions? Call us at{" "}
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
            onClick={() => { setSubmitted(false); setStep(0); setTab("Moving Help"); setNeedTruck(null); setHeavyItems(null); }}
            className="btn-outline-emerald"
          >
            Submit Another Request
          </button>
        </motion.div>
      </motion.div>
    );
  }

  /* ── Progress bar ── */
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${i <= step ? "text-emerald-400" : "text-gray-500"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step  ? "bg-emerald-500 text-white"
                : i === step ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400"
                : "bg-white/5 border border-white/10 text-gray-500"
              }`}>
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
        {/* ── Step 0: Contact Details ── */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white mb-5">Your Contact Info</h2>

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
          </motion.div>
        )}

        {/* ── Step 1: Job Details ── */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <h2 className="text-xl font-heading font-semibold text-white mb-2">Job Details</h2>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTabChange(t)}
                  className={`py-3 mr-5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    tab === t
                      ? "border-emerald-500 text-emerald-400"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Common fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-dark">Crew Count</label>
                <select {...register("crew_count")} className="input-dark cursor-pointer">
                  <option value="">Select...</option>
                  {CREW_OPTIONS.map((o) => <option key={o} value={o} className="bg-dark">{o}</option>)}
                </select>
                {errors.crew_count && <p className="text-red-400 text-xs mt-1">{errors.crew_count.message}</p>}
              </div>
              <div>
                <label className="label-dark">Estimated Time</label>
                <select {...register("estimated_time")} className="input-dark cursor-pointer">
                  <option value="">Select...</option>
                  {TIME_OPTIONS.map((o) => <option key={o} value={o} className="bg-dark">{o}</option>)}
                </select>
                {errors.estimated_time && <p className="text-red-400 text-xs mt-1">{errors.estimated_time.message}</p>}
              </div>
            </div>

            <div>
              <label className="label-dark">Loading Address</label>
              <input {...register("loading_address")} className="input-dark" placeholder="123 Main St, Seattle, WA" />
              {errors.loading_address && <p className="text-red-400 text-xs mt-1">{errors.loading_address.message}</p>}
            </div>

            <div>
              <label className="label-dark">Unloading Address</label>
              <input {...register("unloading_address")} className="input-dark" placeholder="456 Oak Ave, Bellevue, WA" />
              {errors.unloading_address && <p className="text-red-400 text-xs mt-1">{errors.unloading_address.message}</p>}
            </div>

            <div>
              <label className="label-dark">Preferred Date</label>
              <input
                {...register("job_date")}
                type="date"
                className="input-dark cursor-pointer"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.job_date && <p className="text-red-400 text-xs mt-1">{errors.job_date.message}</p>}
            </div>

            {/* Moving-only */}
            {tab === "Moving Help" && (
              <div className="space-y-4 pt-1">
                <YesNo label="Do you need a truck?" value={needTruck} onChange={setNeedTruck} />
                <YesNo label="Any heavy items? (piano, safe, etc.)" value={heavyItems} onChange={setHeavyItems} />
              </div>
            )}

            {/* Labour / Commercial */}
            {(tab === "Labour Help" || tab === "Commercial Help") && (
              <div>
                <label className="label-dark">What type of job?</label>
                <input
                  {...register("type_of_job")}
                  className="input-dark"
                  placeholder={
                    tab === "Labour Help"
                      ? "e.g. furniture assembly, loading help..."
                      : "e.g. office relocation, warehouse move..."
                  }
                />
              </div>
            )}
          </motion.div>
        )}

        {/* ── Step 2: Review ── */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white mb-5">Review Your Request</h2>

            <div className="glass rounded-2xl p-5 space-y-3 text-sm">
              {[
                { label: "Job Type",          value: tab },
                { label: "Name",              value: watch("name") },
                { label: "Email",             value: watch("email") },
                { label: "Phone",             value: watch("phone") },
                { label: "Crew Count",        value: watch("crew_count") },
                { label: "Estimated Time",    value: watch("estimated_time") },
                { label: "From",              value: watch("loading_address") },
                { label: "To",                value: watch("unloading_address") },
                { label: "Date",              value: watch("job_date") },
                ...(tab === "Moving Help" ? [
                  { label: "Needs Truck",     value: needTruck || "—" },
                  { label: "Heavy Items",     value: heavyItems || "—" },
                ] : []),
                ...(tab !== "Moving Help" && watch("type_of_job") ? [
                  { label: "Type of Job",     value: watch("type_of_job") || "" },
                ] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="text-gray-500 w-32 shrink-0">{label}</span>
                  <span className="text-white">{value || "—"}</span>
                </div>
              ))}
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

        {/* ── Navigation ── */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-secondary flex-1">
              Back
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={nextStep} className="btn-primary flex-1 justify-center">
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
              ) : (
                <><Calendar className="w-4 h-4" /> Submit Request</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
