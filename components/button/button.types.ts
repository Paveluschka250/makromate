export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "chip";

export type ButtonProps = {
  label?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  /** Für Chip-Buttons (z.B. Geschlecht/Ziel) */
  active?: boolean;
};

