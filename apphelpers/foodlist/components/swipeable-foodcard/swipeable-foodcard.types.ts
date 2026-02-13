import type { FoodCardData } from "@/apphelpers/foodlist/foodlist.types";

export type SwipeableFoodCardProps = {
  food: FoodCardData;
  onEdit: () => void;
  /** Wird aufgerufen, wenn der User auf „Löschen“ tippt (z.B. Alert anzeigen). */
  onDelete: () => void;
  /** Wird nach der Exit-Animation aufgerufen, um das Item aus der Liste zu entfernen. */
  onRemoveAfterAnimation: () => void;
  /** Wenn true, läuft die Lösch-Animation; danach wird onRemoveAfterAnimation aufgerufen. */
  isDeleting?: boolean;
};
