import { AuthProvider } from "@/contexts/AuthContext";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, useColorScheme, View } from "react-native";
import "react-native-reanimated";
import { Link, type Router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();


type Routes = {
  'level-modules/[level]': { level: string };
  'unit/[id]': { id: string };
};

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
        <Slot />
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
    flex: 1, // Añadido para mejor comportamiento en mobile
  },
  header: {
    backgroundColor: "#f5f5f5",
    elevation: 0, // Para Android
    shadowOpacity: 0, // Para iOS
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#333",
  },
});
