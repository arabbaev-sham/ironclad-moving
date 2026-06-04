# Seattle Prime Movers — Setup Guide

## Quick Start

```bash
cd seattle-prime-movers
npm install
npm run dev
# Open http://localhost:3000
```

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase-schema.sql`
3. Get your project URL and anon key from **Settings → API**

---

## Step 3: Set Up Resend (Email)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add your domain and verify it
4. Update `RESEND_FROM_EMAIL` in `.env.local`

---

## Step 4: Set Up Google Maps

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Enable **Maps Embed API**
3. Create an API key and restrict it to your domain
4. Add to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

---

## Step 5: Configure Environment Variables

Edit `.env.local` with your real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
COMPANY_EMAIL=info@yourdomain.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
ADMIN_SECRET_KEY=choose_a_strong_secret_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 6: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables → add all from .env.local
```

Or connect via GitHub:
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

---

## Step 7: Custom Domain

In Vercel dashboard:
1. **Settings → Domains → Add**
2. Point your domain's DNS to Vercel
3. SSL is automatic

---

## Step 8: SEO Setup

1. **Google Search Console**: Add property → verify with HTML tag in `layout.tsx`
2. **Google Business Profile**: Claim at [business.google.com](https://business.google.com)
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

---

## Admin Dashboard

Access at `/admin` — use your `ADMIN_SECRET_KEY` to sign in.

Features:
- View & manage bookings (update status)
- Approve/reject customer reviews
- Upload gallery photos
- Read contact messages

---

## Pages Summary

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Main landing page |
| About | `/about` | Company story |
| Services | `/services` | All 7 services |
| Service Areas | `/service-areas` | All cities |
| City Page | `/service-areas/seattle` | SEO city page |
| Gallery | `/gallery` | Photo gallery |
| Reviews | `/reviews` | Customer reviews |
| Book | `/book` | Online booking form |
| Contact | `/contact` | Contact form |
| Blog | `/blog` | SEO articles |
| Admin | `/admin` | Dashboard |

---

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Maps**: Google Maps Embed API
- **Storage**: Supabase Storage / Cloudinary
- **Hosting**: Vercel
- **Fonts**: Inter + Poppins (Google Fonts)
