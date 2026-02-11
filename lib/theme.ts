/**
 * Zentrales App-Theme: Farben, Abstände, Typografie, Radii.
 * Überall in der App importieren und nutzen für ein konsistentes Erscheinungsbild.
 */

export const colors = {
  // Hintergründe
  background: "#102116",
  backgroundSecondary: "#0b1a12",
  surface: "#1b2b22",
  surfaceElevated: "#14532d",

  // Text
  text: "#dcfce7",
  textMuted: "#7f9d8c",
  textOnPrimary: "#102116",
  textOnDanger: "#450a0a",

  // Akzent / Primary
  primary: "#22c55e",

  // Input / Outline
  outline: "#22342a",
  outlineActive: "#22c55e",

  // Zustände
  error: "#ef4444",
  danger: "#f87171",
  chipBorder: "#2d4a3a",

  // Transparenzen (für Overlays, aktive Chips, Tab-Kreis)
  primaryAlpha15: "rgba(34, 197, 94, 0.15)",
  primaryAlpha20: "rgba(34, 197, 94, 0.2)",
  overlay: "rgba(0, 0, 0, 0.4)",

  // Schatten
  shadow: "#000000",
  shadowOpacity: 0.35,
  glowPrimary: "#13ec49",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,

  // Häufige Abstände mit Namen
  screenPaddingHorizontal: 24,
  screenPaddingTop: 16,
  screenPaddingBottom: 24,
  formGap: 16,
  formFieldGap: 10,
  sectionGap: 32,
  buttonGap: 12,
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 15,
    md: 16,
    lg: 20,
    xl: 22,
    xxl: 24,
    title: 28,
  },
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 24,
  full: 999,
} as const;

/** Einheitliche Rahmendicke für Inputs und Buttons mit Border */
export const borderWidth = {
  default: 1.5,
} as const;

export const iconSize = {
  sm: 22,
  md: 24,
  lg: 28,
} as const;

/** Einzeilige Zugriffe für häufige Kombinationen */
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  borderWidth,
  iconSize,
} as const;

export default theme;
