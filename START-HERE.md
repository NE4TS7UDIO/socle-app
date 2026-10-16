# Start here — building Socle with Claude Code in Antigravity

This folder is a ready-to-run Next.js project with everything Claude Code needs: the rules (`CLAUDE.md`), the full spec (`docs/handoff.md`), a PNG of every screen (`docs/screens`), the build plan with copy-paste prompts (`docs/plan-de-build.md`), the Socle tokens, fonts, logo, images and demo data. Build, lint and type-check already pass.

## 1. Install once (Windows)

1. **Node.js 22 LTS** — https://nodejs.org (check with `node -v` in a terminal).
2. **Git for Windows** — https://git-scm.com/downloads/win (Claude Code uses its Git Bash; optional but recommended).
3. **Claude Code** — in PowerShell: `irm https://claude.ai/install.ps1 | iex`, then open a new terminal and run `claude --version`. Needs a Claude Pro, Max, Team or Enterprise plan (or an API key with credits).

## 2. Open the project in Antigravity

1. Antigravity → **Open Folder** → `E:\ATELIER NATE\PROJECTS\SOCLE\08 APP\socle-app`.
2. Either:
   - **Extension**: Extensions panel (Ctrl+Shift+X) → search « Claude Code » → install the Anthropic extension → open it from its icon in the sidebar; or
   - **Terminal**: Terminal → New Terminal → type `claude`.
3. First launch: sign in when Claude Code asks. When it offers to trust the project's MCP server **figma**, accept, then run `/mcp` and authenticate Figma so Claude can read the design file directly.

Antigravity's own agent can stay on the side: `AGENTS.md` points it to the same rules.

## 3. First run

In the Antigravity terminal (PowerShell), from the project folder:

```
powershell -ExecutionPolicy Bypass -File setup\install.ps1
npm install
npm run dev
```

The first line installs Claude Code's project files (`.claude/` with permissions and the `/next-phase`, `/build-screen`, `/design-check` commands, and `.mcp.json` for Figma). They ship in `setup/` because hidden config folders can't be copied to your drive remotely. Do this before launching `claude`.

Open http://localhost:3000 — you should see the Socle start page in Day and Night.

## 4. Build the app, phase by phase

In Claude Code, paste the prompt of **Phase 0** from `docs/plan-de-build.md`. When it's done, either paste the next phase's prompt or simply type:

```
/next-phase
```

Useful commands in this project:

| Command | What it does |
| --- | --- |
| `/next-phase` | Continues the build plan from the first unchecked box, then stops for your review |
| `/build-screen 06` | Builds or fixes one screen against its PNG and the Figma file |
| `/design-check` | Audits the code for off-brand colors, missing states, motion and copy issues, then fixes them |

Tips:
- Review in the browser at the end of each phase before continuing; ask for changes in plain words (« le titre est trop grand », « ralentis l'animation »).
- If Claude Code proposes something not in the spec, it writes it in `docs/questions.md` instead of guessing.
- Phases 0–7 use demo data (your Appartement 2.3). Accounts, storage and payments arrive in phase 8 and need Supabase and Stripe accounts — Claude Code will tell you which keys to put in `.env.local`.

## What's in the folder

```
socle-app/
├─ START-HERE.md          this guide
├─ CLAUDE.md              rules Claude Code follows (stack, tokens, motion, copy, done-criteria)
├─ AGENTS.md              pointer for other agents (Antigravity) + Next.js notes
├─ setup/                 install.ps1 → creates .claude/ (permissions + commands) and .mcp.json (Figma)
├─ .env.example           keys needed in phase 8
├─ docs/
│  ├─ plan-de-build.md    10 phases with prompts and checks
│  ├─ handoff.md          full developer spec (French) + parcours-client.png
│  ├─ screens/            17 screen PNGs from Figma
│  ├─ components/         component state sheets
│  ├─ motion-spec.png     motion board
│  ├─ brand-book.md, plan-de-lancement.md, questions.md
│  └─ reference/          the Appartement 2.3 3D prototype and 2D plan
├─ public/brand, public/images   logo SVGs, ambiance photos, 3D renders, plan
└─ src/
   ├─ app/                layout (local fonts), globals.css (Tailwind v4 theme), start page
   ├─ styles/tokens.css   Socle design tokens (Day/Night)
   ├─ components/brand/   Logo
   ├─ lib/                motion presets, ambiances, demo data
   └─ types/socle.ts      component props + data model
```
