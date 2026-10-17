# Socle — app

Socle is a design-led interior styling web app: a client uploads the photo of an estate-agency floor plan, checks the detected rooms, picks one of 4 curated styles, and gets a furnished 3D apartment (the Studio) with renders, a shopping list and a share link. Owner: Nate (Atelier Nate, Brussels). This repo is the v1 app.

Build it phase by phase from `docs/plan-de-build.md`. Never start a phase before the previous one passes its checks.

## Sources of truth (read before building a screen)

| What | Where |
| --- | --- |
| Full spec (screens, components, motion, 3D, a11y, edge cases) | `docs/handoff.md` (French) |
| Pixel reference for every screen | `docs/screens/*.png` (1440 × 900 desktop, 390 × 844 mobile) |
| Component states | `docs/components/*.png` |
| Motion values | `docs/motion-spec.png`, `src/lib/motion.ts` |
| Figma file (live) | https://www.figma.com/design/REhgVyFwwsvJqXbroqPKFD — use the Figma MCP server (`.mcp.json`, installed from `setup/`) for exact values |
| Brand voice and logo rules | `docs/brand-book.md` |
| 3D prototype to port | `docs/reference/appartement-2-3-maquette-3d.html` (Three.js r128, camera presets per room, morning/evening light) |
| Demo data | `src/lib/mock/appartement-2-3.ts`, `src/lib/ambiances.ts` |
| Types | `src/types/socle.ts` |

Figma node ids (page « App — Parcours client »), for `get_design_context` / `get_screenshot`:

| Screen | Node | Screen | Node |
| --- | --- | --- | --- |
| 01 Bienvenue | 27:7 | 08c Studio · Plan | 34:1161 |
| 02 Tableau de bord | 27:134 | 09 Remplacer un meuble | 34:627 |
| 03 Importer le plan | 28:81 | 10 Rendus | 36:911 |
| 04 Lecture du plan | 28:176 | 10b Débloquer le HD | 35:838 |
| 05 Vérifier les pièces | 29:112 | 11 Partager | 36:1090 |
| 06 Choisir l'ambiance | 31:144 | 12 Liste d'achats | 37:1160 |
| 07 Génération | 32:232 | 13 Mobile · vue partagée | 38:1190 |
| 08 Studio · 3D | 33:234 | 13b Mobile · défilé | 39:1219 |
| 08b Studio · Soir | 34:415 | Motion spec board | 41:1315 |

Components (page « Components »): Button 4:11, Chip 4:16, Input 4:17, Stat 4:19, Logo/Lockup 3:8, Logo/Mark 3:14, App/Segmented 2 23:32, App/Segmented 3 23:56, App/Nav item 23:75, App/Room row 23:92, App/Hotspot 23:104, App/Ambiance card 24:70, App/Piece row 24:97, App/Project card 24:127.

## Stack and commands

