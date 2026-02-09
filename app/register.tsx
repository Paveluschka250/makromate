import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // TODO: Registrierung anbinden
    router.replace("/(tabs)" as never);
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
            <Text style={styles.title}>Registrieren</Text>
            <Text style={styles.subtitle}>
              Erstelle ein neues Konto.
            </Text>
            <View style={styles.form}>
              <Input
                label="Name"
                placeholder="Dein Name"
                leftIcon="user"
                value={name}
                onChangeText={setName}
              />
              <Input
                label="E-Mail"
                placeholder="name@beispiel.de"
                leftIcon="mail"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Passwort"
                placeholder="Mindestens 8 Zeichen"
                leftIcon="lock"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                helperText="Mindestens 8 Zeichen"
              />
              <View style={styles.actions}>
                <Button
                  label="Konto erstellen"
                  variant="primary"
                  onPress={handleRegister}
                />
                <View style={styles.loginRow}>
                  <Text style={styles.loginHint}>Bereits registriert?</Text>
                  <Pressable onPress={() => router.back()} hitSlop={12}>
                    <Text style={styles.link}>Zum Login</Text>
                  </Pressable>
                </View>
              </View>
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
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  actions: {
    marginTop: 8,
    gap: 16,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  loginHint: {
    fontSize: 15,
    color: "#7f9d8c",
  },
  link: {
    fontSize: 15,
    color: "#22c55e",
    fontWeight: "600",
  },
});
