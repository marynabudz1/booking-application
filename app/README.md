# Booking App

A modern booking management application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Create, edit, and delete bookings
- Hotel search and selection
- Date range selection (from-to dates)
- Overlap detection to prevent double bookings
- Responsive design with a warm, modern UI
- Data persistence using localStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Build

Build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Build for GitHub Pages

Build with the correct base path for GitHub Pages:

```bash
npm run build:gh-pages
```

**Note:** Replace `/booking-app/` in the script with your actual repository name. For example, if your repo is `my-booking-app`, use `/my-booking-app/`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:gh-pages` - Build for GitHub Pages (with base path)
- `npm run predeploy` - Build for GitHub Pages (runs before deploy)
- `npm run deploy` - Deploy to GitHub Pages using gh-pages
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching
- **React Hook Form** - Form management
- **Radix UI** - Accessible components
- **Font Awesome** - Icons

## Project Structure

```
src/
├── components/     # Reusable UI components
├── modals/        # Modal components
├── pages/         # Page components
├── store/         # Redux store and API
├── utils/         # Utility functions
└── types.ts       # TypeScript type definitions
```

## Deployment to GitHub Pages

This app is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Update Base Path:**
   - Open `.github/workflows/deploy.yml`
   - Replace `/booking-app/` with your actual repository name
   - For example, if your repo is `my-booking-app`, change it to `/my-booking-app/`
   - Also update the `VITE_BASE_PATH` in `package.json` script if needed

3. **Deploy:**
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy your app
   - The workflow runs on every push to `main` or can be triggered manually

### Manual Deployment

If you prefer to deploy manually using npm scripts:

1. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```
   
   This will automatically:
   - Build the app with the correct base path (`predeploy` script)
   - Deploy the `dist` folder to the `gh-pages` branch

**Note:** Make sure to update the base path in `package.json` (`build:gh-pages` script) to match your repository name before deploying.

### Important Notes

- The base path must match your repository name (e.g., `/booking-app/` for repo `booking-app`)
- If your repository is at the root of your GitHub username (e.g., `username.github.io`), use base path `/`
- Update the base path in both `.github/workflows/deploy.yml` and `package.json` scripts

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])

import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
