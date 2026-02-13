/**
 * Icon-Set, das vom Backend kommt (z.B. in Kategorie-Tabelle).
 * Bestimmt, welche Icon-Bibliothek genutzt wird.
 */
export type IconSet = "feather" | "material" | "ionicons";

/** Icon-Name innerhalb des gewählten Sets (vom Backend). */
export type CategoryIconName = string;

export type FoodCardData = {
  id: string;
  name: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  /** Anzeigename der Kategorie, z.B. "Obst" */
  categoryName?: string;
  /** Welches Icon-Set genutzt wird (vom Backend, Standard: "feather") */
  categoryIconSet?: IconSet;
  /** Icon-Name im gewählten Set, z.B. "apple" bei Feather (vom Backend) */
  categoryIconName: CategoryIconName;
};

export type FoodCardProps = {
  food: FoodCardData;
  onPress?: () => void;
  /** Optional: z.B. { flex: 1 } wenn die Card die volle Höhe des Containers einnehmen soll. */
  containerStyle?: import("react-native").ViewStyle;
};
