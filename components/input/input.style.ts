import { StyleSheet } from "react-native";

export const inputColors = {
  background: "#1b2b22",
  text: "#d9f3e2",
  placeholder: "#7f9d8c",
  outline: "#22342a",
  outlineActive: "#22c55e",
  error: "#f87171",
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: inputColors.background,
    borderRadius: 999,
    height: 52,
    paddingHorizontal: 6,
  },
  outline: {
    borderRadius: 999,
    borderWidth: 1.2,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  helper: {
    marginTop: 4,
  },
});

export default styles;
