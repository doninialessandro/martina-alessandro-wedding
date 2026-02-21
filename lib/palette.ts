/**
 * Project Color Palette
 * Extracted from the floral/garden mood board reference image.
 *
 * Usage:
 *   import { palette } from "@/lib/palette"
 *   <div style={{ color: palette.sage }}>...</div>
 */

export const palette = {
  /** Sage green – accents, subtitles, focus rings, interactive highlights */
  sage: "#8E9E8C",
  sageDark: "#4A6A46",
  sageDeep: "#3B5B38",

  /** Warm amber / marigold – flower center, warm emphasis */
  amber: "#E6AE3E",
  amberDark: "#D49A2C",
  amberDeep: "#BE8520",

  /** Coral / terracotta – flower petals, warm accents */
  coral: "#E8845A",
  coralDark: "#DC7048",
  coralMid: "#D0603C",
  coralDeep: "#BA5030",

  /** Soft peach / blush – muted states, gentle backgrounds */
  peach: "#F2C4B0",
  peachLight: "#F5D5C5",

  /** Cream / ivory – page background, panels, cards */
  cream: "#FAF8F2",
  creamDark: "#F3F0E8",

  /** Neutrals – text, borders, dividers */
  text: "#1A1A1A",
  textBody: "#3A3530",
  textMuted: "#4A4440",
  border: "#D5CCBC",
  wordMuted: "#D5CCBC",
} as const

export type PaletteKey = keyof typeof palette
