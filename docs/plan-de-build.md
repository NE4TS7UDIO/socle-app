# Socle — build plan v1

Ten phases, in order. Each phase has a prompt to paste into Claude Code and the checks that close it. Claude Code ticks the boxes as it goes; type `/next-phase` to continue from wherever the list stops.

Phases 0–7 run on demo data (`src/lib/mock`). Real accounts, storage and payments come in phase 8, once the client journey is right.

---

## Phase 0 — Check the base (5 min)

Already done when this folder was prepared: Next.js 16 + Tailwind v4 scaffolded, Socle tokens, local fonts, logo component, motion presets, types, demo data. Build, lint and type-check pass.

Prompt:
> Read CLAUDE.md and docs/plan-de-build.md. If `.claude/settings.json` or `.mcp.json` is missing, copy them from `setup/` (setup/claude → .claude, setup/mcp.json → .mcp.json). Run `npm install`, then `npm run build` and `npm run lint`. Start `npm run dev` and confirm the start page shows the Socle logo, the serif headline and the Day/Night swatches. Initialise git if needed and make a first commit « Base Socle ». Then tell me what you found and wait.

- [x] `npm run build` and `npm run lint` pass on this machine
- [x] Start page renders with Hanken Grotesk + Bodoni Moda, Day and Night panels
- [x] `.claude/` and `.mcp.json` in place; Figma MCP authenticated (`/mcp`)
- [x] First git commit

## Phase 1 — UI kit

