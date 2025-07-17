import { auth, db } from "@/lib/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
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
  level?: string;
  unlockedLevels?: string[];
  completedMissions?: Record<string, string[]>;
  completedLessons?: Record<string, boolean>;
  levels?: Record<string, { completed: number; total: number }>;
  earnedBadges?: Record<
    string,
    {
      unitId: string;
      unitTitle: string;
      insigniaUrl: string;
      earnedAt: Timestamp;
    }
  >;
  stats: {
    daysStreak: number;
    lastLogin: Timestamp | Date;
    longestStreak: number;
  };
}
type LevelRequirements = {
  A1: number;
  A2: number;
  B1: number;
};

const BASE_XP_PER_LESSON = 50;

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<string[]>(
    user ? ["A1"] : []
  );
const [dynamicRequirements, setDynamicRequirements] =
  useState<LevelRequirements>({
    A1: 0,
    A2: 1000,
    B1: 2000,
  });

  const [progress, setProgress] = useState<ProgressData>({
    xp: 0,
    level: "A1",
    unlockedLevels: user ? ["A1"] : [],
    completedLessons: {},
    levels: {
      A1: { completed: 0, total: 0 },
      A2: { completed: 0, total: 0 },
      B1: { completed: 0, total: 0 },
    },
    stats: {
      daysStreak: 1,
      lastLogin: new Date(),
      longestStreak: 1,
    },
  });

  const calculateTotalLevelXP = (units: any[]): number => {
    return units.reduce((total, unit) => {
      const lessonsXP = (unit.lessons?.length || 0) * BASE_XP_PER_LESSON;
      return total + lessonsXP + (unit.rewardXP || 0);
    }, 0);
  };

  const getDynamicLevelRequirements = (modules: any[]) => {
    const A1Units = modules.flatMap((m) =>
      Object.entries(m.units || {})
        .filter(([unitId]) => unitId.includes("A1_"))
        .map(([, unit]) => unit)
    );

    const A2Units = modules.flatMap((m) =>
      Object.entries(m.units || {})
        .filter(([unitId]) => unitId.includes("A2_"))
        .map(([, unit]) => unit)
    );

    return {
      A1: 0,
      A2: Math.round(calculateTotalLevelXP(A1Units) * 0.7),
      B1: Math.round(
        calculateTotalLevelXP(A1Units) + calculateTotalLevelXP(A2Units) * 0.7
      ),
    };
  };

 const updateStreak = async (userProgress: any) => {
   // Verificar primero si user existe
   if (!user) {
     console.error("No hay usuario autenticado");
     return {
       daysStreak: 1,
       lastLogin: new Date(),
       longestStreak: 1,
     };
   }

   const userProgressRef = doc(db, "userProgress", user.uid);
   const lastLogin = userProgress.stats?.lastLogin;

   const lastLoginDate = lastLogin?.toDate?.() || new Date();
   const todayDate = new Date();

   lastLoginDate.setHours(0, 0, 0, 0);
   todayDate.setHours(0, 0, 0, 0);

   const diffDays = Math.floor(
     (todayDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
   );

   let newStreak = userProgress.stats?.daysStreak || 1;

   if (diffDays === 1) {
     newStreak += 1;
   } else if (diffDays > 1) {
     newStreak = 1;
   }

   const longestStreak = Math.max(
     newStreak,
     userProgress.stats?.longestStreak || 1
   );

   try {
     await updateDoc(userProgressRef, {
       "stats.daysStreak": newStreak,
       "stats.lastLogin": new Date(),
       "stats.longestStreak": longestStreak,
     });
   } catch (error) {
     console.error("Error updating streak:", error);
   }

   return {
     daysStreak: newStreak,
     lastLogin: new Date(),
     longestStreak: longestStreak,
   };
 };

  const loadProgress = async () => {
    if (!user) {
      console.error("No hay usuario autenticado");
      return {
        daysStreak: 1,
        lastLogin: new Date(),
        longestStreak: 1,
      };
    }
    try {
      const progressRef = doc(db, "userProgress", user.uid);
      const progressSnap = await getDoc(progressRef);

      if (!progressSnap.exists()) {
        await createNewUserProgress(user.uid);
        return;
      }

      const userProgress = progressSnap.data();
      const updatedStats = await updateStreak(userProgress);

      // Obtener módulos y calcular requisitos dinámicos
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modulesData = modulesSnapshot.docs.map((doc) => doc.data());
      const newRequirements = getDynamicLevelRequirements(modulesData);
      setDynamicRequirements(newRequirements);

      // Calcular lecciones totales por nivel
      const levelTotals = { A1: 0, A2: 0, B1: 0 };
      modulesSnapshot.forEach((doc) => {
        Object.entries(doc.data().units || {}).forEach(
          ([unitId, unit]: [string, any]) => {
            if (unitId.includes("A1_"))
              levelTotals.A1 += unit.lessons?.length || 0;
            else if (unitId.includes("A2_"))
              levelTotals.A2 += unit.lessons?.length || 0;
            else if (unitId.includes("B1_"))
              levelTotals.B1 += unit.lessons?.length || 0;
          }
        );
      });

      setProgress({
        xp: userProgress.xp || 0,
        level: userProgress.level || "A1",
        unlockedLevels: userProgress.unlockedLevels || ["A1"],
        completedLessons: userProgress.completedLessons || {},
        earnedBadges: userProgress.earnedBadges || {},
        levels: {
          A1: {
            completed: userProgress.levels?.A1?.completed || 0,
            total: levelTotals.A1,
          },
          A2: {
            completed: userProgress.levels?.A2?.completed || 0,
            total: levelTotals.A2,
          },
          B1: {
            completed: userProgress.levels?.B1?.completed || 0,
            total: levelTotals.B1,
          },
        },
        stats: updatedStats,
      });
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadProgress();
  }, [user, refreshKey]);

  const createNewUserProgress = async (userId: string) => {
    try {
      const modulesSnapshot = await getDocs(collection(db, "modules"));
      const modulesData = modulesSnapshot.docs.map((doc) => doc.data());
      const newRequirements = getDynamicLevelRequirements(modulesData);
      setDynamicRequirements(newRequirements);

      let totalLessons = { A1: 0, A2: 0, B1: 0 };
      modulesSnapshot.forEach((doc) => {
        Object.entries(doc.data().units || {}).forEach(
          ([unitId, unit]: [string, any]) => {
            if (unitId.startsWith("unitA1_"))
              totalLessons.A1 += unit.lessons?.length || 0;
            else if (unitId.startsWith("unitA2_"))
              totalLessons.A2 += unit.lessons?.length || 0;
            else if (unitId.startsWith("unitB1_"))
              totalLessons.B1 += unit.lessons?.length || 0;
          }
        );
      });

      await setDoc(doc(db, "userProgress", userId), {
        xp: 0,
        level: "A1",
        unlockedLevels: ["A1"],
        completedLessons: {},
        levels: {
          A1: { completed: 0, total: totalLessons.A1 },
          A2: { completed: 0, total: totalLessons.A2 },
          B1: { completed: 0, total: totalLessons.B1 },
        },
        stats: {
          daysStreak: 1,
          lastLogin: new Date(),
          longestStreak: 1,
        },
      });
    } catch (error) {
      console.error("Error creating user progress:", error);
    }
  };

  const getCurrentLevel = (): string => {
    if (!progress || !progress.xp) return "A1";
    if (progress.xp >= dynamicRequirements.B1) return "B1";
    if (progress.xp >= dynamicRequirements.A2) return "A2";
    return "A1";
  };

const calculateXPProgress = (): { progress: number; nextLevel: string } => {
  const currentXP = progress.xp || 0;
  const currentLevel = getCurrentLevel();

  const nextLevel: "A2" | "B1" | null =
    currentLevel === "A1" ? "A2" : currentLevel === "A2" ? "B1" : null;

  if (!nextLevel) return { progress: 1, nextLevel: "Max" };

  const validCurrentLevel = currentLevel as keyof LevelRequirements;
  const currentReq = dynamicRequirements[validCurrentLevel];

  const nextReq = dynamicRequirements[nextLevel];

  const calculatedProgress = (currentXP - currentReq) / (nextReq - currentReq);

  return {
    progress: Math.min(1, Math.max(0, calculatedProgress)),
    nextLevel,
  };
};

  const xpProgress = calculateXPProgress();

  useEffect(() => {
    if (user && progress.xp !== undefined) {
      const newUnlockedLevels = ["A1"];
      if (progress.xp >= dynamicRequirements.A2) newUnlockedLevels.push("A2");
      if (progress.xp >= dynamicRequirements.B1) newUnlockedLevels.push("B1");

      setUnlockedLevels(newUnlockedLevels);

      if (
        JSON.stringify(newUnlockedLevels) !==
        JSON.stringify(progress.unlockedLevels)
      ) {
        updateDoc(doc(db, "userProgress", user.uid), {
          unlockedLevels: newUnlockedLevels,
        });
      }
    }
  }, [user, progress.xp, dynamicRequirements]);

  const xpNeededForLevel = (levelId: string): number => {
    const currentXP = progress.xp || 0;
    switch (levelId) {
      case "A1":
        return 0;
      case "A2":
        return Math.max(0, dynamicRequirements.A2 - currentXP);
      case "B1":
        return Math.max(0, dynamicRequirements.B1 - currentXP);
      default:
        return 0;
    }
  };

  const navigateToLevel = (levelId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (unlockedLevels.includes(levelId)) {
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

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userSection}>
        {user ? (
          <>
            <View style={styles.avatarContainer}>
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
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user.displayName || "Usuario"}
              </Text>
              <Text style={styles.userEmail}>{user.email}</Text>

              <View style={styles.streakContainer}>
                <Ionicons name="flame" size={20} color="#FF9500" />
                <Text style={styles.streakText}>
                  {progress.stats?.daysStreak ?? 1} días de racha
                </Text>
              </View>

              <Text style={styles.userLevel}>Nivel: {getCurrentLevel()}</Text>
              <Text style={styles.userXP}>{progress.xp || 0} XP</Text>
            </View>
          </>
        ) : (
          <View style={styles.guestInfo}>
            <Text style={styles.guestTitle}>Bienvenido invitado</Text>
            <Text style={styles.guestText}>
              Inicia sesión para acceder a todo el contenido
            </Text>
            <Button
              title="Iniciar sesión con Google"
              onPress={() => router.push("/login")}
            />
          </View>
        )}
      </View>

      {/* Sección de insignias */}
      {user &&
        progress.earnedBadges &&
        Object.keys(progress.earnedBadges).length > 0 && (
          <View style={styles.badgesSection}>
            <Text style={styles.sectionTitle}>Tus Insignias</Text>
            <View style={styles.badgesContainer}>
              {Object.entries(progress.earnedBadges).map(([unitId, badge]) => (
                <View key={unitId} style={styles.badgeCard}>
                  <Image
                    source={{ uri: badge.insigniaUrl }}
                    style={styles.badgeImage}
                  />
                  <Text style={styles.badgeTitle}>{badge.unitTitle}</Text>
                </View>
              ))}
            </View>
          </View>
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
        const levelData = progress.levels?.[level.id] || {
          completed: 0,
          total: 0,
        };
        const completedCount = Object.keys(
          progress.completedLessons || {}
        ).filter((id) => id.includes(level.id)).length;
        const isUnlocked = user && unlockedLevels.includes(level.id);
        const disabled = !isUnlocked;

        const progressPercentage =
          levelData.total > 0 ? (completedCount / levelData.total) * 100 : 0;

        console.log("Progress data:", {
          xp: progress.xp,
          levels: progress.levels,
          completedLessons: Object.keys(progress.completedLessons || {}).length,
        });

        return (
          <View key={level.id} style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>Level {level.name}</Text>
              {disabled && (
                <Text style={styles.locked}>
                  {user
                    ? `🔒 ${xpNeededForLevel(level.id)} XP needed`
                    : "🔒 Login required"}
                </Text>
              )}
            </View>

            <View style={styles.progressContainer}>
              <Text>
                Completed: {completedCount}/{levelData.total}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progressPercentage}%`,
                    },
                  ]}
                />
              </View>
              <Text>{Math.round(progressPercentage)}% complete</Text>
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
  guestInfo: {
    alignItems: "center",
  },
  guestTitle: {},
  guestText: {
    marginBottom: 10,
    color: "#FFFFFF",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userSection: {
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
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
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 5,
  },
  userLevel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 3,
  },
  userXP: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "bold",
  },
  /*  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EDE9FE",
  }, */

  /*  userInfo: {
    marginLeft: 15,
    flex: 1,
  }, */
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  streakText: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#E65100",
  },
  longestStreak: {
    marginLeft: 5,
    color: "#666",
    fontSize: 12,
  },
  badgesSection: {
    marginBottom: 25,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  badgeCard: {
    width: 100,
    alignItems: "center",
    margin: 8,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
  },
  badgeImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 5,
  },
  badgeTitle: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  /*  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
    marginTop: 10,
  }, */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D82989",
    marginTop: 30,
    marginBottom: 10,
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
