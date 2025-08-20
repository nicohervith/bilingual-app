/* import { db } from "@/lib/firebaseConfig"; */
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UnitScreen() {
  const { id } = useLocalSearchParams();
  const [unit, setUnit] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  // Función para obtener el XP reward
  const getXpReward = (lesson: any): number => {
    if (lesson.xpReward !== undefined && lesson.xpReward !== null) {
      return lesson.xpReward;
    }
    if (
      lesson.metadata?.xpReward !== undefined &&
      lesson.metadata?.xpReward !== null
    ) {
      return lesson.metadata.xpReward;
    }
    return 0;
  };

  // Cargar lecciones completadas del usuario
  const loadCompletedLessons = async () => {
    if (!user) return new Set();

    try {
      const progressDoc = await getDoc(doc(db, "userProgress", user.uid));
      if (progressDoc.exists()) {
        const completed = progressDoc.data().completedLessons || {};
        const completedIds = Object.keys(completed).filter(
          (lessonId) => completed[lessonId]
        );
        return new Set(completedIds);
      }
    } catch (error) {
      console.error("Error loading completed lessons:", error);
    }
    return new Set();
  };

  useEffect(() => {
    const loadUnitData = async () => {
      try {
        // 1. Cargar datos de la unidad
        const unitDoc = await getDoc(doc(db, "units", id as string));
        if (!unitDoc.exists()) {
          console.warn("Unit not found");
          return;
        }

        const unitData = unitDoc.data();
        setUnit(unitData);

        // 2. Cargar lecciones completadas
        const completedSet = await loadCompletedLessons();
        setCompletedLessons(completedSet);

        // 3. Cargar todas las lecciones de la unidad
        const lessonPromises = unitData.lessons.map((lessonId: string) =>
          getDoc(doc(db, "lessons", lessonId))
        );

        const lessonSnapshots = await Promise.all(lessonPromises);
        const loadedLessons = lessonSnapshots.map((snap) => ({
          id: snap.id,
          ...snap.data(),
        }));

        setLessons(loadedLessons);
      } catch (error) {
        console.error("Error loading unit:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUnitData();
  }, [id, user]);

  // Función para verificar si una lección está completada
  const isLessonCompleted = (lessonId: string): boolean => {
    return completedLessons.has(lessonId);
  };

  // Estilos condicionales para lecciones completadas
  const getLessonStyle = (lessonId: string) => {
    const isCompleted = isLessonCompleted(lessonId);

    return {
      backgroundColor: isCompleted ? "#E8F5E9" : "#fff",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isCompleted ? "#4CAF50" : "#e0e0e0",
    };
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!unit) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Unidad no encontrada</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "blue", marginTop: 10 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        {unit.title}
      </Text>
      <Text style={{ color: "#666", marginBottom: 16 }}>
        {lessons.length} lecciones • {unit.rewardXP} XP
      </Text>

      {lessons.map((lesson, index) => {
        const xpReward = getXpReward(lesson);
        const isCompleted = isLessonCompleted(lesson.id);

        return (
          <TouchableOpacity
            key={lesson.id}
            onPress={() =>
              router.push({
                pathname: "/lesson/[id]",
                params: {
                  id: lesson.id,
                  unitId: id,
                },
              })
            }
            style={getLessonStyle(lesson.id)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}
                >
                  Lección {index + 1}: {lesson.title}
                </Text>
                <Text style={{ color: "#666", fontSize: 14, marginBottom: 4 }}>
                  Nivel: {lesson.metadata?.level || "A1"}
                </Text>
                <Text style={{ color: "#FFC107", fontWeight: "bold" }}>
                  +{xpReward} XP
                </Text>
              </View>

              {isCompleted && (
                <View
                  style={{
                    backgroundColor: "#4CAF50",
                    borderRadius: 12,
                    padding: 4,
                    marginLeft: 8,
                  }}
                >
                  <Ionicons name="checkmark" size={20} color="white" />
                </View>
              )}
            </View>

            {isCompleted && (
              <Text
                style={{
                  color: "#4CAF50",
                  fontSize: 12,
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                Completada
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lessonCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  completedLessonCard: {
    backgroundColor: "#E8F5E9", // Verde claro
    borderColor: "#4CAF50", // Verde
  },
  lessonTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  lessonLevel: {
    color: "#666",
    fontSize: 14,
    marginBottom: 4,
  },
  lessonXp: {
    color: "#FFC107",
    fontWeight: "bold",
  },
  completedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
