import React from "react";
import { StyleSheet, Text, View } from "react-native";

const calendar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kalender Content WIP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#102116",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default calendar;
