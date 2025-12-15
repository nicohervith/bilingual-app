import * as Google from "expo-auth-session/providers/google";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider, // Importar Facebook
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../lib/firebaseConfig";
/* import * as Facebook from "expo-auth-session/providers/facebook"; // Agregar Facebook */
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- CONFIGURACIÓN SOCIAL AUTH ---
  const [gRequest, gResponse, gPrompt] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  /*   const [fRequest, fResponse, fPrompt] = Facebook.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
  }); */

  /*   const handleAuthSuccess = async (userCredential: any) => {
    const userId = userCredential.user.uid;
    const additionalInfo = getAdditionalUserInfo(userCredential);

    if (additionalInfo?.isNewUser) {
      await createNewUserProgress(userId);
    } else {
      await updateStreak(userId);
    }
    router.replace("/");
  }; */
  const handleAuthSuccess = async (userCredential: any) => {
    const userId = userCredential.user.uid;
    const additionalInfo = getAdditionalUserInfo(userCredential);

    if (additionalInfo?.isNewUser) {
      // ESPERA a que se cree el documento antes de navegar
      await createNewUserProgress(userId);
    } else {
      await updateStreak(userId);
    }

    // Pequeño delay de cortesía para que Firebase sincronice el estado local
    setTimeout(() => {
      router.replace("/");
    }, 500);
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }

    setErrorMessage(null); // Limpiar errores previos
    setLoading(true);

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      await handleAuthSuccess(userCredential);
    } catch (error: any) {
      // Traducir errores comunes de Firebase
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("El formato del correo no es válido.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage("Este correo ya está registrado.");
          break;
        case "auth/weak-password":
          setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
      }
      console.error("Error auth:", error.code);
    } finally {
      setLoading(false);
    }
  };

  // --- EFECTOS PARA SOCIAL AUTH ---
  useEffect(() => {
    if (gResponse?.type === "success") {
      const { id_token } = gResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).then(handleAuthSuccess);
    }
  }, [gResponse]);

  /*   useEffect(() => {
    if (fResponse?.type === "success") {
      const { access_token } = fResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).then(handleAuthSuccess);
    }
  }, [fResponse]); */

  // --- FUNCIONES DE BASE DE DATOS (Mantenidas de tu código) ---
  const createNewUserProgress = async (userId: string) => {
    const userRef = doc(db, "userProgress", userId);
    await setDoc(userRef, {
      xp: 0,
      currentLevel: "A1",
      stats: { daysStreak: 1, lastLogin: new Date(), longestStreak: 1 },
      rewards: {
        gems: 10,
        badges: ["welcome_badge"],
        stickers: ["bily_hello"],
      },
    });
  };

  const updateStreak = async (userId: string) => {
    const userProgressRef = doc(db, "userProgress", userId);
    const userProgressSnap = await getDoc(userProgressRef);

    if (userProgressSnap.exists()) {
      const userData = userProgressSnap.data();
      const lastLogin = userData.stats?.lastLogin?.toDate() || new Date();
      const today = new Date();

      lastLogin.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
      );
      let newStreak = userData.stats.daysStreak || 1;

      if (diffDays === 1) newStreak += 1;
      else if (diffDays > 1) newStreak = 1;

      await updateDoc(userProgressRef, {
        "stats.daysStreak": newStreak,
        "stats.lastLogin": new Date(),
        "stats.longestStreak": Math.max(
          newStreak,
          userData.stats.longestStreak || 1
        ),
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        /> */}

        <Text style={styles.title}>
          {isRegistering ? "Crear Cuenta" : "Bienvenido"}
        </Text>

        {errorMessage && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <TextInput
          placeholder="Email"
          style={[styles.input, errorMessage && styles.inputError]} // Opcional: borde rojo
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errorMessage) setErrorMessage(null); // Limpiar error al escribir
          }}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.mainButton}
          onPress={handleEmailAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? "Registrarse" : "Entrar"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.switchText}>
            {isRegistering
              ? "¿Ya tienes cuenta? Loguéate"
              : "¿No tienes cuenta? Regístrate"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>O continuar con</Text>
          <View style={styles.line} />
        </View>

        {/* BOTONES SOCIALES */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => gPrompt()}
            disabled={!gRequest}
          >
            {/* <Image
              source={require("../assets/images/google-icon.png")}
              style={styles.socialIcon}
            /> */}
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: "#FFF" },
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  mainButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  switchText: { marginTop: 20, color: "#666" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: "#DDD" },
  dividerText: { marginHorizontal: 10, color: "#999" },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginTop: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row", // Alinea icono y texto en fila
    height: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    alignItems: "center", // Centra verticalmente
    justifyContent: "center", // Centra horizontalmente
    backgroundColor: "#FFF",
    // Sombra suave para que parezca un botón real
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    borderColor: "#1877F2",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // Espacio entre el logo y el texto
    resizeMode: "contain",
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },
  errorBanner: {
    backgroundColor: "#FFEBEE", // Rojo muy claro
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#EF5350", // Rojo vibrante
  },
  errorText: {
    color: "#C62828",
    fontSize: 14,
    fontWeight: "500",
  },
  inputError: {
    borderColor: "#EF5350",
  },
});
