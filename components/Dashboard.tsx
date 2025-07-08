import { auth, db } from "@/lib/firebaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
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
  {
    id: "B1",
    name: "Intermediate",
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
    unlockedLevels: user ? ["A1"] : [],
    completedMissions: {},
    levels: {
      A1: { completed: 0, total: 5 },
      A2: { completed: 0, total: 5 },
      B1: { completed: 0, total: 5 },
    },
  });

  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(
    user ? ["A1"] : []
  );

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
          B1: { completed: 0, total: 5 },
        },
      });
    } catch (error) {
      console.error("Error creating user progress:", error);
    }
  };

  const LEVEL_REQUIREMENTS = {
    A1: 0,
    A2: 1000,
    B1: 2000,
  };

  const getCurrentLevel = (): string => {
    if (!progress || !progress.xp) return "A1";
    if (progress.xp >= LEVEL_REQUIREMENTS.B1) return "B1";
    if (progress.xp >= LEVEL_REQUIREMENTS.A2) return "A2";
    return "A1";
  };

  // Calcula el progreso hacia el siguiente nivel
  const calculateXPProgress = (): { progress: number; nextLevel: string } => {
    const currentXP = progress.xp || 0;
    const currentLevel = getCurrentLevel();

    if (currentLevel === "A1") {
      return {
        progress: currentXP / LEVEL_REQUIREMENTS.A2,
        nextLevel: "A2",
      };
    } else if (currentLevel === "A2") {
      return {
        progress:
          (currentXP - LEVEL_REQUIREMENTS.A2) /
          (LEVEL_REQUIREMENTS.B1 - LEVEL_REQUIREMENTS.A2),
        nextLevel: "B1",
      };
    } else {
      // Para B1 no hay siguiente nivel, mostramos progreso completo
      return {
        progress: 1,
        nextLevel: "B1 (Max)",
      };
    }
  };

  const xpProgress = calculateXPProgress();

  // Actualizamos el efecto para desbloquear niveles según XP
  useEffect(() => {
    if (user && progress.xp !== undefined) {
      const newUnlockedLevels = ["A1"]; // Siempre desbloqueado

      if (progress.xp >= LEVEL_REQUIREMENTS.A2) {
        newUnlockedLevels.push("A2");
      }
      if (progress.xp >= LEVEL_REQUIREMENTS.B1) {
        newUnlockedLevels.push("B1");
      }

      setUnlockedLevels(newUnlockedLevels);

      // Actualizar en Firestore si cambió
      if (
        JSON.stringify(newUnlockedLevels) !==
        JSON.stringify(progress.unlockedLevels)
      ) {
        updateDoc(doc(db, "userProgress", user.uid), {
          unlockedLevels: newUnlockedLevels,
        });
      }
    }
  }, [user, progress.xp]);

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
              A3: { completed: 0, total: 5 },
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

  const navigateToLevel = (levelId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (unlockedLevels.includes(levelId)) {
      /*    router.push(`/level/${levelId}`); */
      router.push({
        pathname: "/level-modules/[level]",
        params: { level: levelId },
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userHeader}>
        {user ? (
          <>
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.userAvatar}
              />
            ) : (
              <View style={[styles.userAvatar, styles.placeholderAvatar]}>
                <Text style={styles.avatarText}>
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={styles.title}>Welcome, {user.displayName}!</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </>
        ) : (
          <View style={styles.userInfo}>
            <Text style={styles.title}>Welcome, guest!</Text>
            <Text style={styles.email}>Please log in to access all levels</Text>
          </View>
        )}
      </View>

      {!user && (
        <Button
          title="Login with Google"
          onPress={() => router.push("/login")}
        />
      )}

      <Text style={styles.sectionTitle}>Your Progress</Text>

      {/* Barra de progreso global (XP total) */}
      <View style={styles.globalXpBar}>
        <Text style={styles.xpText}>{progress.xp || 0} XP</Text>
        <Progress.Bar
          progress={xpProgress.progress}
          width={200}
          color="#4CAF50"
        />
        <Text style={styles.levelText}>
          Current: {getCurrentLevel()} → Next: {xpProgress.nextLevel}
        </Text>
      </View>

      {/* Tarjetas de niveles */}
      {availableLevels.map((level) => {
        const isUnlocked = user && unlockedLevels.includes(level.id);
        const disabled = !isUnlocked;
        const levelProgress = calculateLevelProgress(level.id);

        return (
          <View key={level.id} style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>Level {level.name}</Text>
              {disabled && (
                <Text style={styles.locked}>
                  {user ? "🔒 Locked" : "🔒 Login required"}
                </Text>
              )}
            </View>

            {/* Progreso específico del nivel */}
            <View style={styles.progressContainer}>
              <Text>Level Progress:</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${levelProgress}%` }]}
                />
              </View>
              <Text>
                {progress.levels?.[level.id]?.completed || 0}/
                {progress.levels?.[level.id]?.total || 0} lessons
              </Text>
            </View>

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
    backgroundColor: "#9365FF",
    padding: 20,
    paddingBottom: 60,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EDE9FE",
  },
  placeholderAvatar: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D82989",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4C1D95",
  },
  email: {
    fontSize: 14,
    color: "#ffffff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D82989",
    marginTop: 30,
    marginBottom: 10,
  },
  globalXpBar: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1E1B4B",
  },
  levelText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
  levelCard: {
    backgroundColor: "#EDE9FE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4C1D95",
  },
  locked: {
    color: "#D97706",
    fontSize: 13,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    backgroundColor: "#DDD6FE",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 6,
  },
  progressFill: {
    height: 10,
    backgroundColor: "#4C1D95",
  },
  levelButton: {
    backgroundColor: "#D82989",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
