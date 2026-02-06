import Button from "@/components/button/button";
import IconButton from "@/components/button/icon-button";
import { View } from "react-native";
import { styles } from "../apphelpers/index/index.style";

export default function Index() {
  return (
    <View style={styles.container}>
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
