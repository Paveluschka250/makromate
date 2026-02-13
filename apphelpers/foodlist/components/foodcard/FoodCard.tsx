import type { FoodCardProps, IconSet } from "@/apphelpers/foodlist/foodlist.types";
import { colors, iconSize } from "@/lib/theme";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./foodcard.style";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];
const FEATHER_DEFAULT: FeatherIconName = "package";

function CategoryIcon({
  iconSet,
  iconName,
}: {
  iconSet: IconSet;
  iconName: string;
}) {
  const size = iconSize.md;
  const color = colors.primary;

  switch (iconSet) {
    case "feather":
      return (
        <Feather
          name={(iconName?.trim() || FEATHER_DEFAULT) as FeatherIconName}
          size={size}
          color={color}
        />
      );
    case "material":
      return (
        <MaterialCommunityIcons
          name={(iconName?.trim() || "food") as any}
          size={size}
          color={color}
        />
      );
    case "ionicons":
      return (
        <Ionicons
          name={(iconName?.trim() || "nutrition") as any}
          size={size}
          color={color}
        />
      );
    default:
      return (
        <Feather
          name={(iconName?.trim() || FEATHER_DEFAULT) as FeatherIconName}
          size={size}
          color={color}
        />
      );
  }
}

export default function FoodCard({ food, onPress, containerStyle }: FoodCardProps) {
  const iconSet = food.categoryIconSet ?? "feather";
  const cardStyle = [styles.card, containerStyle];

  const content = (
    <>
      <View style={styles.iconWrapper}>
        <CategoryIcon
          iconSet={iconSet}
          iconName={food.categoryIconName}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={2}>
            {food.name}
          </Text>
          <Text style={styles.per100g}>pro 100g</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.stat}>{Math.round(food.caloriesPer100g)} kcal</Text>
          <Text style={styles.stat}>•</Text>
          <Text style={styles.stat}>{food.proteinPer100g.toFixed(1)} g Protein</Text>
        </View>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [...cardStyle, pressed && { opacity: 0.85 }]}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{content}</View>;
}
