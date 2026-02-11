import { borderRadius, borderWidth, colors, spacing } from "@/lib/theme";
import { StyleSheet } from "react-native";

export const iconButtonColors = {
  primaryBg: colors.primary,
  primaryIcon: colors.textOnPrimary,
  secondaryBg: colors.surfaceElevated,
  secondaryIcon: colors.primary,
  outlineBorder: colors.primary,
  outlineIcon: colors.primary,
  dangerBg: colors.danger,
  dangerIcon: colors.textOnDanger,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.full,
    marginVertical: spacing.xs + 2,
    marginHorizontal: spacing.xs,
  },
  glow: {
    shadowColor: colors.glowPrimary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  outlined: {
    borderWidth: borderWidth.default,
    borderColor: iconButtonColors.outlineBorder,
  },
});

export default styles;
