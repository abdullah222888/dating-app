import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "./src/constants";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expo JS Clean Architecture 🚀</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.primary,
    fontSize: 20,
  },
});
