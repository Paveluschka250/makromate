import { borderRadius, colors, spacing, typography } from "@/lib/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPaddingHorizontal,
    paddingTop: spacing.screenPaddingTop,
  },
  inner: {
    flex: 1,
    gap: spacing.sectionGap,
  },
  headerRow: {
    backgroundColor: colors.surfaceElevated,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl + 4,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.full,
  },
  headerText: {
    flexShrink: 1,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  email: {
    fontSize: typography.fontSize.base,
    color: colors.textMuted,
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    gap: spacing.buttonGap,
  },
  deleteSection: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  deleteErrorContainer: {
    marginTop: spacing.xs,
  },
  deleteActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
