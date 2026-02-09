import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import styles, { inputColors } from "./input.style";
import { InputProps } from "./input.types";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

const ICON_SIZE = 22;

const renderFeather = (name: FeatherIconName) => ({ color, size }: { color: string; size: number }) =>
  <Feather name={name} size={size ?? ICON_SIZE} color={color} />;

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  helperText,
  error = false,
  disabled = false,
  secureTextEntry = false,
}: InputProps) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const rightElement = secureTextEntry ? (
    <TextInput.Icon
      icon={renderFeather(isSecure ? "eye-off" : "eye")}
      onPress={() => setIsSecure((prev) => !prev)}
    />
  ) : rightIcon ? (
    <TextInput.Icon icon={renderFeather(rightIcon as FeatherIconName)} />
  ) : undefined;

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        outlineColor={inputColors.outline}
        activeOutlineColor={inputColors.outlineActive}
        textColor={inputColors.text}
        placeholderTextColor={inputColors.placeholder}
        style={styles.input}
        outlineStyle={styles.outline}
        contentStyle={styles.content}
        disabled={disabled}
        secureTextEntry={isSecure}
        error={error}
        left={leftIcon ? <TextInput.Icon icon={renderFeather(leftIcon as FeatherIconName)} /> : undefined}
        right={rightElement}
      />
      {helperText ? (
        <HelperText type={error ? "error" : "info"} style={styles.helper}>
          {helperText}
        </HelperText>
      ) : null}
    </>
  );
};

export default Input;
