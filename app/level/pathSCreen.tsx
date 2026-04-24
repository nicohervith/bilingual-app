import { useAuth } from "@/contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { getModules, getUserProgress } from "@/services/courseService"; // Importar las funciones del servicio


type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  units: Unit[];
};

type Unit = {
  id: string;
  title: string;
  lessons: string[];
  requiredXP: number;
  rewardXP: number;
  completed?: boolean;
  locked?: boolean;
};

export default function PathScreen() {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userXP, setUserXP] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Verificar que user no sea null

      try {
        // 1. Obtener módulos y unidades desde Firestore
        const modulesData = await getModules();

        // 2. Obtener progreso del usuario
        const userProgress = await getUserProgress(user.uid);
        setUserXP(userProgress?.totalXP || 0);

        // 3. Marcar unidades completadas/bloqueadas
        const enrichedModules = modulesData.map((module) => ({
          ...module,
          units: module.units.map((unit) => ({
            ...unit,
            completed: userProgress?.completedUnits?.includes(unit.id) || false,
            locked: (userProgress?.totalXP || 0) < unit.requiredXP,
          })),
        }));

        setModules(enrichedModules);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]); // Añadir user como dependencia

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tu camino de aprendizaje</Text>
      <Text style={styles.xpText}>XP Total: {userXP}</Text>

      {modules.map((module) => (
        <View key={module.id} style={styles.moduleContainer}>
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleIcon}>{module.icon}</Text>
            <Text style={styles.moduleTitle}>{module.title}</Text>
          </View>
          <Text style={styles.moduleDescription}>{module.description}</Text>

          <View style={styles.unitsContainer}>
            {module.units.map((unit) => (
              <TouchableOpacity
                key={unit.id}
                onPress={() => {
                  if (!unit.locked) {
                    router.push({
                      pathname: "/level/[level]",
                      params: { level: unit.id },
                    });
                    
                  }
                }}
                disabled={unit.locked}
              >
                <LinearGradient
                  colors={
                    unit.completed
                      ? ["#4caf50", "#8bc34a"]
                      : unit.locked
                      ? ["#e0e0e0", "#bdbdbd"]
                      : ["#2196f3", "#64b5f6"]
                  }
                  style={styles.unitCard}
                >
                  <Text style={styles.unitTitle}>{unit.title}</Text>
                  <Text style={styles.unitXP}>{unit.rewardXP} XP</Text>
                  {unit.locked && (
                    <IconSymbol name="lock.fill" size={20} color="#fff" />
                  )}
                  {unit.completed && (
                    <IconSymbol
                      name="checkmark.circle"
                      size={20}
                      color="#fff"
                    />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  xpText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  moduleContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  moduleIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  moduleDescription: {
    color: "#666",
    marginBottom: 12,
  },
  unitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  unitCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unitTitle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  unitXP: {
    color: "#fff",
    fontSize: 12,
  },
});
