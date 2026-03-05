# 🚀 Deploy to Vercel Guide

## Quick Deploy

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Go to [Vercel](https://vercel.com)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure Environment Variables:**
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key

6. **Click "Deploy"**

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GEMINI_API_KEY

# Deploy to production
vercel --prod
```

## 📋 Required Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key for AI content generation |

## 🔧 Build Configuration

The project is pre-configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA rewrites configured

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Vercel** - Hosting & deployment

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Get Gemini API Key](https://aistudio.google.com/apikey)

---

Made with ❤️ for Saudi Arabia
