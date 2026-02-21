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
  sageDark: "#5C6E5A",
  sageDeep: "#4D5F4B",

  /** Warm amber / marigold – flower center, warm emphasis */
  amber: "#D4A24C",
  amberDark: "#C08E3A",
  amberDeep: "#A87A30",

  /** Coral / terracotta – flower petals, warm accents */
  coral: "#D88A6E",
  coralDark: "#C87A5E",
  coralMid: "#B86E54",
  coralDeep: "#A06048",

  /** Soft peach / blush – muted states, gentle backgrounds */
  peach: "#F2C4B0",
  peachLight: "#F5D5C5",

  /** Cream / ivory – page background, panels, cards */
  cream: "#F5F0E3",
  creamDark: "#EDE8DA",

  /** Neutrals – text, borders, dividers */
  text: "#1A1A1A",
  textBody: "#3A3530",
  textMuted: "#4A4440",
  border: "#D5CCBC",
  wordMuted: "#D5CCBC",
} as const

export type PaletteKey = keyof typeof palette
