# ITW Domain Integration & Deployment Guide

This guide explains how to deploy your ITW website and link your custom domain (e.g. `intothewild.in`) using the most popular hosting platforms for Vite sites.

---

## Recommended: Vercel (Easiest & Fastest)

Vercel is the recommended hosting provider. It automatically detects Vite, provides free SSL, and has a global CDN for fast image loading.

### Step 1: Deploy from GitHub
1. Create a free account at [Vercel](https://vercel.com) and link your GitHub account.
2. Click **Add New > Project**.
3. Import your `ITW` repository.
4. Keep the default settings (Vercel automatically configures the Vite build command) and click **Deploy**.

### Step 2: Add your Domain in Vercel
1. In your project dashboard, go to **Settings > Domains**.
2. Type in your custom domain (e.g., `www.intothewild.in`) and click **Add**.
3. Vercel will ask if you also want to redirect the apex domain (`intothewild.in` without `www`). Select **Recommend: Redirect...** and add it.

### Step 3: Configure DNS Records (at your Registrar)
Log into your domain registrar account (GoDaddy, Hostinger, Namecheap, Google Domains/Squarespace) and open your **DNS Zone Editor**. Add the following records:

| Type | Name | Value / Target | Purpose |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Points `yourdomain.com` to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | Points `www.yourdomain.com` to Vercel |

*Once added, Vercel will automatically verify the records, deploy a secure SSL certificate, and make your site live.*

---

## Option 2: Netlify (Alternative)

Netlify is another excellent option for static sites.

### Step 1: Deploy
1. Sign in to [Netlify](https://netlify.com) using GitHub.
2. Click **Add new site > Import an existing project**.
3. Select the `ITW` repository and click **Deploy**.

### Step 2: Add Domain in Netlify
1. Go to **Site Configuration > Domain management**.
2. Click **Add domain** and enter your custom domain.

### Step 3: Configure DNS Records
In your registrar's **DNS Zone Editor**, configure:

| Type | Name | Value / Target |
| :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` |
| **CNAME** | `www` | `your-site-name.netlify.app` |

---

## Option 3: GitHub Pages (Free Hosting on GitHub)

If you want to host it directly on GitHub Pages:

### Step 1: Add CNAME file to Repo
Configure a custom domain in your GitHub Pages settings:
1. Go to your repository on GitHub.com.
2. Click **Settings > Pages** (on the left menu).
3. Under **Build and deployment**, set Source to **GitHub Actions** or **Deploy from branch** (deploying the `dist` folder).
4. Under **Custom domain**, type your domain (e.g. `intothewild.in`) and click **Save**. This creates a `CNAME` file in your repository.

### Step 2: Configure DNS Records
Add these 4 **A Records** to point to GitHub's servers:

* `185.199.108.153`
* `185.199.109.153`
* `185.199.110.153`
* `185.199.111.153`

And a **CNAME Record**:
* Type: `CNAME` | Name: `www` | Value: `your-github-username.github.io`
