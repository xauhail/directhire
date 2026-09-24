# Deploy Career Hound to Cloudflare (100% Free Forever)

> 🚀 **LIVE DEPLOYMENT STATUS: ACTIVE & RUNNING!**  
> **Production URL**: [https://careerhound-7sx.pages.dev](https://careerhound-7sx.pages.dev)  
> **Preview URL**: [https://bf5d531c.careerhound-7sx.pages.dev](https://bf5d531c.careerhound-7sx.pages.dev)  
> **Health Check**: [https://careerhound-7sx.pages.dev/api/health](https://careerhound-7sx.pages.dev/api/health)  
> **Dodo Webhook**: `https://careerhound-7sx.pages.dev/api/webhooks/dodo`  

---

## 🏗️ Architecture Overview

| Component | Platform | Free Tier Limits | Cost |
| :--- | :--- | :--- | :--- |
| **Frontend** | Cloudflare Pages | Unlimited bandwidth, global 300+ CDN edges | **$0.00 / mo** |
| **Backend API** | Cloudflare Pages Functions | 100,000 requests/day, 0ms cold starts | **$0.00 / mo** |
| **Database** | Neon.tech PostgreSQL | 0.5 GB storage, serverless compute | **$0.00 / mo** |
| **Payments** | Dodo Payments | Pay-as-you-go per transaction | **$0.00 upfront** |
| **SSL & Security** | Cloudflare | Free wildcard SSL + DDoS protection | **$0.00 / mo** |

---

## ✅ Step 1: Database Setup on Neon (COMPLETED!)

Your Neon Serverless PostgreSQL database has already been connected and fully initialized!
- **Database URL**: `postgresql://neondb_owner:npg_dk4c2HBROTgE@ep-jolly-union-b48km1q7-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require`
- **Tables Created**: `jobs`, `onboarding_profiles`, `user`, `session`, `account`, `verification`, `jwks`, `oauthClient`, etc.
- **Data Seeded**: 180+ verified direct ATS jobs from Greenhouse and Ashby, ready for live candidate registrations.

---

## ☁️ Step 2: Connect GitHub to Cloudflare Pages (Free)

1. Log in to **[dash.cloudflare.com](https://dash.cloudflare.com)** (create a free account if you don't have one).
2. In the left navigation menu, click **Workers & Pages**.
3. Click **Create application** > Select the **Pages** tab > Click **Connect to Git**.
4. Authorize GitHub and select your repository: **`xauhail/directhire`**.
5. Configure the build settings:
   - **Project name**: `careerhound` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Root directory**: `frontend`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Environment variables (advanced)** and add these variables:

| Variable Name | Value | Note |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://neondb_owner:npg_dk4c2HBROTgE@ep-jolly-union-b48km1q7-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require` | Your active Neon database |
| `BETTER_AUTH_SECRET` | `e89fc5c72199f34586da234a946890fa24177b96b0eeefda96ef2cf3f225e364` | Session signing key |
| `BETTER_AUTH_URL` | `https://careerhound-7sx.pages.dev` | Replace with your custom domain if added |
| `DODO_PAYMENTS_API_KEY` | `foZur3iZfSq5RRFD.Pd4SJ2ti63yvIAmE424UP9W_5sn4QIwDs9-EYoti0AYEMsPo` | Live API key |
| `DODO_PAYMENTS_MODE` | `live_mode` | Live checkout |
| `DODO_PRODUCT_WEEKLY` | `pdt_0NoCoSmvftI788ZiRmxcg` | Weekly Pass ($9.99/wk) |
| `DODO_PRODUCT_MONTHLY` | `pdt_0NoCoSp04hYLAtmjbseJt` | Monthly Pro ($29/mo) |
| `DODO_PRODUCT_YEARLY` | `pdt_0No0Hg5BSrOkY9wb34YxP` | 1-Year Pass ($99/yr) |

7. Click **Save and Deploy**.

Cloudflare will clone your code, build your static Astro pages, bundle the edge functions in `functions/api`, and deploy to a live URL like:
`https://careerhound.pages.dev` in ~60 seconds!

---

## 🌐 Step 3: (Optional) Connect Custom Domain (e.g. `careerhound.io`)

1. In your Cloudflare Pages dashboard for `careerhound`, go to **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter your domain (e.g. `careerhound.io` or `jobs.careerhound.io`).
4. Cloudflare automatically issues a free SSL certificate and manages DNS routing worldwide.

---

## 💳 Step 4: Configure Dodo Payments Webhook (For Auto-Upgrades)

1. Open **[app.dodopayments.com](https://app.dodopayments.com)**.
2. Go to **Developers** > **Webhooks** > **Add Endpoint**.
3. Set the endpoint URL to:
   ```text
   https://careerhound.pages.dev/api/webhooks/dodo
   ```
   *(or `https://yourdomain.com/api/webhooks/dodo`)*
4. Select the events:
   - `payment.succeeded`
   - `subscription.active`
   - `subscription.renewed`
   - `subscription.cancelled`
5. Save the endpoint.

---

## 🔄 How Local Development Works

You can still develop locally at any time without changing anything:
```bash
# Starts both frontend (http://localhost:4321) and backend (http://localhost:4000)
npm run dev
```
The frontend automatically detects when you are running on `localhost` and routes API requests to your local backend. When deployed on Cloudflare Pages, it automatically routes to the edge functions on the same domain.
