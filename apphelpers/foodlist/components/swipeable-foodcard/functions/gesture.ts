import type { SharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, withSpring, withTiming } from "react-native-reanimated";

export const SPRING_CONFIG = { damping: 22, stiffness: 180 };

const THRESHOLD_FACTOR = 0.35;

export function getSwipeThreshold(swipeRevealPx: number): number {
  return swipeRevealPx * THRESHOLD_FACTOR;
}

export function createPanGesture(
  translateX: SharedValue<number>,
  startX: SharedValue<number>,
  pressed: SharedValue<boolean>,
  swipeRevealPx: number,
  springConfig: typeof SPRING_CONFIG
) {
  const threshold = getSwipeThreshold(swipeRevealPx);

  return Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      pressed.value = true;
    })
    .onUpdate((e) => {
      const next = startX.value + e.translationX;
      translateX.value = Math.max(
        -swipeRevealPx,
        Math.min(swipeRevealPx, next)
      );
    })
    .onEnd(() => {
      const current = translateX.value;
      if (current > threshold) {
        translateX.value = withSpring(swipeRevealPx, springConfig);
      } else if (current < -threshold) {
        translateX.value = withSpring(-swipeRevealPx, springConfig);
      } else {
        translateX.value = withSpring(0, springConfig);
      }
      pressed.value = false;
    });
}

export function createCloseAndEdit(
  translateX: SharedValue<number>,
  springConfig: typeof SPRING_CONFIG,
  onEdit: () => void
): () => void {
  return () => {
    translateX.value = withSpring(0, springConfig);
    onEdit();
  };
}

export function createCloseAndDelete(
  translateX: SharedValue<number>,
  springConfig: typeof SPRING_CONFIG,
  onDelete: () => void
): () => void {
  return () => {
    translateX.value = withSpring(0, springConfig);
    onDelete();
  };
}

export function startDeleteExitAnimation(
  shared: {
    translateX: SharedValue<number>;
    rowHeight: SharedValue<number>;
    rowMarginBottom: SharedValue<number>;
    hasTriggeredDelete: SharedValue<boolean>;
  },
  options: { screenWidth: number; onRemoveAfterAnimation: () => void }
): void {
  if (shared.hasTriggeredDelete.value) return;
  shared.hasTriggeredDelete.value = true;
  shared.rowHeight.value = withTiming(0, { duration: 220 });
  shared.rowMarginBottom.value = withTiming(0, { duration: 220 });
  shared.translateX.value = withTiming(
    -options.screenWidth,
    { duration: 280 },
    (finished) => {
      if (finished) runOnJS(options.onRemoveAfterAnimation)();
    }
  );
}
