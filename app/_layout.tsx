import { AuthProvider } from "@/contexts/AuthContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, useColorScheme, View } from "react-native";
import "react-native-reanimated";

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={styles.globalContainer}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="unit/[id]" options={{ title: "Unidad" }} />
          <Stack.Screen name="lesson/[id]" options={{ title: "Lección" }} />
        </Stack>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    width: 800,
    marginHorizontal: "auto",
    marginTop: 32,
    padding: 16,
    backgroundColor: "#9365FF",
    borderRadius: 16,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    alignSelf: "center",
    flex: 1, 
  },
  header: {
    backgroundColor: "#f5f5f5",
    elevation: 0, 
    shadowOpacity: 0, 
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#333",
  },
});
