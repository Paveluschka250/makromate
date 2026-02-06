import React from "react";
import { Button as PaperButton } from "react-native-paper";
import styles, { buttonColors } from "./button.style";
import { ButtonProps } from "./button.types";

const Button = ({
  label = "Button",
  onPress,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  const mode = variant === "outline" ? "outlined" : "contained";

  const variantButtonStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    outline: styles.outlineButton,
    danger: styles.dangerButton,
  }[variant];

  const variantLabelStyle = {
    primary: styles.primaryLabel,
    secondary: styles.secondaryLabel,
    outline: styles.outlineLabel,
    danger: styles.dangerLabel,
  }[variant];

  const buttonColor =
    variant === "primary"
      ? buttonColors.primaryBg
      : variant === "secondary"
        ? buttonColors.secondaryBg
        : variant === "danger"
          ? buttonColors.dangerBg
          : undefined;

  return (
    <PaperButton
      mode={mode}
      buttonColor={buttonColor}
      style={[styles.button, styles.shadow, variantButtonStyle]}
      contentStyle={styles.content}
      labelStyle={[styles.label, variantLabelStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      {label}
    </PaperButton>
  );
};

export default Button;
