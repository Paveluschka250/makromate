import { colors, spacing, typography } from "@/lib/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenPaddingHorizontal,
    paddingTop: spacing.sectionGap,
    paddingBottom: spacing.screenPaddingBottom,
    gap: spacing.sectionGap,
  },
  header: {
    gap: spacing.formGap,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textMuted,
  },
  form: {
    gap: spacing.formGap,
  },
  fieldLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.formFieldGap,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  datePickerActions: {
    marginTop: spacing.md,
  },
});
