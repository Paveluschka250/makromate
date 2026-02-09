import Button from "@/components/button/button";
import IconButton from "@/components/button/icon-button";
import Input from "@/components/input/input";
import { useState } from "react";
import { View } from "react-native";
import { styles } from "../apphelpers/index/index.style";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Input
        label="Name"
        placeholder="Dein Name"
        leftIcon="account"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="E-Mail"
        placeholder="name@mail.de"
        leftIcon="email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Passwort"
        placeholder="••••••••"
        leftIcon="lock"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        helperText="Mindestens 8 Zeichen"
      />
      <Button label="Speichern" variant="primary" />
      <Button label="Mehr" variant="secondary" />
      <Button label="Details" variant="outline" />
      <Button label="Logout" variant="danger" />
      <View style={styles.iconRow}>
        <IconButton icon="plus" variant="primary" />
        <IconButton icon="leaf" variant="secondary" />
        <IconButton icon="information" variant="outline" />
        <IconButton icon="logout" variant="danger" />
      </View>
    </View>
  );
}
