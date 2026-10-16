---
description: Build or fix one screen against its Figma reference (e.g. /build-screen 06)
argument-hint: <screen number, e.g. 06 or 08b>
---
Build screen $ARGUMENTS.
1. Open docs/screens/$ARGUMENTS-*.png and read its row in docs/handoff.md (« Écrans & parcours ») plus the related component and motion sections.
2. Get the Figma node id from CLAUDE.md and call the Figma MCP (get_design_context / get_screenshot) for exact spacing, sizes and copy.
3. Build it with the components in src/components/ui and the tokens only. Add hover, focus, empty, loading and error states.
4. Run npm run build and npm run lint. Fix everything.
5. Compare with the PNG at 1440 × 900 (390 × 844 for mobile) and list any remaining differences.
