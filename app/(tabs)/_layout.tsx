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

const INACTIVE_ICON_SIZE = 24;
const ACTIVE_ICON_SIZE = 28;
const ACTIVE_CIRCLE_SIZE = 44;

const timingConfig = {
  duration: 320,
  easing: Easing.bezier(0.33, 0, 0.2, 1),
};

const CIRCLE_ACTIVE_COLOR = "rgba(34, 197, 94, 0.2)";

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
      ["transparent", CIRCLE_ACTIVE_COLOR]
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
          [1, ACTIVE_ICON_SIZE / INACTIVE_ICON_SIZE]
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
        <Feather name={name} size={INACTIVE_ICON_SIZE} color={color} />
      </Animated.View>
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#102116" },
        headerTintColor: "#dcfce7",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#0b1a12",
          borderTopWidth: 0,
          paddingVertical: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
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
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#7f9d8c",
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
