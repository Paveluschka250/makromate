import { styles } from "@/apphelpers/login/login.style";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useAuth } from "@/context/AuthContext";
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
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Bitte E-Mail und Passwort eingeben.");
      return;
    }
    setLoading(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setLoading(false);
    if (signInError) {
      const message =
        signInError.message === "Invalid login credentials"
          ? "Ungültige E-Mail oder Passwort."
          : signInError.message;
      setError(message);
    }
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
                onChangeText={(text) => {
                  setEmail(text);
                  setError(null);
                }}
              />
              <Input
                label="Passwort"
                placeholder="••••••••"
                leftIcon="lock"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError(null);
                }}
                secureTextEntry
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <View style={styles.submitButton}>
                <Button
                  label={loading ? "Wird angemeldet…" : "Anmelden"}
                  variant="primary"
                  onPress={handleLogin}
                  disabled={loading}
                />
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
