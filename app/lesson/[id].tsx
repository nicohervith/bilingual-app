// app/lesson/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { db } from "@/lib/firebaseConfig";
import { completeLesson } from "@/services/courseService";
import { useAuth } from "@/contexts/AuthContext";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const loadLesson = async () => {
      const lessonDoc = await getDoc(doc(db, "lessons", id as string));
      if (lessonDoc.exists()) {
        setLesson(lessonDoc.data());
      }
      setLoading(false);
    };
    loadLesson();
  }, [id]);

  const handleComplete = async () => {
    if (!user || !lesson) return;

    try {
      await completeLesson(user.uid, lesson.id, lesson.xpReward);
      router.back();
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!lesson) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se encontró la lección</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {lesson.title}
      </Text>

      {/* Renderiza el contenido de la lección */}
      {lesson.content.vocabulary && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Vocabulario
          </Text>
          {lesson.content.vocabulary.map((item: any, index: number) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "bold" }}>{item.word}</Text>
              <Text>{item.translation}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={handleComplete}
        style={{
          backgroundColor: "#4CAF50",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Completar lección (+{lesson.xpReward} XP)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
