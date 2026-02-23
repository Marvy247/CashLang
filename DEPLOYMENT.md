# Deployment Guide

## Deploy to Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cashlang)

### Manual Deploy

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Production deploy:**
   ```bash
   vercel --prod
   ```

## Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build:**
   ```bash
   npm run deploy
   ```

3. **Deploy:**
   ```bash
   netlify deploy --dir=frontend/dist --prod
   ```

## Deploy to GitHub Pages

1. **Build:**
   ```bash
   npm run deploy
   ```

2. **Deploy:**
   ```bash
   cd frontend/dist
   git init
   git add -A
   git commit -m 'deploy'
   git push -f git@github.com:yourusername/cashlang.git master:gh-pages
   ```

## Environment Variables

No environment variables required for basic deployment!

## Custom Domain

### Vercel
1. Go to your project settings
2. Add your domain
3. Configure DNS records

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

## Build Configuration

The project uses a monorepo structure. The build process:

1. Builds `packages/shared` (types)
2. Builds `packages/core` (transpiler)
3. Builds `frontend` (React app)

All handled by `npm run deploy` command.

## Troubleshooting

### Build fails on Vercel
- Check Node.js version (should be 18+)
- Ensure all dependencies are in package.json
- Check build logs for specific errors

### Monaco Editor not loading
- Ensure proper CDN configuration
- Check Content Security Policy headers

### Large bundle size
- Monaco Editor is ~2MB (expected)
- Use code splitting if needed
- Enable gzip compression (automatic on Vercel/Netlify)
