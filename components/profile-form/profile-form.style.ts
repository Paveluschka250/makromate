import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f9d8c",
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7f9d8c",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
  submitButton: {
    marginTop: 16,
  },
  datePickerActions: {
    marginTop: 12,
  },
});
