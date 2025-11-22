---
title: Deployment Guide
description: Complete guide to building and deploying the portfolio to GitHub Pages including troubleshooting and verification
keywords: deployment, github pages, build, production, deploy, gh-pages, vite, dist
---

# Deployment Guide

Complete guide to deploying the portfolio to GitHub Pages.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn deploy` | Deploy to GitHub Pages |

**Deployment URL**: https://jshengdev.github.io/portfolioyush/

**Deployment Time**: ~30-60 seconds

---

## Prerequisites

1. **GitHub Pages enabled** for repository
2. **Repository settings** configured:
   - Settings → Pages → Source: Deploy from branch
   - Branch: `gh-pages` / root
3. **Package.json homepage** set correctly:
```json
"homepage": "https://jshengdev.github.io/portfolioyush"
```

---

## Build Process

### Step 1: Build for Production

```bash
yarn build
```

**What happens**:
1. Vite bundles all source files
2. Optimizes and minifies code
3. Generates `/dist` directory
4. Creates lazy-loaded chunks (15 separate files)
5. Copies assets from `/public`
6. Generates hashed filenames for cache busting

**Expected output**:
```
vite v6.0.7 building for production...
✓ 15 modules transformed.
✓ built in 3.38s

dist/index.html                           2.75 kB │ gzip:   0.88 kB
dist/assets/AdeDisplay-0xeOYSZF.otf      37.32 kB
dist/assets/index-BHMuafdX.css            2.29 kB │ gzip:   1.62 kB
dist/assets/projectname-Pa4_eMIs.js       0.60 kB │ gzip:   0.31 kB
dist/assets/Contact-C860vjbe.js           1.68 kB │ gzip:   0.75 kB
dist/assets/About-Dhu6Poet.js             1.74 kB │ gzip:   0.89 kB
dist/assets/NextProject-fDnUEbuQ.js       2.45 kB │ gzip:   1.07 kB
dist/assets/Hero-CiC51fRT.js              2.94 kB │ gzip:   1.23 kB
dist/assets/Archive-C26v1eaq.js           4.94 kB │ gzip:   1.89 kB
dist/assets/sharedStyles-B_U0-HBI.js      5.29 kB │ gzip:   1.45 kB
dist/assets/Projects-DjXeRN3Q.js          5.58 kB │ gzip:   2.00 kB
dist/assets/AP-ERBfUEi6.js                7.69 kB │ gzip:   2.94 kB
dist/assets/Ark-Dz1qfXP-.js               8.84 kB │ gzip:   3.42 kB
dist/assets/Collection-BwdTd-Za.js        9.29 kB │ gzip:   2.16 kB
dist/assets/Grove-Cf-5opCi.js            10.75 kB │ gzip:   4.21 kB
dist/assets/CapsuleMachine-Cl_zUD3b.js   14.36 kB │ gzip:   4.40 kB
dist/assets/Lens-CX5CoJKa.js            121.81 kB │ gzip:  37.56 kB
dist/assets/index-naHL2ETq.js           797.34 kB │ gzip: 227.32 kB
```

**Build Stats**:
- **Main bundle**: 797KB (227KB gzip)
- **15 lazy chunks**: Load on-demand per route
- **Total**: ~1.1MB (including all chunks)
- **Assets**: Copied as-is from `/public/assets/`

---

## Step 2: Preview Build Locally

**Before deploying**, test the production build:

```bash
yarn preview
```

**Opens**: http://localhost:4173

**Test checklist**:
- [ ] All routes load correctly
- [ ] Images display properly
- [ ] Animations work smoothly
- [ ] No console errors
- [ ] Page transitions smooth
- [ ] NextProject widget works
- [ ] Custom cursor appears
- [ ] Shader background loads

**Navigate**:
1. Home → About → Projects → Archive → Contact ✅
2. Projects → Click each project ✅
3. Test NextProject navigation ✅
4. Browser back button ✅
5. Direct URL: `/projects/Grove` ✅

**Stop preview**: Ctrl+C

---

## Step 3: Deploy to GitHub Pages

```bash
yarn deploy
```

**What happens**:
1. **predeploy** script runs `yarn build` automatically
2. **gh-pages** package:
   - Commits `/dist` contents to `gh-pages` branch
   - Force pushes to remote `gh-pages` branch
   - GitHub Pages serves from `gh-pages` branch

**Expected output**:
```
> portfolioyush@0.0.0 predeploy
> yarn build

