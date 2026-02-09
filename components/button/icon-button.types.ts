import { Feather } from "@expo/vector-icons";

export type IconButtonVariant = "primary" | "secondary" | "outline" | "danger";

export type IconButtonProps = {
  icon?: React.ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: number;
  disabled?: boolean;
};
