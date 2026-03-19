# ParcelTracker Branch - Changes & Improvements

## Overview
The `ParcelTracker` branch is a fresh start focused on stability, performance, and faster development environment setup.

## 🔄 Major Changes

### 1. **Dev Container Setup** ✅
- **Minimal Alpine-based Node.js 18 image** for faster codespace startup
- Auto-install dependencies on container creation
- Pre-configured for VS Code with ESLint and Prettier
- Port 3000 auto-forwarded for development

### 2. **Removed Dependencies** 🗑️
- **Firebase** - Deprecated and causing configuration issues
  - All auth/database operations now use Supabase exclusively
  - Firebase config file updated with deprecation notice
- **DeepSource** - Removed all DeepSource references and configuration
  - Badge removed from README
  - `.deepsource.toml` excluded from git
  - Reduces CI/CD overhead

### 3. **Updated Packages** 📦
| Package | Old | New |
|---------|-----|-----|
| @supabase/supabase-js | 2.39.3 | 2.45.0 |
| @testing-library/jest-dom | 6.4.2 | 6.6.2 |
| @testing-library/react | 13.4.0 | 14.3.1 |
| @testing-library/user-event | 14.5.1 | 14.5.2 |
| axios | 1.6.8 | 1.7.7 |
| react | 18.2.0 | 18.3.1 |
| react-dom | 18.2.0 | 18.3.1 |
| react-router-dom | 6.22.0 | 6.26.0 |
| react-toastify | 10.0.4 | 10.0.5 |
| web-vitals | 4.1.1 | 4.2.3 |

### 4. **Project Rename** 🏷️
- README updated: "TheMinuteMen" → "ParcelTracker"
- Better reflects the project's core functionality

## 🚀 Quick Start in Codespaces

1. Click **"Code" → "Codespaces" → "Create codespace on ParcelTracker"**
2. Wait for container to build (usually 1-2 minutes with Alpine image)
3. Terminal auto-runs `npm install`
4. Run `npm start` and access on port 3000

## ⚙️ Git Configuration

Added to `.gitignore`:
- `.deepsource.toml`
- `.vscode/` (local IDE settings)
- `.idea/` (IntelliJ settings)
- Editor swap files and OS files

## 🔐 Environment Setup

1. Copy `.env.example` to `.env`
2. Add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   ```
3. Firebase credentials are no longer needed

## 📝 Firebase Migration

If you have Firebase-specific code:
- Use Supabase authentication instead (`/src/services/signInWithSupabase.js`)
- Use Supabase database (`/src/services/orderManagementSupabase.js`)
- Check existing Supabase config at `/src/config/supabase.config.js`

## ✨ Benefits of This Branch

- ✅ **Faster Codespace startup** - Alpine-based container (smaller footprint)
- ✅ **Cleaner dependencies** - Removed unused Firebase
- ✅ **Better performance** - Latest versions with bug fixes
- ✅ **Less CI/CD overhead** - No DeepSource scanning
- ✅ **Production-ready** - All critical packages updated

## 🐛 Troubleshooting

### npm install fails
```bash
rm -rf node_modules yarn.lock
npm install
```

### Port 3000 in use
```bash
npm start -- --port 3001
```

### Env variables not loading
```bash
# Clear Next.js cache if applicable
rm -rf .next
npm start
```

---

**Created**: March 2026  
**Maintained by**: ParcelTracker Team
