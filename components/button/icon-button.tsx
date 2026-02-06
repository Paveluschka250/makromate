import React from "react";
import { IconButton as PaperIconButton } from "react-native-paper";
import styles, { iconButtonColors } from "./icon-button.style";
import { IconButtonProps } from "./icon-button.types";

const IconButton = ({
  icon,
  onPress,
  variant = "primary",
  size = 22,
  disabled = false,
}: IconButtonProps) => {
  const mode = variant === "outline" ? "outlined" : "contained";

  const containerColor =
    variant === "primary"
      ? iconButtonColors.primaryBg
      : variant === "secondary"
        ? iconButtonColors.secondaryBg
        : variant === "danger"
          ? iconButtonColors.dangerBg
          : "transparent";

  const iconColor =
    variant === "primary"
      ? iconButtonColors.primaryIcon
      : variant === "secondary"
        ? iconButtonColors.secondaryIcon
        : variant === "danger"
          ? iconButtonColors.dangerIcon
          : iconButtonColors.outlineIcon;

  const outlineClass = variant === "outline" ? styles.outlined : undefined;

  return (
    <PaperIconButton
      icon={icon}
      size={size}
      mode={mode}
      containerColor={containerColor}
      iconColor={iconColor}
      style={[styles.button, styles.glow, outlineClass]}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

export default IconButton;
