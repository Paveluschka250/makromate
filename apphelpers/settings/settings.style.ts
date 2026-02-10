import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102116",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 32,
  },
  headerRow: {
    backgroundColor: "#14532d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 999,
  },
  headerText: {
    flexShrink: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#dcfce7",
  },
  email: {
    fontSize: 15,
    color: "#7f9d8c",
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#22c55e",
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
    fontSize: 20,
    fontWeight: "700",
    color: "#22c55e",
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    gap: 12,
  },
});
