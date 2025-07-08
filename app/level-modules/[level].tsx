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
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { calculateUnitProgress } from "@/services/courseService";


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

  useEffect(() => {
    const loadModules = async () => {
      try {
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
            };
          })
          .filter((module) => Object.keys(module.units).length > 0);

        console.log("Filtered modules:", filteredModules); 
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

          {Object.values(module.units).map((unit) => (
            <TouchableOpacity
              key={unit.id}
              onPress={() => router.push(`/unit/${unit.id}`)}
              style={styles.unitCard}
            >
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
  unitHeader:{},
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
