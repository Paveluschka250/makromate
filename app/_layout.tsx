import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        contentStyle: { backgroundColor: "#102116" },
        headerStyle: { backgroundColor: "#102116" },
        headerTintColor: "#dcfce7",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
