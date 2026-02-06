export type IconButtonVariant = "primary" | "secondary" | "outline" | "danger";

export type IconButtonProps = {
  icon: string;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: number;
  disabled?: boolean;
};
