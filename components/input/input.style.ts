import { borderRadius, borderWidth, colors, spacing } from "@/lib/theme";
import { StyleSheet } from "react-native";

export const inputColors = {
  background: colors.surface,
  text: colors.text,
  placeholder: colors.textMuted,
  outline: colors.outline,
  outlineActive: colors.outlineActive,
  error: colors.danger,
};

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: inputColors.background,
    borderRadius: borderRadius.full,
    height: 52,
    paddingHorizontal: spacing.sm,
  },
  outline: {
    borderRadius: borderRadius.full,
    borderWidth: borderWidth.default,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  helper: {
    marginTop: spacing.xs,
  },
});

export default styles;
