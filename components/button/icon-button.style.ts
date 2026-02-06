import { StyleSheet } from "react-native";

export const iconButtonColors = {
  primaryBg: "#13ec49",
  primaryIcon: "#052e16",
  secondaryBg: "#14532d",
  secondaryIcon: "#86efac",
  outlineBorder: "#13ec49",
  outlineIcon: "#13ec49",
  dangerBg: "#f87171",
  dangerIcon: "#450a0a",
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    marginVertical: 6,
    marginHorizontal: 4,
  },
  glow: {
    shadowColor: "#13ec49",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: iconButtonColors.outlineBorder,
  },
});

export default styles;
