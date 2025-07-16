// app/unit/[id].tsx
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
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
        const unitDoc = await getDoc(doc(db, "units", id as string));
        if (!unitDoc.exists()) {
          console.warn("Unit not found");
          return;
        }

        setUnit(unitDoc.data());

        const lessonPromises = unitDoc
          .data()
          .lessons.map((lessonId: string) =>
            getDoc(doc(db, "lessons", lessonId))
          );

        const lessonSnapshots = await Promise.all(lessonPromises);
        const lessonsData = lessonSnapshots.map((snap) => snap.data());
        setLessons(lessonsData);

        const progressDoc = await getDoc(doc(db, "userProgress", user.uid));
        if (progressDoc.exists()) {
          const progressData = progressDoc.data();
          const completed = progressData.completedLessons || {};
          console.log("User progress:", completed);
          setCompletedLessons(completed);
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
        <TouchableOpacity
          key={lesson.id}
          onPress={() =>
            router.push({
              pathname: "/lesson/[id]",
              params: { id: lesson.id },
            })
          }
          style={{
            backgroundColor: completedLessons[lesson.id] ? "#E8F5E9" : "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: completedLessons[lesson.id] ? "#4CAF50" : "#e0e0e0",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {completedLessons[lesson.id] && "✓ "}
              Lección {index + 1}: {lesson.title}
            </Text>
            {completedLessons[lesson.id] && <Text>✅</Text>}
          </View>
          <Text style={{ color: "#FFC107", marginTop: 4 }}>
            +{lesson.xpReward} XP
          </Text>
        </TouchableOpacity>
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
});