vite v6.0.7 building for production...
✓ built in 3.38s

> portfolioyush@0.0.0 deploy
> gh-pages -d dist

Published
```

**Deployment time**: 30-60 seconds

**Live URL**: https://jshengdev.github.io/portfolioyush/

---

## Step 4: Verify Deployment

### Wait for GitHub Pages

1. Go to GitHub repository
2. **Actions** tab → See deployment workflow
3. Wait for green checkmark (✅)

**Typical workflow**:
```
pages build and deployment
├── Build (gh-pages → pages-build-deployment)
└── Deploy (✅ succeeded)
```

**Time**: Usually 1-2 minutes

### Visit Live Site

Navigate to: https://jshengdev.github.io/portfolioyush/

**Full verification checklist**:

**Pages**:
- [ ] Home page loads
- [ ] About page accessible
- [ ] Projects page shows all projects
- [ ] Archive page horizontal scroll works
- [ ] Contact page displays

**Projects**:
- [ ] Grove project loads
- [ ] Capsule Machine project loads
- [ ] The Collection project loads
- [ ] Ark project loads
- [ ] Alaina Pamela project loads
- [ ] Lens project loads

**Features**:
- [ ] WebGL shader background renders
- [ ] Custom cursor appears and follows mouse
- [ ] Line animations react to route changes
- [ ] Page transitions smooth
- [ ] Images load (no broken images)
- [ ] NextProject widget navigates correctly

**Browser Testing**:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (if available)
- [ ] Mobile Chrome (if available)

---

## Troubleshooting

### Build Fails

#### Error: `Cannot find module...`

**Solution**:
```bash
# Clean install
rm -rf node_modules yarn.lock dist
yarn install
yarn build
```

#### Error: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"
yarn build
```

#### Error: `Vite config error`

**Solution**:
1. Check `vite.config.js` syntax
2. Verify `@vitejs/plugin-react` is installed
3. Clear cache: `rm -rf node_modules/.vite`

---

### Deployment Fails

#### Error: `ENOENT: no such file or directory, stat 'build'`

**Cause**: `package.json` deploy script pointing to wrong directory

**Solution**:
Edit `/package.json` line 12:
```json
// Before (INCORRECT)
"deploy": "gh-pages -d build"

// After (CORRECT)
"deploy": "gh-pages -d dist"
```

**Fixed in Wave 2 optimization** ✅

#### Error: `Permission denied (publickey)`

**Cause**: Git SSH key not configured

**Solution**:
1. Use HTTPS instead of SSH for remote
2. Or configure SSH key: https://docs.github.com/en/authentication

```bash
# Check current remote
git remote -v

# If using SSH, switch to HTTPS
git remote set-url origin https://github.com/Jshengdev/portfolioyush.git
```

#### Error: `gh-pages command not found`

**Cause**: gh-pages package not installed

**Solution**:
```bash
yarn add --dev gh-pages
yarn deploy
```

---

### Site Not Updating

#### Problem: Changes not reflected on live site

**Solutions**:

1. **Hard refresh browser**:
   - Chrome: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
   - Safari: Cmd+Option+R
   - Firefox: Ctrl+F5

2. **Clear browser cache**:
   - DevTools → Network tab → Disable cache
   - Or manually clear cache in browser settings

3. **Check GitHub Actions**:
   - Repository → Actions tab
   - Verify deployment succeeded (green checkmark)
   - If failed, check error logs

4. **Verify gh-pages branch**:
   - Repository → Branches
   - Confirm `gh-pages` branch updated
   - Check commit timestamp

5. **Force rebuild**:
```bash
# Delete gh-pages branch
git push origin --delete gh-pages

# Re-deploy
yarn deploy
```

---

### Assets Not Loading

#### Problem: 404 errors for images

