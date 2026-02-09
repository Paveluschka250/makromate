import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // TODO: Passwort-Reset anbinden
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            <Text style={styles.title}>Passwort vergessen?</Text>
            <Text style={styles.subtitle}>
              Gib deine E-Mail ein. Wir schicken dir einen Link zum Zurücksetzen.
            </Text>
            <Input
              label="E-Mail"
              placeholder="name@beispiel.de"
              leftIcon="mail"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.actions}>
              <Button label="Link senden" variant="primary" onPress={handleSubmit} />
              <Button
                label="Zurück"
                variant="outline"
                onPress={() => router.back()}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#dcfce7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#7f9d8c",
    marginBottom: 8,
  },
  actions: {
    marginTop: 16,
    gap: 12,
  },
});
