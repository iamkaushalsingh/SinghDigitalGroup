# Kaushal Portfolio + MotivateMe Website

## Run Locally

```
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel (3 steps)

### Option A — Vercel CLI (Fastest)
```
npm install -g vercel
vercel
```
Follow the prompts. Done. You get a URL like `your-project.vercel.app`

### Option B — GitHub + Vercel (Recommended)
1. Push this folder to GitHub:
   ```
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio
   git push -u origin main
   ```
2. Go to vercel.com → New Project → Import from GitHub
3. Framework: Vite
4. Click Deploy → Done in 60 seconds

## Pages
- `/`         → Portfolio + App landing page
- `/privacy`  → Privacy Policy (required for Google Play)
- `/support`  → App Support (required for Google Play)

## Google Play Console Setup
In Google Play Console → Store Listing:
- Privacy Policy URL: `https://your-domain.vercel.app/privacy`
- Support email: your email
- Website: `https://your-domain.vercel.app`

## Customize
Edit `src/App.jsx`:
- Line with `hello@kaushik.dev` → your actual email
- Skills section → adjust percentages
- About section → update your description

## Custom Domain (Optional)
1. Buy domain (e.g. namecheap.com, ~₹800/year)
2. Vercel Dashboard → Settings → Domains → Add your domain
3. Point DNS to Vercel (they give you exact steps)
