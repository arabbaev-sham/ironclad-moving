"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { sendQuoteEmail } from "@/app/actions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Tab = "Moving Help" | "Labour Help" | "Commercial Help";
type Status = "idle" | "sending" | "done" | "error";

const TABS: Tab[] = ["Moving Help", "Labour Help", "Commercial Help"];
const CREW_OPTIONS = ["2 crew", "3 crew", "4 crew", "5+ crew"];
const TIME_OPTIONS = ["1–2 hours", "2–4 hours", "4–6 hours", "6–8 hours", "Full day (8+ hrs)"];

interface FormState {
  crew_count: string;
  estimated_time: string;
  loading_address: string;
  unloading_address: string;
  job_date: string;
  name: string;
  email: string;
  phone: string;
  need_truck: "yes" | "no" | null;
  heavy_items: "yes" | "no" | null;
  type_of_job: string;
}

const EMPTY: FormState = {
  crew_count: "",
  estimated_time: "",
  loading_address: "",
  unloading_address: "",
  job_date: "",
  name: "",
  email: "",
  phone: "",
  need_truck: null,
  heavy_items: null,
  type_of_job: "",
};

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30 bg-white";

const selectCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30 bg-white";

const labelCls = "block text-xs font-medium text-gray-500 mb-1.5";

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
      <p className={labelCls}>{label}</p>
      <div className="flex gap-3">
        {(["yes", "no"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
              value === v
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-gray-200 text-gray-500 hover:border-orange-300"
            }`}
          >
            {v === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function QuoteModal() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("Moving Help");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setForm(EMPTY);
      setErrorMsg("");
      setTab("Moving Help");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const isMoving = tab === "Moving Help";
    const hasJobType = tab === "Labour Help" || tab === "Commercial Help";

    const { error } = await supabase.from("bookings").insert([
      {
        job_type: tab,
        type_of_job: hasJobType ? form.type_of_job : null,
        crew_count: form.crew_count,
        estimated_time: form.estimated_time,
        loading_address: form.loading_address,
        unloading_address: form.unloading_address,
        job_date: form.job_date,
        need_truck: isMoving ? form.need_truck : null,
        heavy_items: isMoving ? form.heavy_items : null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        // satisfy legacy NOT NULL columns
        move_type: tab,
        move_date: form.job_date,
        pickup_address: form.loading_address,
        destination_address: form.unloading_address,
        status: "pending",
      },
    ]);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      await sendQuoteEmail({
        job_type: tab,
        type_of_job: hasJobType ? form.type_of_job : null,
        crew_count: form.crew_count,
        estimated_time: form.estimated_time,
        loading_address: form.loading_address,
        unloading_address: form.unloading_address,
        job_date: form.job_date,
        need_truck: isMoving ? form.need_truck : null,
        heavy_items: isMoving ? form.heavy_items : null,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      setStatus("done");
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 select-none"
      >
        Get Free Quote
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Backdrop + Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal card */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Get Free Quote</h2>
                <p className="text-xs text-gray-400 mt-0.5">We'll reply within 1 hour</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Done screen */}
            {status === "done" ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                  Your request has been received. We&apos;ll contact you within 1 hour to confirm details.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                  {TABS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`py-3.5 mr-5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                        tab === t
                          ? "border-orange-500 text-orange-500"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Crew + Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Crew Count</label>
                      <select
                        value={form.crew_count}
                        onChange={(e) => set("crew_count", e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="">Select...</option>
                        {CREW_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Estimated Time</label>
                      <select
                        value={form.estimated_time}
                        onChange={(e) => set("estimated_time", e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="">Select...</option>
                        {TIME_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div>
                    <label className={labelCls}>Loading Address</label>
                    <input
                      value={form.loading_address}
                      onChange={(e) => set("loading_address", e.target.value)}
                      required
                      placeholder="123 Main St, Seattle, WA"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Unloading Address</label>
                    <input
                      value={form.unloading_address}
                      onChange={(e) => set("unloading_address", e.target.value)}
                      required
                      placeholder="456 Oak Ave, Bellevue, WA"
                      className={inputCls}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className={labelCls}>Date</label>
                    <input
                      type="date"
                      value={form.job_date}
                      onChange={(e) => set("job_date", e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className={inputCls}
                    />
                  </div>

                  {/* Moving-only fields */}
                  {tab === "Moving Help" && (
                    <div className="space-y-3 pt-1">
                      <YesNo
                        label="Do you need a truck?"
                        value={form.need_truck}
                        onChange={(v) => set("need_truck", v)}
                      />
                      <YesNo
                        label="Any heavy items? (piano, safe, etc.)"
                        value={form.heavy_items}
                        onChange={(v) => set("heavy_items", v)}
                      />

                    </div>
                  )}

                  {/* Labour / Commercial job type */}
                  {(tab === "Labour Help" || tab === "Commercial Help") && (
                    <div>
                      <label className={labelCls}>What type of job?</label>
                      <input
                        value={form.type_of_job}
                        onChange={(e) => set("type_of_job", e.target.value)}
                        required
                        placeholder={
                          tab === "Labour Help"
                            ? "e.g. furniture assembly, loading help..."
                            : "e.g. office relocation, warehouse move..."
                        }
                        className={inputCls}
                      />
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-1">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                      Contact Info
                    </p>
                    <div className="space-y-3">
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        required
                        placeholder="Full Name"
                        className={inputCls}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          required
                          type="email"
                          placeholder="Email"
                          className={inputCls}
                        />
                        <input
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          required
                          type="tel"
                          placeholder="Phone"
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">
                      {errorMsg || "Something went wrong. Please try again."}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
