# Copilot Instructions for Excel Clone

## Project Overview

This is an Excel-like spreadsheet application built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4. The project aims to recreate Excel functionality in a modern web interface.

## Tech Stack & Architecture

- **Framework**: Next.js 15 with App Router (`app/` directory structure)
- **React**: v19.1.0 with latest React features
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → root)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Development**: Turbopack for faster builds (`--turbopack` flag)
- **Fonts**: Geist Sans & Geist Mono via `next/font/google`

## Development Workflows

### Build Commands

```bash
npm run dev        # Development with Turbopack
npm run build      # Production build with Turbopack
npm run start      # Production server
npm run lint       # ESLint check
```

### Key Conventions

- **Routing**: File-based routing in `app/` directory (App Router)
- **Components**: Use TypeScript with strict typing (`Readonly<>` for props)
- **Styling**: Tailwind classes with CSS custom properties for theming
- **Images**: Always use `next/image` with proper `alt`, `width`, `height`
- **Fonts**: Load via `next/font/google` and apply as CSS variables

## Project Structure

```
app/
├── layout.tsx      # Root layout with font loading & metadata
├── page.tsx        # Home page component
├── globals.css     # Global styles with Tailwind imports & theme vars
└── favicon.ico     # App favicon

public/             # Static assets (SVGs, images)
```

## Styling Patterns

- **Theme Variables**: Use CSS custom properties defined in `:root` and `@theme inline`
- **Dark Mode**: Automatic via `prefers-color-scheme` media query
- **Colors**: `--background`, `--foreground` for consistent theming
- **Typography**: Geist fonts via CSS variables (`--font-geist-sans`, `--font-geist-mono`)

## Code Examples

### Component Structure

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

export default function PageComponent({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='font-sans grid items-center'>{children}</div>
}
```

### Styling Approach

- Utility-first with Tailwind classes
- Responsive design using Tailwind breakpoints (`sm:`, `md:`, etc.)
- Custom properties for consistent theming across light/dark modes

## Development Notes

- ESLint configured with Next.js Core Web Vitals and TypeScript rules
- Turbopack enabled for faster development and production builds
- Path aliases configured (`@/*` maps to project root)
- TypeScript strict mode enforced for better type safety
