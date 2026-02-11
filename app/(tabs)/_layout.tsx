import { borderRadius, colors, iconSize, typography } from "@/lib/theme";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

const ACTIVE_CIRCLE_SIZE = 44;

const timingConfig = {
  duration: 320,
  easing: Easing.bezier(0.33, 0, 0.2, 1),
};

function TabIcon({
  name,
  focused,
  color,
}: {
  name: FeatherIconName;
  focused: boolean;
  color: string;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, timingConfig);
  }, [focused]);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", colors.surfaceElevated]
    ),
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.85, 1]) },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, iconSize.lg / iconSize.md]
        ),
      },
    ],
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(progress.value, [0, 1], [0, 8]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: ACTIVE_CIRCLE_SIZE,
          height: ACTIVE_CIRCLE_SIZE,
          alignItems: "center",
          justifyContent: "center",
        },
        containerAnimatedStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: ACTIVE_CIRCLE_SIZE,
            height: ACTIVE_CIRCLE_SIZE,
            borderRadius: ACTIVE_CIRCLE_SIZE / 2,
          },
          circleAnimatedStyle,
        ]}
      />
      <Animated.View style={iconAnimatedStyle}>
        <Feather name={name} size={iconSize.md} color={color} />
      </Animated.View>
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
        },
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopWidth: 0,
          paddingVertical: 0,
          borderTopLeftRadius: borderRadius.lg,
          borderTopRightRadius: borderRadius.lg,
          overflow: "hidden",
        },
        tabBarItemStyle: {
          paddingVertical: 0,
          justifyContent: "center",
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Kalender",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="calendar" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="foodlist"
        options={{
          title: "Foodlist",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="list" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Einstellungen",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="settings" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
