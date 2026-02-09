import React, { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import styles, { inputColors } from "./input.style";
import { InputProps } from "./input.types";

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
      icon={isSecure ? "eye-off" : "eye"}
      onPress={() => setIsSecure((prev) => !prev)}
    />
  ) : rightIcon ? (
    <TextInput.Icon icon={rightIcon} />
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
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
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
