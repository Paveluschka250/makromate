import SwipeableFoodCard from "@/apphelpers/foodlist/components/swipeable-foodcard/SwipeableFoodCard";
import type { FoodCardData } from "@/apphelpers/foodlist/foodlist.types";
import { colors, spacing } from "@/lib/theme";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const MOCK_FOODS: FoodCardData[] = [
  {
    id: "1",
    name: "Hähnchenbrust",
    caloriesPer100g: 165,
    proteinPer100g: 31,
    categoryName: "Fleisch",
    categoryIconName: "package",
  },
  {
    id: "2",
    name: "Reis (gekocht)",
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    categoryName: "Getreide",
    categoryIconName: "circle",
  },
  {
    id: "3",
    name: "Apfel",
    caloriesPer100g: 52,
    proteinPer100g: 0.3,
    categoryName: "Obst",
    categoryIconSet: "material",
    categoryIconName: "apple",
  },
  {
    id: "4",
    name: "Naturjoghurt",
    caloriesPer100g: 62,
    proteinPer100g: 5.4,
    categoryName: "Milchprodukte",
    categoryIconName: "droplet",
  },
  {
    id: "5",
    name: "Vollkornbrot",
    caloriesPer100g: 247,
    proteinPer100g: 8.5,
    categoryName: "Getreide",
    categoryIconName: "coffee",
  },
  {
    id: "6",
    name: "Lachs (geräuchert)",
    caloriesPer100g: 117,
    proteinPer100g: 18.3,
    categoryName: "Fisch",
    categoryIconSet: "material",
    categoryIconName: "fish",
  },
  {
    id: "7",
    name: "Banane",
    caloriesPer100g: 89,
    proteinPer100g: 1.1,
    categoryName: "Obst",
    categoryIconSet: "ionicons",
    categoryIconName: "nutrition",
  },
  {
    id: "8",
    name: "Magerquark",
    caloriesPer100g: 67,
    proteinPer100g: 12.6,
    categoryName: "Milchprodukte",
    categoryIconName: "zap",
  },
];

export default function Foodlist() {
  const [foods, setFoods] = useState<FoodCardData[]>(MOCK_FOODS);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (food: FoodCardData) => {
    Alert.alert("Bearbeiten", `${food.name} – Bearbeiten kommt demnächst.`);
  };

  const handleDeletePress = (food: FoodCardData) => {
    Alert.alert(
      "Löschen",
      `"${food.name}" wirklich löschen?`,
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => setDeletingId(food.id),
        },
      ]
    );
  };

  const handleRemoveAfterAnimation = (food: FoodCardData) => {
    setFoods((prev) => prev.filter((f) => f.id !== food.id));
    setDeletingId(null);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.list}>
        {foods.map((food) => (
          <SwipeableFoodCard
            key={food.id}
            food={food}
            onEdit={() => handleEdit(food)}
            onDelete={() => handleDeletePress(food)}
            onRemoveAfterAnimation={() => handleRemoveAfterAnimation(food)}
            isDeleting={deletingId === food.id}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenPaddingHorizontal,
    paddingTop: spacing.screenPaddingTop,
    paddingBottom: spacing.screenPaddingBottom,
  },
  list: {
    gap: spacing.buttonGap,
  },
});
