import { StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./dashboard";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { user } = useAuth();

  // No necesitas lógica aquí, el AuthProvider maneja la redirección
  return <Dashboard />;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
