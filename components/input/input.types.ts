export type InputProps = {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  leftIcon?: string;
  rightIcon?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  /** Nur Anzeige, keine Tastatur – z. B. für Date Picker (dann von außen mit Pressable umschließen) */
  editable?: boolean;
};