- Next.js 16 (App Router, Turbopack, Cache Components on), React 19, TypeScript strict, Tailwind CSS v4, `motion` (Motion for React), `three` + `@react-three/fiber` + `@react-three/drei`, `lucide-react`.
- Next 16 differs from older training data: read `AGENTS.md` and the guides in `node_modules/next/dist/docs/` before using a Next API you are unsure of.
- `npm run dev` (http://localhost:3000) · `npm run build` · `npm run lint` · `npx tsc --noEmit`.
- Later phases add Supabase (auth, Postgres, storage), Stripe (card + Bancontact) and a transactional e-mail service. Keys go in `.env.local`, never in code; `.env.example` lists them.

## Design rules (non-negotiable)

- Only Socle tokens. Tailwind's default palette is disabled in `src/app/globals.css`; the color classes are:
  - backgrounds `bg-ground` `bg-raised` `bg-inverse` `bg-brand` `bg-stone`
  - text `text-fg` `text-fg-muted` `text-fg-inverse` `text-fg-brand` `text-fg-accent` `text-fg-success` `text-fg-danger`
  - lines `border-line` (dividers only, 1.5:1 contrast) and `border-line-strong` (controls, inputs, focus)
- Night theme = `data-theme="night"` on a container (Studio 08–11, photo overlays, generation screen 07). Modals 10b and 11 stay Day even over the Night Studio. Never hard-code a hex value in a component.
- Type scale classes (Figma style names): `text-hero` `text-serif-xl` `text-serif-l` `text-serif-i` `text-stat` `text-headline` `text-serif-m` `text-heading` `text-serif-i-m` `text-title` `text-body-l` `text-body` `text-ui` `text-body-s` `text-ui-s` `text-label` `text-caption` `text-label-s`. Serif styles use `font-serif` (Bodoni Moda); labels are uppercase. Hero headlines are Hanken Grotesk uppercase, tightly tracked.
- Screen-specific sizes taken from Figma (Nate's decision, in `globals.css`): `text-serif-welcome` 76 (01), `text-serif-generation` 64 (07), `text-serif-greeting` 56 (02), `text-serif-reading` 56 (04), `text-serif-step` 48 (05, 06), `text-stat-s` 48 (02), `text-serif-i-status` 26 and `text-serif-i-s` 22 (italic). Add a named style rather than a `text-[NNpx]` value.
- Radii: `rounded-sm` (2 px: images, cards, inputs), `rounded-lg` (24 px: ambiance arches), `rounded-full` (Studio buttons, tags, segmented). No drop shadows: depth comes from `bg-raised` and hairlines.
- Icons: `lucide-react`, `strokeWidth={1.5}`, 16–24 px, color = currentColor. The Figma icons are the same Lucide shapes.
- Logo: `src/components/brand/Logo.tsx` (`variant="lockup" | "mark"`), color follows currentColor. Never recolor or recompose it.
- Fonts are local (`src/app/fonts`, wired in `src/app/layout.tsx`); no Google Fonts request.

## Motion rules

- Use the presets in `src/lib/motion.ts` (`fadeUp`, `staggerParent`, `depthRise`, `imageHover`, `revealUp`, `drawer`, `scrim`, `modal`, `useParallax`, `inViewOnce`). Import from `motion/react`.
- Entrances: ease out-expo `cubic-bezier(0.16, 1, 0.3, 1)`; A → B moves: `cubic-bezier(0.7, 0, 0.2, 1)`. Nothing bounces.
- Animate only `transform` and `opacity`. Respect `prefers-reduced-motion` (tokens and `useParallax` already do; check new code too).
- Parallax: far 0.3×, mid 0.6×, near 1.2× scroll speed, ±120 px max. Mobile shared view: sticky photo, sheet scrolls over it.

## Copy and locale

- UI language: French (Belgium), informal « tu ». Use the exact strings from the screen PNGs and `docs/handoff.md`. Furniture names, merchants and prices are demo data.
- Format numbers with `formatEUR` / `formatM2` from `src/lib/ambiances.ts` (`6 840 €`, `8,7 m²`). `<html lang="fr-BE">`.

## Code conventions

- Server Components by default; add `"use client"` only for interaction, motion or 3D.
- Folders: `src/app` routes (see the route table in `docs/handoff.md`), `src/components/ui` (design-system components, one per file, named like Figma), `src/components/<feature>` (studio, wizard, dashboard, share), `src/lib` (helpers, motion, data access), `src/types`.
- Component props follow `src/types/socle.ts`. Keep components small and token-driven; no inline style colors.
- Accessibility: visible focus (already global), radiogroup for segmented controls, `aria-current` for nav, named icon buttons, `aria-live="polite"` on progress screens, 44 px touch targets under 1024 px.

## Definition of done (every task)

1. `npm run build` and `npm run lint` pass, no TypeScript errors.
2. The screen matches its PNG in `docs/screens/` at 1440 × 900 (layout, spacing, type, colors), in Day and Night where relevant.
3. Hover, focus, empty, loading and error states from `docs/handoff.md` exist.
4. No hard-coded colors, no default Tailwind colors, no new fonts.
5. Tick the phase item in `docs/plan-de-build.md` and commit with a short message.

## Don't

- Don't add a UI library (shadcn, MUI, Chakra…) — build from the tokens.
- Don't change tokens or `src/styles/tokens.css` without Nate asking; they mirror Figma.
- Don't invent features, screens or copy that are not in the spec; list open questions in `docs/questions.md` instead.
- Don't commit `.env*` files (except `.env.example`).
