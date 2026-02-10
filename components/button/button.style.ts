import { StyleSheet } from "react-native";

export const buttonColors = {
  primaryBg: "#13ec49",
  primaryText: "#102116",
  secondaryBg: "#14532d",
  secondaryText: "#dcfce7",
  chipBg: "#0b1a12",
  chipBorder: "#2d4a3a",
  chipText: "#7f9d8c",
  chipActiveBg: "rgba(34, 197, 94, 0.15)",
  chipActiveBorder: "#22c55e",
  chipActiveText: "#22c55e",
  outlineBorder: "#13ec49",
  outlineText: "#13ec49",
  dangerBg: "#f87171",
  dangerText: "#450a0a",
  shadow: "#000000",
  shadowOpacity: 0.35,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
  },
  content: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
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
    borderWidth: 1.5,
    borderColor: buttonColors.outlineBorder,
  },
  outlineLabel: {
    color: buttonColors.outlineText,
  },
  chipButton: {
    marginVertical: 0,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: buttonColors.chipBorder,
    backgroundColor: buttonColors.chipBg,
  },
  chipButtonActive: {
    borderColor: buttonColors.chipActiveBorder,
    backgroundColor: buttonColors.chipActiveBg,
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: buttonColors.chipText,
  },
  chipLabelActive: {
    color: buttonColors.chipActiveText,
  },
});

export default styles;
