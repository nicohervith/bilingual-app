import { useFonts } from "expo-font";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

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
    <View style={styles.globalContainer}>
      <Slot />
    </View>
  );

  /* 
Anterior layout
return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  ); */
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
