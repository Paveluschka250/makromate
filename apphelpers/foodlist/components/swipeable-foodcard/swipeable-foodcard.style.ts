import { borderRadius, colors } from "@/lib/theme";
import { Dimensions, StyleSheet } from "react-native";

const ROW_HEIGHT = 72;
/** 25px = Padding der Buttons in Richtung Card (Überlappungszone). */
const CARD_OVERLAP_PX = 25;
/** Button-Breite: 72 + 25. Buttons liegen komplett unter der Card, keine Lücke. */
const ACTION_WIDTH = 72 + CARD_OVERLAP_PX;
/** Wie weit die Card beim Swipe rutscht (= sichtbarer Button ohne Überlappung). */
const SWIPE_REVEAL_PX = ACTION_WIDTH - CARD_OVERLAP_PX;
const SCREEN_WIDTH = Dimensions.get("window").width;

export const swipeableFoodCardStyles = StyleSheet.create({
  rowContainer: {
    overflow: "hidden",
  },
  rowInner: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: borderRadius.lg,
    height: ROW_HEIGHT,
    backgroundColor: colors.background,
  },
  actionLeftTouchable: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    zIndex: 0,
  },
  actionRightTouchable: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    zIndex: 0,
  },
  actionLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopLeftRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.lg,
    paddingRight: CARD_OVERLAP_PX,
  },
  actionRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger,
    borderTopRightRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
    paddingLeft: CARD_OVERLAP_PX,
  },
  cardContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardWithShadow: {
    height: ROW_HEIGHT,
    overflow: "hidden",
    borderRadius: borderRadius.lg,
    alignSelf: "stretch",
  },
  cardFill: {
    flex: 1,
    height: "100%",
  },
});

export const ACTION_WIDTH_PX = ACTION_WIDTH;
export { SWIPE_REVEAL_PX };
export const ROW_HEIGHT_PX = ROW_HEIGHT;
export const SCREEN_WIDTH_PX = SCREEN_WIDTH;
