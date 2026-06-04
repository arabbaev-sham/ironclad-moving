import type { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm";
import { Calendar, Shield, Clock, Phone } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book Your Move | Seattle Prime Movers",
  description:
    "Book your move online with Seattle Prime Movers. Choose your date, enter addresses, upload photos, and get confirmation in 1 hour. Call 206-609-5878 anytime.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-dark">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5 mb-4">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Online Booking</span>
          </div>
          <h1 className="section-title mb-4">Book Your Move</h1>
          <p className="section-subtitle mx-auto">
            Fill out the form below and we&apos;ll confirm your booking with a price estimate within 1 hour.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { Icon: Shield, text: "Licensed & Insured" },
            { Icon: Clock, text: "1-Hour Confirmation" },
            { Icon: Phone, text: COMPANY.phone },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2 glass rounded-xl px-4 py-2 text-sm text-gray-300">
              <Icon className="w-4 h-4 text-emerald-400" />
              {text}
            </div>
          ))}
        </div>

        {/* Form container */}
        <div className="glass rounded-3xl p-6 md:p-10 shadow-glass">
          <BookingForm />
        </div>

        {/* Prefer to call? */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Prefer to book by phone?{" "}
            <a href={COMPANY.phoneHref} className="text-emerald-400 hover:underline font-medium cursor-pointer">
              Call {COMPANY.phone}
            </a>{" "}
            — we&apos;re available 7 days a week, 8 AM – 9 PM.
          </p>
        </div>
      </div>
    </div>
  );
}
