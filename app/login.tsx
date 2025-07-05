import { auth } from "@/lib/firebaseConfig";
import { checkUserProgress } from "@/services/userProgress";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Redirect, router } from "expo-router";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { db } from "../lib/firebaseConfig"; // Asegúrate de tener tu configuración de Firebase

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

  /*   useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          router.replace("/");
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    }
  }, [response]);
 */
/*     const handleAuthSuccess = async (id_token: string) => {
    try {
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);

      // Verificar y crear progreso si es nuevo usuario
      if (userCredential.additionalUserInfo?.isNewUser) {
        await createNewUserProgress(userCredential.user.uid);
      } else {
        // Verificar si existe el progreso (para usuarios antiguos)
        await checkUserProgress(userCredential.user.uid);
      }

      router.replace("/");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      handleAuthSuccess(response.params.id_token);
    }
  }, [response]);
 */
  const handleAuth = async () => {
    try {
      // Verificación segura del tipo de respuesta
      if (response?.type !== "success" || !response.params) {
        throw new Error("Respuesta de autenticación inválida");
      }

      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);

      const additionalInfo = getAdditionalUserInfo(userCredential);

      if (additionalInfo?.isNewUser) {
        console.log("Nuevo usuario detectado, creando progreso...");
        await createNewUserProgress(userCredential.user.uid);
      } else {
        console.log("Usuario existente, verificando progreso...");
        await checkUserProgress(userCredential.user.uid);
      }

      router.replace("/");
    } catch (error) {
      console.error("Error en autenticación:", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      handleAuth();
    }
  }, [response]);

  // Función para crear progreso inicial
  const createNewUserProgress = async (userId: string) => {
    try {
      const userRef = doc(db, "userProgress", userId);

      await setDoc(userRef, {
        xp: 0,
        currentLevel: "A1",
        unlockedLevels: ["A1"],
        completedMissions: {},
        rewards: {
          gems: 10, // Gemas de bienvenida
          badges: ["welcome_badge"],
          stickers: ["bily_hello"],
        },
        stats: {
          daysStreak: 0,
          lastLogin: new Date(),
        },
      });

      console.log("Progreso creado para nuevo usuario");
    } catch (error) {
      console.error("Error creando progreso:", error);
    }
  };

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
