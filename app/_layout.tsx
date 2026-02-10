import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

function RootNavigator() {
  const { user, loading, profileLoading, isProfileComplete } = useAuth();

  if (loading || (user && profileLoading)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#102116" }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#102116" },
        headerStyle: { backgroundColor: "#102116" },
        headerTintColor: "#dcfce7",
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