Prompt:
> Build the design-system components in `src/components/ui` following docs/handoff.md (section « Composants »), docs/components/*.png and the Figma components (ids in CLAUDE.md): Button (primary, outline, link; hover, pressed, loading, disabled), Segmented (2 and 3 options, radiogroup, sliding active pill), NavItem, Chip, Input, Stat, Switch, Tag (photo pill), ProgressBar, Modal (Day theme, scrim, focus trap, Esc), Icon (lucide wrapper, stroke 1.5). Props from src/types/socle.ts. Then create a private page `/dev/kit` that shows every component in every state, in Day and Night side by side. Use the motion presets for hover and state changes.

- [x] All components exist, typed, token-only
- [x] `/dev/kit` shows every state in both themes
- [x] Keyboard: Tab order, focus ring, arrows in Segmented, Esc closes Modal

## Phase 2 — App shell, 01 Bienvenue, 02 Tableau de bord

Prompt:
> Build the authenticated app shell (sidebar 264 px fixed while content scrolls) and screens 01 /bienvenue and 02 /projets from docs/screens/01-bienvenue.png and 02-tableau-de-bord.png (Figma 27:7 and 27:134; pull exact spacing with the Figma MCP). Use the demo data. Add ProjectCard (hover zoom, « Ouvrir → »), the « rendu prêt » banner, the horizontal inspiration carousel and the stats row. Screen 01: staggered entrance and the parallax photo with three floating tags at 0.3 / 0.6 / 1.2 depth. Continuer → /projets; Nouveau projet → /projets/nouveau; the Appartement 2.3 card → its Studio.

- [x] Both screens match their PNGs at 1440 × 900
- [x] Empty state of 02 (no projects) and loading skeletons
- [x] Sidebar stays fixed while the content scrolls

## Phase 3 — Wizard 03 → 07

Prompt:
> Build the plan wizard: 03 /projets/nouveau (dropzone + « Prendre une photo », file validation JPG/PNG/PDF ≤ 25 Mo), 04 /projets/[id]/lecture (scan-line animation over the plan photo, checklist, auto-advance after 3.5 s — simulate the analysis), 05 /projets/[id]/pieces (vector plan drawn in SVG from `rooms[].polygon`, editable room list synced with the plan, type selects, « Slaapkamer 1 → Dressing » rename, sunrise side toggle), 06 /projets/[id]/ambiance (4 AmbianceCards with hover reveal and depth entrance, budget Segmented, « Je garde » chips) and 07 /projets/[id]/generation (Night theme, animated dome logo loop, two image strips drifting at opposite speeds, rotating status lines, auto-advance to the Studio). Wizard bar with the 3-step stepper and the fixed footer as in the PNGs.

- [ ] 03–07 match their PNGs; step indicator correct on each
- [ ] 05: selecting a room highlights it in the plan and in the list
- [ ] Error states: wrong file type, unreadable plan, room without type

## Phase 4 — Studio shell (08, 08b, 09) on renders

Prompt:
> Build the Studio at /projets/[id]/studio in Night theme with the URL state `?vue=3d|plan|rendus&piece=…&lumiere=matin|soir`. Layout: top bar, rooms rail 264, viewport, inspector 360 (docs/screens/08-studio-3d.png, Figma 33:234). For now the viewport shows the still renders in public/images (studio-3d-sejour-matin/soir.jpg) with Hotspots positioned in %. Matin/Soir and the light slider cross-fade the renders (800 ms). Clicking the sofa hotspot or its Piece row opens the swap drawer 09 (Figma 34:627) with the fit box, door tag, filters and 4 options; « Essayer » swaps the row. Plan view 08c shows plan-2d-meuble.png on a paper card. Keyboard shortcuts from docs/handoff.md (1/2/3, M/S, Esc).

- [ ] 08, 08b, 08c, 09 match their PNGs
- [ ] URL reflects view, room and light; reload restores the same view
- [ ] Inspector total updates when a piece is swapped

## Phase 5 — Real 3D in the Studio

Prompt:
> Replace the still renders with a React Three Fiber scene ported from docs/reference/appartement-2-3-maquette-3d.html: walls extruded from `rooms[].polygon` (ceiling 260 cm), floors, furniture as simple meshes matching the prototype, camera presets per room (presetPose logic) animated over 1200 ms in-out, OrbitControls with damping and polar limits 20–75°, sun light driven by `sunrise` + the time slider (warm evening ≈ 2700 K, long shadows), drei <Html> hotspots anchored on each piece, `frameloop="demand"`. Fall back to the plan view if WebGL is missing. Fill `position`/`rotationY` in the demo data from the prototype.

- [ ] Room rail moves the camera to each room; user input cancels the animation
- [ ] Morning/evening light visibly different, shadows on
- [ ] 60 fps on a mid laptop; first render < 3 s

## Phase 6 — Rendus, Débloquer, Partager, Liste d'achats

Prompt:
> Build 10 Rendus (gallery with watermark and lock), 10b Débloquer (Day modal, 39 €, card + Bancontact buttons — mock for now), 11 Partager (link + copy feedback, access list, switches, export tiles) as `?modal=` overlays on the Studio, and 12 /projets/[id]/achats (grouped table by room or merchant, status chips, budget card with animated bar). Follow the PNGs and the edge cases in docs/handoff.md.

- [ ] Modals: scrim + rise animation, focus trap, Esc, URL-driven
- [ ] Shopping list totals = 6 840 € on the demo data, kept items deducted
- [ ] Locked actions (export, HD) route to 10b

## Phase 7 — Public shared view (mobile)

Prompt:
> Build /p/[slug] — the read-only page Rania opens on her phone (docs/screens/13-mobile-vue-partagee.png and 13b, Figma 38:1190). Sticky hero photo with the sheet scrolling over it (real scroll parallax), stats, Nate's quote, room cards with « Voir en 3D » and comment counts, comment thread, horizontally scrolling material swatches, budget, fixed « Ajouter un commentaire » bar. No account needed; first comment asks for first name + e-mail. Also make it work on desktop (centered column).

- [ ] Matches 13 and 13b at 390 × 844
- [ ] Parallax is scroll-linked and off under reduced motion
- [ ] Revoked link shows « Ce lien n'est plus actif »

## Phase 8 — Accounts, data, payments

Prompt:
> Add Supabase: auth (magic link), tables projects / rooms / pieces / comments / shares matching src/types/socle.ts, row-level security, storage bucket for plan photos. Replace the demo data with real queries, keep the demo project seeded for Nate's account. Add Stripe Checkout for the 39 € unlock (card + Bancontact), webhook that sets `unlocked = true`, and transactional e-mails (« ton rendu est prêt », invitation to share). Keys in .env.local only; update .env.example.

- [ ] Sign-in, create project, upload plan, reopen later
- [ ] Test payment unlocks exports and HD
- [ ] RLS: a user cannot read another user's project; public share only through /p/[slug]

## Phase 9 — Polish

Prompt:
> Do a full pass: motion (every entrance, hover and transition matches docs/motion-spec.png and src/lib/motion.ts), accessibility (docs/handoff.md « Accessibilité »), responsive behaviour for 1280, 1024, 834 and 390 widths (« Layout & breakpoints »), loading/empty/error states, Lighthouse ≥ 90 on performance and accessibility for /projets and /p/[slug]. Write what you changed in docs/changelog.md.

- [ ] Reduced-motion mode checked on every screen
- [ ] All breakpoints checked
- [ ] Lighthouse scores recorded

---

Open questions for Nate live in `docs/questions.md` (HD render engine, plan-reading provider, furniture catalogue, VAT on 39 €, Dutch at launch, mobile 3D editing).
