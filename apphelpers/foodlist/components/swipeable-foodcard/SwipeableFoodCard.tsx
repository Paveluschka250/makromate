import { colors } from "@/lib/theme";
import { Feather } from "@expo/vector-icons";
import { GestureDetector } from "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FoodCard from "../foodcard/FoodCard";
import {
  createCloseAndDelete,
  createCloseAndEdit,
  createPanGesture,
  SPRING_CONFIG,
  startDeleteExitAnimation,
} from "./functions/gesture";
import type { SwipeableFoodCardProps } from "./swipeable-foodcard.types";
import {
  swipeableFoodCardStyles as styles,
  ROW_HEIGHT_PX,
  SCREEN_WIDTH_PX,
  SWIPE_REVEAL_PX,
} from "./swipeable-foodcard.style";

export default function SwipeableFoodCard({
  food,
  onEdit,
  onDelete,
  onRemoveAfterAnimation,
  isDeleting = false,
}: SwipeableFoodCardProps) {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const rowHeight = useSharedValue(ROW_HEIGHT_PX);
  const rowMarginBottom = useSharedValue(8);
  const hasTriggeredDelete = useSharedValue(false);

  const pan = React.useMemo(
    () =>
      createPanGesture(
        translateX,
        startX,
        pressed,
        SWIPE_REVEAL_PX,
        SPRING_CONFIG
      ),
    []
  );

  useEffect(() => {
    if (isDeleting) {
      startDeleteExitAnimation(
        {
          translateX,
          rowHeight,
          rowMarginBottom,
          hasTriggeredDelete,
        },
        { screenWidth: SCREEN_WIDTH_PX, onRemoveAfterAnimation }
      );
    }
  }, [isDeleting, onRemoveAfterAnimation]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: withTiming(pressed.value ? 1.02 : 1) },
    ],
  }));

  const animatedRowStyle = useAnimatedStyle(() => ({
    height: rowHeight.value,
    marginBottom: rowMarginBottom.value,
  }));

  const leftActionOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_REVEAL_PX],
      [0, 1],
      "clamp"
    ),
  }));

  const rightActionOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_REVEAL_PX, 0],
      [1, 0],
      "clamp"
    ),
  }));

  const closeAndEdit = createCloseAndEdit(translateX, SPRING_CONFIG, onEdit);
  const closeAndDelete = createCloseAndDelete(
    translateX,
    SPRING_CONFIG,
    onDelete
  );

  return (
    <Animated.View style={[styles.rowContainer, animatedRowStyle]}>
      <View style={styles.rowInner}>
        <Pressable style={styles.actionLeftTouchable} onPress={closeAndEdit}>
          <Animated.View style={[styles.actionLeft, leftActionOpacity]}>
            <Feather name="edit-2" size={24} color={colors.textOnPrimary} />
          </Animated.View>
        </Pressable>
        <Pressable style={styles.actionRightTouchable} onPress={closeAndDelete}>
          <Animated.View style={[styles.actionRight, rightActionOpacity]}>
            <Feather name="trash-2" size={24} color="#fef2f2" />
          </Animated.View>
        </Pressable>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.cardContainer, animatedCardStyle]}>
          <View style={styles.cardWithShadow}>
            <FoodCard food={food} containerStyle={styles.cardFill} />
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
