import Button from "@/components/button/button";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.inner}>
        <Text style={styles.title}>Einstellungen</Text>
        {user?.email ? (
          <Text style={styles.email}>{user.email}</Text>
        ) : null}
        <View style={styles.actions}>
          <Button
            label="Abmelden"
            variant="outline"
            onPress={() => signOut()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102116",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#dcfce7",
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: "#7f9d8c",
    marginBottom: 24,
  },
  actions: {
    marginTop: 8,
  },
});
