---
description: How to set up Continuous Deployment on Vercel
---

# Continuous Deployment on Vercel

Since your project is already on GitHub (`portfolioyush`), setting up CD on Vercel is straightforward.

## 1. Push Latest Changes
Ensure your GitHub repository is up to date.
```bash
git add .
git commit -m "Polish: Update Pebl fonts and styling"
git push origin main
```

## 2. Connect to Vercel
1.  Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** > **"Project"**.
3.  Find `portfolioyush` in the "Import Git Repository" list and click **Import**.

## 3. Configure Project
Vercel automatically detects Vite projects.
-   **Framework Preset:** `Vite`
-   **Root Directory:** `./`
-   **Build Command:** `vite build` (Default)
-   **Output Directory:** `dist` (Default)
-   **Install Command:** `yarn install` or `npm install` (Default)

## 4. Deploy
Click **Deploy**. Vercel will build your site.

## 5. Automatic Updates
Once connected, every time you `git push` to the `main` branch, Vercel will automatically:
1.  Detect the change.
2.  Build the new version.
3.  Deploy it to your production URL.
