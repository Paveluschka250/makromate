import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        contentStyle: { backgroundColor: "#102116" },
        headerStyle: { backgroundColor: "#102116" },
        headerTintColor: "#dcfce7",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ title: "Registrieren", headerBackTitle: "Zurück" }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Passwort vergessen", headerBackTitle: "Zurück" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
