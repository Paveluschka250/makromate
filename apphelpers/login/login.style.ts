import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102116",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#dcfce7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f9d8c",
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  options: {
    marginTop: 24,
    alignItems: "center",
    gap: 12,
  },
  link: {
    fontSize: 15,
    color: "#22c55e",
    fontWeight: "600",
  },
  registerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  registerHint: {
    fontSize: 15,
    color: "#7f9d8c",
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
});
