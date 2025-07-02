import { auth } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { Redirect, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { user, loading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "984553559330-ltb8morobffr7o0utemf4kpbss1nhatp.apps.googleusercontent.com",
    androidClientId:
      "984553559330-ltb8morobffr7o0utemf4kpbss1nhatp.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      /* setAuthLoading(true); */

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log("User signed in successfully");
          router.replace("/");
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        })
     /*    .finally(() => setAuthLoading(false)); */
    }
  }, [response]);

 /*  if (loading || authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
 */
  if (user) {
    return <Redirect href="/" />;
  }

  return (
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
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
