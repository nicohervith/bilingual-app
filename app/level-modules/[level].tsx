// app/level-modules/[level].tsx
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, query, where, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";


// Define tipos para tus datos
type Unit = {
  id: string;
  title: string;
  level: string;
  lessons: string[];
  requiredXP: number;
  rewardXP: number;
};

type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: Record<string, Unit>;
};

export default function LevelModulesScreen() {
  const { level } = useLocalSearchParams();
  const { user } = useAuth();
  /* const router = useRouter(); */
  const router = useRouter() as {
    push: (path: `/unit/${string}`) => void;
  };

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModules = async () => {
      try {
        // Consulta todos los módulos que tienen unidades de este nivel
        const modulesSnapshot = await getDocs(collection(db, "modules"));

        const filteredModules = modulesSnapshot.docs
          .map((doc) => doc.data() as Module)
          .filter((module) =>
            Object.values(module.units).some((unit) => unit.level === level)
          );

        setModules(filteredModules);
      } catch (error) {
        console.error("Error loading modules:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [level]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Level {level} Modules</Text>

      {modules.map((module) => (
        <View key={module.id} style={styles.moduleCard}>
          <Text style={styles.moduleTitle}>
            {module.icon} {module.title}
          </Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>

          {Object.values(module.units)
            .filter((unit) => unit.level === level)
            .map((unit) => (
              <TouchableOpacity
                key={unit.id}
                /* onPress={() =>
                  router.push(`/unit/${unit.id}`)
                } */
                style={styles.unitCard}
              >
                <Text style={styles.unitTitle}>{unit.title}</Text>
                <Text style={styles.lessonCount}>
                  {unit.lessons.length}{" "}
                  {unit.lessons.length === 1 ? "lesson" : "lessons"}
                </Text>
                <Text style={styles.xpReward}>Reward: {unit.rewardXP} XP</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
    backgroundColor: "#fff",
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
  unitCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
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
});
