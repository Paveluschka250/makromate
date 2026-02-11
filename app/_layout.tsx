import { AuthProvider, useAuth } from "@/context/AuthContext";
import { colors } from "@/lib/theme";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const { user, loading, profile, profileLoading, isProfileComplete } = useAuth();

  if (loading || (user && profileLoading && !profile)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Protected guard={!!user && isProfileComplete}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit-profile"
          options={{ title: "Profil bearbeiten", headerBackTitle: "Zurück" }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!!user && !isProfileComplete}>
        <Stack.Screen
          name="complete-profile"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{ title: "Registrieren", headerBackTitle: "Zurück" }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{ title: "Passwort vergessen", headerBackTitle: "Zurück" }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
