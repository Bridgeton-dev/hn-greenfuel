# HN Greenfuel — Biomass Briquettes & Pellets Website

Official website for **HN GREENFUEL ARGO INDUSTRIES PRIVATE LIMITED** (*Clean fuel. Real fire.*).
Built with Next.js 14 (App Router), React 18, GSAP, and Lenis.

## Getting Started

```bash
npm install
npm run dev      # local development
npm run build    # production build
npm run start    # production server
```

## Configuration

Update company placeholders (phone, WhatsApp, email, address, GSTIN, CIN, monthly capacity, city/state) in `lib/brand.js`.
For direct server-side email delivery from enquiry forms, configure `RESEND_API_KEY` (or `ENQUIRY_WEBHOOK_URL`) and `NEXT_PUBLIC_SITE_URL` in your environment variables.
