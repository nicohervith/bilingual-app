import { auth, db } from "@/lib/firebaseConfig";
import { getProgress, initUserProgress } from "@/services/progressService";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import { useAuth } from "../contexts/AuthContext";

interface Level {
  id: string;
  name: string;
  missions: any[];
}

const availableLevels: Level[] = [
  {
    id: "A1",
    name: "Beginner",
    missions: [],
  },
  {
    id: "A2",
    name: "Elementary",
    missions: [],
  },
];

interface ProgressData {
  xp?: number;
  level?: string; // Añade esta línea
  unlockedLevels?: string[]; // Añade esta línea
  completedMissions?: Record<string, string[]>;
  levels?: Record<string, { completed: number; total: number }>;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressData>({
    xp: 0,
    level: "A1",
    unlockedLevels: ["A1"],
    completedMissions: {},
    levels: {
      A1: { completed: 0, total: 5 },
      A2: { completed: 0, total: 5 },
    },
  });

  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(["A1"]);

  const createNewUserProgress = async (userId: string) => {
    try {
      await setDoc(doc(db, "userProgress", userId), {
        xp: 0,
        level: "A1",
        unlockedLevels: ["A1"],
        completedMissions: {},
        levels: {
          A1: { completed: 0, total: 5 },
          A2: { completed: 0, total: 5 },
        },
      });
    } catch (error) {
      console.error("Error creating user progress:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const loadProgress = async () => {
        const userProgress = await getProgress(user.uid);

        if (!userProgress) {
          await initUserProgress(user.uid);
          setProgress({
            xp: 0,
            level: "A1",
            unlockedLevels: ["A1"],
            completedMissions: {},
          });
        } else {
          setProgress(userProgress);
        }

        setLoading(false);
      };

      loadProgress();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const checkUserProgress = async () => {
        const progressRef = doc(db, "userProgress", user.uid);
        const progressSnap = await getDoc(progressRef);

        if (!progressSnap.exists()) {
          await createNewUserProgress(user.uid);
        }

        // Cargar datos existentes
        const userProgress = progressSnap.exists() ? progressSnap.data() : null;
        setProgress(
          userProgress ?? {
            xp: 0,
            level: "A1",
            unlockedLevels: ["A1"],
            completedMissions: {},
            levels: {
              A1: { completed: 0, total: 5 },
              A2: { completed: 0, total: 5 },
            },
          }
        );
      };

      checkUserProgress();
    }
  }, [user]);

  const calculateLevelProgress = (levelId: string): number => {
    if (!progress || !progress.levels || !progress.levels[levelId]) return 0;
    const level = progress.levels[levelId];
    return Math.round((level.completed / level.total) * 100);
  };

  const getCurrentLevel = (): string => {
    if (!progress || !progress.xp) return "A1";
    if (progress.xp > 1000) return "B1";
    if (progress.xp > 500) return "A2";
    return "A1";
  };

  const navigateToLevel = (levelId: string) => {
    if (unlockedLevels.includes(levelId)) {
      router.push(`/level/${levelId}`);
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
        const isUnlocked = unlockedLevels.includes(level.id);
        const disabled = !isUnlocked;

        return (
          <View key={level.id} style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>Level {level.name}</Text>
              {disabled && <Text style={styles.locked}>🔒 Locked</Text>}
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${calculateLevelProgress(level.id)}%` },
                ]}
              />
            </View>

            <View style={styles.xpBar}>
              <Text style={styles.xpText}>{progress.xp || 0} XP</Text>
              <Progress.Bar
                progress={((progress.xp || 0) % 500) / 500}
                width={200}
                color="#4CAF50"
              />
              <Text style={styles.levelText}>Level {getCurrentLevel()}</Text>
            </View>

            <Text>
              {progress.levels?.[level.id]?.completed || 0}/
              {progress.levels?.[level.id]?.total || 0} lessons completed
            </Text>

            <TouchableOpacity
              disabled={disabled}
              onPress={() => navigateToLevel(level.id)}
              style={[styles.levelButton, disabled && styles.disabledButton]}
            >
              <Text style={styles.buttonText}>Access Level</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {user && <Button title="Logout" onPress={handleLogout} color="#FF5A5F" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
  },
  levelCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locked: {
    color: "#FF5A5F",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  xpBar: {
    marginBottom: 10,
  },
  xpText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  levelText: {
    marginTop: 5,
    color: "#666",
  },
  levelButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
