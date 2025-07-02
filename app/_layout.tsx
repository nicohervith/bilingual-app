import { useFonts } from "expo-font";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthProvider } from "@/contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <View style={styles.globalContainer}>
        <Slot />
      </View>
    </AuthProvider>
  );

}

const styles = StyleSheet.create({
  globalContainer: {
    width: 800,
    marginHorizontal: "auto", // esto funciona en web
    marginTop: 32,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // esto solo para web
    alignSelf: "center", // centra también en mobile
  },
});
