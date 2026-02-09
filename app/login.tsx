import { styles } from "@/apphelpers/login/login.style";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: echte Auth-Anbindung
    router.replace("/(tabs)" as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>Anmelden</Text>
            <Text style={styles.subtitle}>
              Melde dich mit deinem Konto an.
            </Text>

            <View style={styles.form}>
              <Input
                label="E-Mail"
                placeholder="name@beispiel.de"
                leftIcon="mail"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Passwort"
                placeholder="••••••••"
                leftIcon="lock"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <View style={styles.submitButton}>
                <Button label="Anmelden" variant="primary" onPress={handleLogin} />
              </View>
            </View>

            <View style={styles.options}>
              <Pressable
                onPress={() => router.push("/forgot-password")}
                hitSlop={12}
              >
                <Text style={styles.link}>Passwort vergessen?</Text>
              </Pressable>

              <View style={styles.registerRow}>
                <Text style={styles.registerHint}>Noch kein Konto?</Text>
                <Pressable
                  onPress={() => router.push("/register")}
                  hitSlop={12}
                >
                  <Text style={styles.link}>Jetzt registrieren</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
