import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServiceArea from "@/components/home/ServiceArea";
import Reviews from "@/components/home/Reviews";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "IronClad Movers | Professional Moving Company Seattle WA",
  description:
    "IronClad Movers — Seattle's trusted moving company. 500+ happy customers, 4.9★ rating. Licensed & insured. Local, long-distance & apartment moving. Get your free quote today!",
};

// Revalidate every 60 seconds so new reviews/photos appear without redeploy
export const revalidate = 60;

async function getPageData() {
  try {
    const [{ data: reviews }, { data: gallery }, { data: heroSetting }] =
      await Promise.all([
        supabase
          .from("reviews")
          .select("id, name, rating, text, move_type, created_at")
          .eq("approved", true)
          .order("created_at", { ascending: false })
          .limit(9),

        supabase
          .from("gallery")
          .select("id, url, title, category")
          .order("created_at", { ascending: false })
          .limit(8),

        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "hero_bg_url")
          .maybeSingle(),
      ]);

    const heroBg = (heroSetting as { value: string } | null)?.value ?? null;

    return {
      reviews: reviews ?? [],
      gallery: gallery ?? [],
      heroBg,
    };
  } catch {
    return { reviews: [], gallery: [], heroBg: null };
  }
}

export default async function HomePage() {
  const { reviews, gallery, heroBg } = await getPageData();

  return (
    <>
      <Hero heroBg={heroBg} />
      <Services />
      <WhyChooseUs />
      <Gallery photos={gallery} />
      <Reviews reviews={reviews} />
      <ServiceArea />
      <FAQ />
      <CTA />
    </>
  );
}
