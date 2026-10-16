---
description: Audit the code for design-system violations
---
Audit the changed files (or the whole src/ if nothing changed) against CLAUDE.md « Design rules », « Motion rules » and « Copy and locale ». Report, with file:line: hard-coded colors or hex values, default Tailwind colors, inline styles for color/spacing, missing focus or hover states, non-token radii or shadows, animations on properties other than transform/opacity, missing reduced-motion handling, English or « vous » in UI copy, unformatted prices/areas. Then fix them.
