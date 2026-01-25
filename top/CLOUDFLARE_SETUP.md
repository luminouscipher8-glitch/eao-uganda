# Cloudflare Pages Setup Guide for EAO Uganda

## 🚀 Quick Setup Instructions

### 1. Connect Repository to Cloudflare Pages

1. **Go to Cloudflare Dashboard** → Pages → Create a project
2. **Connect to Git** → Select your GitHub repository
3. **Choose repository**: `luminouscipher8-glitch/eao-uganda`

### 2. Build Settings

```
Production branch: main
Build command: cd top/eksfkm.readdy.co && npm run build
Build output directory: top/eksfkm.readdy.co/dist
Root directory: / (leave empty)
```

### 3. Environment Variables

Add these in Cloudflare Pages Settings → Environment variables:

**Production:**
```
VITE_SUPABASE_URL = https://db.rogxpucnkqwbeohpkolj.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_5707Wm_xn45TSDx1haQyqg_hs71FryT
VITE_API_URL = https://eao-uganda.onrender.com
```

**Preview:**
```
VITE_SUPABASE_URL = https://db.rogxpucnkqwbeohpkolj.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_5707Wm_xn45TSDx1haQyqg_hs71FryT
VITE_API_URL = https://eao-uganda.onrender.com
```

### 4. Custom Domain (Optional)

1. In Cloudflare Pages → Custom domains
2. Add your domain: `eao-uganda.org` or similar
3. Update DNS records as instructed

## 📁 Files Created

- `_cloudflare-pages.yml` - Cloudflare Pages configuration
- `wrangler.toml` - Advanced Cloudflare Workers config
- `public/_cloudflare-redirects` - Cloudflare-specific redirects
- `public/_redirects` - Netlify redirects (kept for compatibility)

## 🔧 Configuration Details

### Build Process
- **Base Directory**: Repository root
- **Working Directory**: `top/eksfkm.readdy.co`
- **Output**: `top/eksfkm.readdy.co/dist`
- **Node Version**: 18.x

### Routing
- **API Calls**: Proxied to `https://eao-uganda.onrender.com/api/*`
- **SPA Routes**: All other routes redirect to `/index.html`
- **Static Assets**: Cached for 1 year with immutable headers

### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 🌐 Deployment URLs

- **Production**: `https://eao-uganda.pages.dev`
- **Preview**: `https://random-hash.eao-uganda.pages.dev`
- **Custom Domain**: Your configured domain (if set up)

## 🔄 Dual Hosting Strategy

### Netlify (Backup)
- URL: `https://eao-uganda.netlify.app`
- Configuration: `netlify.toml`
- Status: Ready as backup

### Cloudflare Pages (Primary)
- URL: `https://eao-uganda.pages.dev`
- Configuration: `_cloudflare-pages.yml`
- Status: Primary deployment

## 🚨 Important Notes

1. **Keep both configurations** - they don't conflict
2. **API proxy works the same** on both platforms
3. **Environment variables** need to be set in both dashboards
4. **Custom domains** can only point to one platform at a time

## 🛠️ Troubleshooting

### Build Issues
- Check that the build command is: `cd top/eksfkm.readdy.co && npm run build`
- Verify Node.js version is set to 18.x
- Ensure all environment variables are correctly set

### Routing Issues
- API calls should work: `/api/*` → Render backend
- SPA routes should work: `/about`, `/partners`, etc.
- Check `_cloudflare-redirects` file is in the build output

### Performance
- Assets are cached for 1 year
- HTML files are not cached (for updates)
- API calls are proxied efficiently

## 📊 Benefits of Cloudflare Pages

✅ **Global CDN** - Faster loading worldwide
✅ **No build limits** - Unlimited builds
✅ **No bandwidth limits** - Unlimited traffic
✅ **DDoS protection** - Built-in security
✅ **Edge functions** - Serverless computing
✅ **Analytics** - Built-in performance insights

## 🔄 Switching Between Platforms

### To use Cloudflare Pages as primary:
1. Point your custom domain to Cloudflare Pages
2. Keep Netlify as backup/secondary
3. Update any hardcoded URLs if needed

### To use Netlify as primary:
1. Point your custom domain to Netlify
2. Keep Cloudflare Pages as backup/secondary
3. Resolve any billing issues with Netlify
