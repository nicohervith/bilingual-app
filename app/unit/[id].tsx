import { db } from "@/lib/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UnitScreen() {
  const { id } = useLocalSearchParams();
  const [unit, setUnit] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        console.log("Unit data:", unitData);
        // 2. Cargar todas las lecciones de la unidad
        const lessonPromises = unitData.lessons.map((lessonId: string) =>
          getDoc(doc(db, "lessons", lessonId))
        );
        console.log("Loading lessons for unit:", unitData.lessons);
        const lessonSnapshots = await Promise.all(lessonPromises);
        setLessons(lessonSnapshots.map((snap) => snap.data()));
      } catch (error) {
        console.error("Error loading unit:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUnitData();
  }, [id]);

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
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Lección {index + 1}: {lesson.title}
          </Text>
          <Text style={{ color: "#FFC107", marginTop: 4 }}>
            +{lesson.xpReward} XP
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
