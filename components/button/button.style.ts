import { borderRadius, borderWidth, colors, spacing, typography } from "@/lib/theme";
import { StyleSheet } from "react-native";

export const buttonColors = {
  primaryBg: colors.primary,
  primaryText: colors.textOnPrimary,
  secondaryBg: colors.surfaceElevated,
  secondaryText: colors.text,
  chipBg: colors.backgroundSecondary,
  chipBorder: colors.chipBorder,
  chipText: colors.textMuted,
  chipActiveBg: colors.primaryAlpha15,
  chipActiveBorder: colors.primary,
  chipActiveText: colors.primary,
  outlineBorder: colors.primary,
  outlineText: colors.primary,
  dangerBg: colors.danger,
  dangerText: colors.textOnDanger,
  shadow: colors.shadow,
  shadowOpacity: colors.shadowOpacity,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.full,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: 0.3,
  },
  shadow: {
    shadowColor: buttonColors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: buttonColors.shadowOpacity,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: buttonColors.primaryBg,
  },
  primaryLabel: {
    color: buttonColors.primaryText,
  },
  secondaryButton: {
    backgroundColor: buttonColors.secondaryBg,
  },
  secondaryLabel: {
    color: buttonColors.secondaryText,
  },
  dangerButton: {
    backgroundColor: buttonColors.dangerBg,
  },
  dangerLabel: {
    color: buttonColors.dangerText,
  },
  outlineButton: {
    borderWidth: borderWidth.default,
    borderColor: buttonColors.outlineBorder,
  },
  outlineLabel: {
    color: buttonColors.outlineText,
  },
  chipButton: {
    borderRadius: borderRadius.sm,
    borderWidth: borderWidth.default,
    borderColor: buttonColors.chipBorder,
    backgroundColor: buttonColors.chipBg,
  },
  chipButtonActive: {
    borderColor: buttonColors.chipActiveBorder,
    backgroundColor: buttonColors.chipActiveBg,
  },
  chipLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: buttonColors.chipText,
  },
  chipLabelActive: {
    color: buttonColors.chipActiveText,
  },
});

export default styles;
