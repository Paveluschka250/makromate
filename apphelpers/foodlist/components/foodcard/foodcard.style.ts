import { borderRadius, colors, spacing, typography } from "@/lib/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    minWidth: 0,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  per100g: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  stat: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
});
