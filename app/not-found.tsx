import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="text-center">
        <div className="text-8xl font-heading font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl font-heading font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <a href={COMPANY.phoneHref} className="btn-secondary">
            <Phone className="w-4 h-4" /> {COMPANY.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