**Causes**:
1. **Incorrect base path**: Vite needs `base` config for GitHub Pages
2. **Asset paths**: Using `/public/assets/` instead of `/assets/`

**Solution**:

Check `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/portfolioyush/',  // Must match repository name
});
```

Check asset paths in components:
```javascript
// Correct
<img src="/assets/GROVE/hero.png" alt="Hero" />

// Incorrect
<img src="/public/assets/GROVE/hero.png" alt="Hero" />
```

#### Problem: Some images 404, others load

**Cause**: Case sensitivity (Linux servers are case-sensitive)

**Solution**:
- Windows/Mac: `hero.PNG` works
- Linux (GitHub Pages): Exact match required

Check exact filename:
```bash
ls -l public/assets/GROVE/
# Use exact case in code
```

---

### Performance Issues

#### Problem: Slow initial load

**Solutions**:

1. **Check bundle size**:
```bash
yarn build
# Look for large chunks (> 500KB)
```

2. **Optimize images**:
   - Compress PNGs: TinyPNG, ImageOptim
   - Convert to WebP: `cwebp input.png -o output.webp`
   - Resize: Max 1920px wide

3. **Lazy load images**:
```javascript
<img src="..." loading="lazy" alt="..." />
```

4. **Monitor Lighthouse score**:
   - DevTools → Lighthouse → Run report
   - Target: 90+ performance score

---

## Deployment Workflow

### Standard Workflow

```bash
# 1. Make changes
# Edit files...

# 2. Test locally
yarn dev
# Verify changes at http://localhost:3000

# 3. Build
yarn build

# 4. Preview build
yarn preview
# Test at http://localhost:4173

# 5. Commit changes
git add .
git commit -m "Description of changes"

# 6. Deploy
yarn deploy

# 7. Push code to main
git push origin main
```

### Quick Workflow (Minor Changes)

```bash
# 1. Make changes
# Edit files...

# 2. Deploy directly
yarn deploy  # Runs build automatically

# 3. Push code
git push origin main
```

---

## Advanced: Manual Deployment

If `gh-pages` package fails, deploy manually:

### Step 1: Build

```bash
yarn build
```

### Step 2: Create gh-pages Branch

```bash
# Create and switch to gh-pages branch
git checkout --orphan gh-pages

# Remove all files from git (not disk)
git rm -rf .

# Copy dist contents to root
cp -r dist/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Force push
git push -f origin gh-pages

# Switch back to main
git checkout main
```

**Not recommended** - Use `yarn deploy` instead

---

## Continuous Deployment (Optional)

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: yarn install

      - name: Build
        run: yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Benefits**:
- Auto-deploy on push to main
- No manual `yarn deploy` needed
- CI/CD pipeline

---

## Deployment Checklist

**Before deploying**:

- [ ] All changes committed to git
- [ ] `yarn build` succeeds without errors
- [ ] `yarn preview` shows correct site
- [ ] All tests pass (if applicable)
- [ ] No console errors in DevTools
- [ ] Images optimized (< 2MB each)
- [ ] Lighthouse score checked (optional)

**After deploying**:

- [ ] GitHub Actions deployment succeeded (green ✅)
- [ ] Live site loads: https://jshengdev.github.io/portfolioyush/
- [ ] All routes accessible
- [ ] Assets loading correctly
- [ ] Animations working
- [ ] Mobile responsive (test on phone)
- [ ] Hard refresh tested (Ctrl+Shift+R)

---

## Rollback Procedure

### If deployment breaks site

**Quick rollback**:

```bash
# 1. Find previous working commit
git log --oneline
# Example: abc1234 Working state

# 2. Checkout that commit
git checkout abc1234

# 3. Re-deploy
yarn deploy

# 4. Return to main
git checkout main
```

**Or revert commit**:

```bash
# Revert last commit
git revert HEAD

# Deploy
yarn deploy
```

---

## See Also

- [Quick Start Guide](QUICK_START.md) - Initial setup
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues
- [Known Issues](../reference/KNOWN_ISSUES.md) - Current bugs
- [GitHub Pages Docs](https://docs.github.com/en/pages) - Official documentation

---

**For emergencies**: If site is down, check GitHub Actions tab for deployment status and error logs.
