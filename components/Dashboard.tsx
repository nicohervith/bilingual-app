import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../lib/firebaseConfig";
/* import ProtectedRoute from "./ProtectedRoute"; */
/* import { getUserProgress } from "../lib/progress"; */

const availableLevels = ["A1", "A2", "B1"];

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth(); // Usa el hook correcto
  const [progress, setProgress] = useState<any>({});
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(["A1"]);

  useEffect(() => {
    if (user) {
      console.log("user", user);
    }
  }, [user]);

  const checkUnlockedLevels = (progress: any) => {
    const unlocked = ["A1"];
    if (getProgressPercentage("A1", progress) >= 80) unlocked.push("A2");
    if (getProgressPercentage("A2", progress) >= 80) unlocked.push("B1");
    setUnlockedLevels(unlocked);
  };

  const getProgressPercentage = (level: string, progressObj: any): number => {
    const data = progressObj[level];
    if (!data || data.total === 0) return 0;
    return Math.round((data.completed / data.total) * 100);
  };

  const navigateToLevel = (level: string) => {
    if (unlockedLevels.includes(level)) {
      router.push(`/level/${level}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Welcome, {user ? user.displayName : "guest"}!
        </Text>
        <Text style={styles.email}>{user?.email ?? "Please log in"}</Text>

        {!user && (
          <Button
            title="Login with Google"
            onPress={() => router.push("/login")}
          />
        )}

        <Text style={styles.sectionTitle}>Your Progress</Text>

        {availableLevels.map((level) => {
          const isUnlocked =
            level === "A1" || (user && unlockedLevels.includes(level));
          const disabled = !isUnlocked;

          return (
            <View key={level} style={styles.levelCard}>
              <View style={styles.levelHeader}>
                <Text style={styles.levelTitle}>Level {level}</Text>
                {disabled && <Text style={styles.locked}>🔒 Locked</Text>}
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${getProgressPercentage(level, progress)}%` },
                  ]}
                />
              </View>

              <Text>
                {progress[level]?.completed || 0}/{progress[level]?.total || 0}{" "}
                lessons completed
              </Text>

              <TouchableOpacity
                disabled={disabled}
                onPress={() => navigateToLevel(level)}
                style={[styles.levelButton, disabled && styles.disabledButton]}
              >
                <Text style={styles.buttonText}>Access Level</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {user && (
          <Button title="Logout" onPress={handleLogout} color="#FF5A5F" />
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", width: "100%" },
  userPhoto: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold" },
  email: { marginBottom: 10, color: "#555" },
  sectionTitle: { fontSize: 18, marginTop: 20, fontWeight: "600" },
  levelCard: {
    width: "100%",
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  levelHeader: { flexDirection: "row", justifyContent: "space-between" },
  levelTitle: { fontSize: 16, fontWeight: "600" },
  locked: { color: "#888" },
  progressBar: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  progressFill: { height: 10, backgroundColor: "#4caf50", borderRadius: 5 },
  levelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4caf50",
    borderRadius: 5,
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", textAlign: "center" },
});
