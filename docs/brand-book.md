Socle turns a floor plan into a furnished, editorial-looking home in one tap: pick a style, the rooms furnish themselves in one coherent material language. The brand looks and sounds like the interiors it produces: warm low sun, oat bouclé, walnut, travertine, polished chrome, black-and-cream abstract art. It is an interiors magazine, not a CAD tool.

**Tagline.** EN: *Your home, styled like a magazine.* · FR: *Votre intérieur, comme dans un magazine.*

## Content fundamentals

- **Voice: calm, confident, editorial.** Short sentences, concrete nouns, material words. Describe the room, never the software.
- **Address:** "you" in English; "tu" in French for product and social, "vous" for the site's legal and B2B pages.
- **Casing:** sentence case everywhere. The name is written **Socle** in text and **socle** (lowercase) only in the wordmark. Style presets are proper names in `display-italic`: *Warm Minimal*, *Belgian Modern*, *Seventies Revival*, *Japandi*.
- **Lists of materials** use the middle dot and uppercase `label`: NOYER · TRAVERTIN · CHROME.
- **No** exclamation marks, emoji, superlatives ("the best", "revolutionary"), AI jargon ("powered by AI"), or urgency ("last chance").
- Real copy:
  - Hero: "Votre intérieur, comme dans un magazine." / "Your home, styled like a magazine."
  - Action: "Choisir ce style" · "Exporter le plan" · "Partager la maquette"
  - Empty state: "Dépose ton plan ici. Une photo ou un PDF suffit."
  - Success: "Export prêt." (in `olive`, with the word, never colour alone)

## Visual foundations

**Colour.** `oat` is the ground; `ink` carries text and the primary button (label in `on-ink`). `walnut` is the brand colour for large blocks, links, active states and `focus-ring`. `travertine` and `linen` are quiet supporting fills; `chrome` is a thin metal accent (plinth bars, dividers), never text in Jour. `cognac` highlights one thing per view at most. `olive` and `danger` are status colours and always come with a word. Two themes: Jour (default) and Nuit; every text token's usage note names the grounds it reads on in both.

**Type.** Two families. `display` (Bodoni Moda) is the magazine voice: hero lines and covers in `display`, preset names and the one leaning word in `display-italic`. Everything else is Hanken Grotesk: `headline` (tight, -3.5%) for section heads, `title`, `body` (max 65 characters a line), `label` (uppercase, +12% tracking). Never set long text in Bodoni; never set the headline in italics.

**Shape: the dome on its plinth.** The motif comes from the chrome mushroom lamp and the object-on-a-socle: a half-disc resting on a thin bar. Use it as the mark, as image crops (arched tops on hero images and preset cards), as the loading indicator, and as a pattern on covers. Corners: `radius-sm` for controls and frames, `radius-lg` for preset cards and room tiles, `radius-pill` for chips and domes.

**Layout.** Editorial grid with generous margins (`space-12` between sections, `space-6` gutters). Large images, few words. Separate with `line` hairlines, never drop shadows. Asymmetric compositions: one dominant image, one column of text.

**Imagery.** Interiors in warm, low, raking sunlight with long soft shadows; materials in close-up (bouclé loops, walnut grain, travertine pores, chrome reflections); one olive tree rather than many plants. No people's faces, no clutter, no cool daylight or blue casts. Renders made with Socle follow the same rules: warm sun preset, walls in plaster tones, one hero object in chrome.

**Motion.** Slow and smooth: 400–600 ms ease-out fades and rises; the preset switch is a cross-fade of materials, never a bounce. Respect reduced motion.

**States.** Hover darkens `ink` fills slightly and underlines links in `walnut`; selected chips fill with `ink` and `on-ink` text; disabled is `ink-muted` at reduced opacity with no fill.

## Iconography

Thin line icons, 1.25px stroke at 24px, square caps, drawn on the dome-and-plinth geometry (arcs and straight lines only). No icon set ships with this first version: use Phosphor Light as the stand-in until custom icons exist. No emoji anywhere.

## Logo

Use `socle-lockup-ink.svg` on `oat`, `linen` or `travertine`; `socle-lockup-oat.svg` on `ink`, `walnut` or dark photography. The mark alone (`socle-mark-*`) is for avatars, favicons and the app icon. Keep clear space equal to the dome's height on every side; never recolour the mark in `chrome` or `cognac`, never place it on busy imagery without a solid band.
