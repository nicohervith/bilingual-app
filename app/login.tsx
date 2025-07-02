import { auth } from "@/lib/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Redirect, router } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { user, loading: authLoading } = useAuth();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "bilingualapp", // Debe coincidir con "scheme" en app.json
    path: "auth/google",
  });

  console.log("Redirect URI:", redirectUri); // Verifica que sea correcta

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "984553559330-fghgjn0fq3n494gihhgo171if3cdem91.apps.googleusercontent.com",
    androidClientId:
      "984553559330-ltb8morobffr7o0utemf4kpbss1nhatp.apps.googleusercontent.com",
    redirectUri: redirectUri,
    scopes: ["openid", "profile", "email"], 
    responseType: "id_token",
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params; // ← Usa id_token en lugar de access_token

      if (id_token) {
        const credential = GoogleAuthProvider.credential(id_token); // Sin null
        signInWithCredential(auth, credential)
          .then(() => {
            console.log("Firebase auth successful!");
            router.replace("/");
          })
          .catch((error) => {
            console.error("Firebase auth error:", error);
          });
      } else {
        console.error("No id_token received in response:", response);
      }
    }
  }, [response]);

  useEffect(() => {
    if (user && !authLoading) {
      router.replace("/");
    }
  }, [user, authLoading]);

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login with Google</Text>
        <Button
          title="Continue with Google"
          onPress={() => promptAsync()}
          disabled={!request}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
