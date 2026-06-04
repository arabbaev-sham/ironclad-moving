import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ironclad-moving.vercel.app"),
  title: {
    default: "IronClad Movers | Professional Moving Company Seattle WA",
    template: "%s | IronClad Movers",
  },
  description:
    "IronClad Movers — Seattle's trusted moving company since 2024. Licensed & insured. Local, long-distance, apartment, and office moving services. Get a free quote today! Call 206-609-5878.",
  keywords: ["Seattle movers", "IronClad Movers", "moving company Seattle", "Seattle moving services", "local movers Seattle WA"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ironclad-moving.vercel.app",
    siteName: "IronClad Movers",
    title: "IronClad Movers | Professional Moving Company Seattle WA",
    description: "Seattle's trusted moving company. 500+ happy customers, 4.9★ rating. Serving all of Washington State.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IronClad Movers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IronClad Movers | Seattle Moving Company",
    description: "500+ happy customers. 4.9★ Google rating. Licensed & insured. Get a free quote!",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              name: COMPANY.name,
              telephone: COMPANY.phone,
              email: COMPANY.email,
              foundingDate: COMPANY.since,
              address: {
                "@type": "PostalAddress",
                streetAddress: "4317 8th Avenue NE",
                addressLocality: "Seattle",
                addressRegion: "WA",
                postalCode: "98105",
                addressCountry: "US",
              },
              url: "https://ironclad-moving.vercel.app",
              openingHours: "Mo-Su 08:00-21:00",
              priceRange: "$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "47",
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
