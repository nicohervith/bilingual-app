// app/unit/[id].tsx
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

export default function UnitScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const [unit, setUnit] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUnitData = async () => {
      if (!user) return;

      try {
        // 1. Cargar datos de la unidad
        const unitDoc = await getDoc(doc(db, "units", id as string));
        if (!unitDoc.exists()) {
          console.warn("Unit not found");
          return;
        }

        setUnit(unitDoc.data());

        // 2. Cargar todas las lecciones de la unidad
        const lessonPromises = unitDoc
          .data()
          .lessons.map((lessonId: string) =>
            getDoc(doc(db, "lessons", lessonId))
          );

        const lessonSnapshots = await Promise.all(lessonPromises);
        const lessonsData = lessonSnapshots.map((snap) => ({
          id: snap.id,
          ...snap.data(),
        }));
        setLessons(lessonsData);

        // 3. Cargar progreso del usuario
        const progressDoc = await getDoc(doc(db, "userProgress", user.uid));
        if (progressDoc.exists()) {
          const progressData = progressDoc.data();
          setCompletedLessons(progressData.completedLessons || {});
        }
      } catch (error) {
        console.error("Error loading unit:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUnitData();
  }, [id, user]);

  const calculateUnitProgress = () => {
    if (!unit || lessons.length === 0) return 0;
    const completedCount = lessons.filter((l) => completedLessons[l.id]).length;
    return completedCount / lessons.length;
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

      <View style={{ marginBottom: 16 }}>
        <Progress.Bar
          progress={calculateUnitProgress()}
          width={null}
          color="#4CAF50"
        />
        <Text style={{ textAlign: "center", marginTop: 4 }}>
          {Math.round(calculateUnitProgress() * 100)}% completado
        </Text>
      </View>

      {lessons.map((lesson, index) => (
        <View
          key={lesson.id}
          style={[
            styles.lessonContainer,
            completedLessons[lesson.id] && styles.completedLesson,
          ]}
        >
          <TouchableOpacity
            onPress={() => router.push(`/lesson/${lesson.id}`)}
            style={styles.lessonTouchable}
          >
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonTitle}>
                {completedLessons[lesson.id] && "✓ "}
                Lección {index + 1}: {lesson.title}
              </Text>
              {completedLessons[lesson.id] && <Text>✅</Text>}
            </View>

            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
              {completedLessons[lesson.id] && (
                <Text style={styles.completedText}>• Completada</Text>
              )}
            </View>
          </TouchableOpacity>

          {completedLessons[lesson.id] && (
            <Text style={styles.reviewText}>
              Toca para repasar esta lección
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {},
  title: {},
  unitDescription: {},
  moduleTitle: {},
  unitCard: {},
  unitTitle: {},
  lessonItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  completedLesson: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
  },
  /* lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }, */
  lessonTitle: {
    fontWeight: "bold",
    flex: 1,
  },
  xpReward: {
    color: "#FFC107",
    marginTop: 4,
  },
 /*  completedText: {
    color: "#4CAF50",
    marginTop: 4,
    fontSize: 12,
  }, */
  lessonContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  /* completedLesson: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
    borderWidth: 1,
  }, */
  lessonTouchable: {
    padding: 16,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  xpText: {
    color: "#FFC107",
  },
  completedText: {
    color: "#4CAF50",
    marginLeft: 8,
  },
  reviewText: {
    backgroundColor: "#E3F2FD",
    color: "#0D47A1",
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
});
