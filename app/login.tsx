import { styles } from "@/apphelpers/login/login.style";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text>login</Text>
    </SafeAreaView>
  );
};

export default Login;
