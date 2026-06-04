"use client";

import { Mail, Phone, Clock, CheckCircle } from "lucide-react";

const DEMO_MESSAGES = [
  { id: 1, name: "John D.", email: "johnd@email.com", phone: "206-555-0101", subject: "Get a Moving Quote", message: "Hi, I need a quote for moving a 2-bedroom apartment from Capitol Hill to Bellevue. Moving date is June 15.", date: "2 hr ago", status: "unread" },
  { id: 2, name: "Maria S.", email: "marias@email.com", phone: "", subject: "Question About Services", message: "Do you offer piano moving services? I have a grand piano that needs to be moved carefully.", date: "5 hr ago", status: "read" },
  { id: 3, name: "Tom B.", email: "tomb@company.com", phone: "253-555-0200", subject: "Book a Move", message: "Looking to schedule an office move for our team of 15. We need to move from downtown Seattle to Redmond in July.", date: "1 day ago", status: "replied" },
];

const STATUS_COLORS: Record<string, string> = {
  unread: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  read: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  replied: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

export default function AdminMessages() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-heading font-bold text-white">Messages</h1>

      {DEMO_MESSAGES.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No messages yet</div>
      ) : (
        <div className="space-y-3">
          {DEMO_MESSAGES.map((msg) => (
            <div key={msg.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold text-white">{msg.name}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1 flex-wrap">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                      <Mail className="w-3.5 h-3.5" /> {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer">
                        <Phone className="w-3.5 h-3.5" /> {msg.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[msg.status]}`}>
                    {msg.status}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {msg.date}
                  </span>
                </div>
              </div>
              <div className="text-sm text-emerald-300 font-medium mb-2">{msg.subject}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{msg.message}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="text-xs btn-primary px-4 py-2 cursor-pointer"
                >
                  Reply via Email
                </a>
                {msg.phone && (
                  <a href={`tel:${msg.phone}`} className="text-xs btn-secondary px-4 py-2 cursor-pointer">
                    Call Back
                  </a>
                )}
                {msg.status !== "replied" && (
                  <button className="text-xs flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer ml-auto">
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Replied
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
