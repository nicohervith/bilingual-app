// app/level-modules/[level].tsx
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

// Define tipos para tus datos
type Unit = {
  id: string;
  title?: string;
  insignia?: string;
  level: string;
  lessons: string[];
  requiredXP: number;
  rewardXP: number;
};

type Module = {
  id: string;
  title?: string; // Hacer opcional si puede faltar
  description?: string; // Hacer opcional
  icon?: string; // Hacer opcional
  units: Record<string, Unit>;
};

export default function LevelModulesScreen() {
  const { level } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter() as {
    push: (path: `/unit/${string}`) => void;
  };
  const [unitProgress, setUnitProgress] = useState<Record<string, number>>({});
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  const isModuleComplete = (
    module: Module,
    completedLessons: Record<string, boolean>
  ): boolean => {
    return Object.values(module.units).every((unit: Unit) => {
      return unit.lessons.every((lessonId) => completedLessons[lessonId]);
    });
  };

  const [moduleCompletion, setModuleCompletion] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const loadModulesAndProgress = async () => {
      if (!user) return;

      try {
        // 1. Cargar módulos
        const modulesSnapshot = await getDocs(collection(db, "modules"));
        const filteredModules = modulesSnapshot.docs
          .map((doc) => {
            const data = doc.data();
            const filteredUnits = Object.entries(data.units || {})
              .filter(([unitId]) => unitId.startsWith(`unit${level}_`))
              .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

            return {
              ...data,
              id: doc.id,
              units: filteredUnits,
              title: data.title ?? "",
            };
          })
          .filter((module) => Object.keys(module.units).length > 0)
          .sort((a, b) => (a.title || "").localeCompare(b.title || ""));

        setModules(filteredModules);

        // 2. Cargar progreso del usuario
        const progressDoc = await getDoc(doc(db, "userProgress", user.uid));
        if (progressDoc.exists()) {
          const progressData = progressDoc.data();
          console.log("User progress data:", progressData);
          const completedLessons = progressData.completedLessons || {};

          const newModuleCompletion: Record<string, boolean> = {};
          filteredModules.forEach((module) => {
            newModuleCompletion[module.id] = isModuleComplete(
              module,
              completedLessons
            );
          });
          setModuleCompletion(newModuleCompletion);

          console.log("User progress:", completedLessons);
          // Calcular progreso por unidad
          const newUnitProgress: Record<string, number> = {};

          filteredModules.forEach((module) => {
            Object.values(module.units).forEach((unit: any) => {
              const totalLessons = unit.lessons.length;
              const completedCount = unit.lessons.filter(
                (id: string) => completedLessons[id]
              ).length;
              newUnitProgress[unit.id] = completedCount / totalLessons;
            });
          });

          setUnitProgress(newUnitProgress);
        }
      } catch (error) {
        console.error("Error loading modules:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModulesAndProgress();
  }, [level, user]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (modules.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No modules found for level {level}</Text>
      </View>
    );
  }
  console.log("Modules loaded:", modules);
  return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Level {level} Modules</Text>
    {modules.map((module) => (
      <View key={module.id} style={styles.moduleCard}>
        <View style={styles.moduleHeader}>
          <View style={styles.moduleTitleContainer}>
            <Text style={styles.moduleIcon}>{module.icon}</Text>
            <Text style={styles.moduleTitle}>{module.title}</Text>
          </View>
        </View>
        
        {Object.values(module.units).map((unit: any) => {
          const isUnitComplete = unitProgress[unit.id] === 1;
          
          return (
            <TouchableOpacity
              key={unit.id}
              onPress={() => router.push(`/unit/${unit.id}`)}
              style={styles.unitCard}
            >
              {/* Insignia de la unidad */}
              {unit.insignia && (
                <Image
                  source={{ uri: unit.insignia }}
                  style={[
                    styles.unitInsignia,
                    { opacity: isUnitComplete ? 1 : 0.3 }
                  ]}
                />
              )}
              
              <View style={styles.unitHeader}>
                <Text style={styles.unitTitle}>{unit.title}</Text>
                <Text style={styles.xpReward}>{unit.rewardXP} XP</Text>
              </View>
              
              <Text style={styles.lessonCount}>
                {unit.lessons.length} lecciones
              </Text>
              
              <Progress.Bar
                progress={unitProgress[unit.id] || 0}
                width={200}
                color="#4CAF50"
              />
              
              <Text style={styles.progressText}>
                {Math.round((unitProgress[unit.id] || 0) * 100)}% completado
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ))}
  </ScrollView>
); 
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  moduleTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  moduleIcon: {
    marginRight: 8,
    fontSize: 20,
  },
  insignia: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  unitHeader: {},
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  moduleCard: {
    backgroundColor: "#9365ff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  moduleDescription: {
    color: "#666",
    marginBottom: 12,
  },
  /* unitCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  }, */
  /*  unitCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  }, */
  unitCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    position: "relative",
  },
  unitInsignia: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  lessonCount: {
    color: "#6c757d",
    fontSize: 14,
  },
  xpReward: {
    color: "#28a745",
    fontSize: 14,
    marginTop: 4,
  },
  progressText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
});
