import { StyleSheet } from "react-native";

export const buttonColors = {
  primaryBg: "#13ec49",
  primaryText: "#102116",
  secondaryBg: "#14532d",
  secondaryText: "#dcfce7",
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
    marginVertical: 6,
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
});

export default styles;
