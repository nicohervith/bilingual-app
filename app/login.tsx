import { auth } from "@/lib/firebaseConfig";
import { checkUserProgress } from "@/services/userProgress";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Redirect, router } from "expo-router";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
import { db } from "../lib/firebaseConfig";
import { ArrowBackIcon } from "@/components/SvgIcons";

export default function Login() {
  const { user, loading: authLoading } = useAuth();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "bilingualapp",
    path: "auth/google",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "871050529166-eed5potpoiq1rubl6b2rp2af83hb8qeo.apps.googleusercontent.com",
    androidClientId:
      "984553559330-ltb8morobffr7o0utemf4kpbss1nhatp.apps.googleusercontent.com",
    redirectUri: redirectUri,
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",
  });

  const handleAuth = async () => {
    try {
      if (response?.type !== "success" || !response.params) {
        throw new Error("Respuesta de autenticación inválida");
      }
      /*  if (response?.type !== "success" || !response.params) {
        throw new Error("Invalid authentication response");
      } */

      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);

      await userCredential.user.getIdToken(true);

      const userProgressRef = doc(db, "userProgress", userCredential.user.uid);
      const userProgressSnap = await getDoc(userProgressRef);

      if (userProgressSnap.exists()) {
        const userData = userProgressSnap.data();
        const lastLogin = userData.stats?.lastLogin?.toDate();
        const today = new Date();

        lastLogin.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - lastLogin.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let newStreak = userData.stats.daysStreak || 1;

        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }

        await updateDoc(userProgressRef, {
          "stats.daysStreak": newStreak,
          "stats.lastLogin": new Date(),
          "stats.longestStreak": Math.max(
            newStreak,
            userData.stats.longestStreak || 1
          ),
        });
      }
      const additionalInfo = getAdditionalUserInfo(userCredential);

      if (additionalInfo?.isNewUser) {
        await createNewUserProgress(userCredential.user.uid);
      } else {
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

  const createNewUserProgress = async (userId: string) => {
    try {
      const userRef = doc(db, "userProgress", userId);

      await setDoc(userRef, {
        xp: 0,
        currentLevel: "A1",
        unlockedLevels: ["A1"],
        completedMissions: {},
        rewards: {
          gems: 10,
          badges: ["welcome_badge"],
          stickers: ["bily_hello"],
        },
        stats: {
          daysStreak: 1,
          lastLogin: new Date(),
          longestStreak: 1,
        },
      });
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
        {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
        <ArrowBackIcon size={24} color="black" />
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
