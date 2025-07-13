// app/lesson/[id].tsx
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import LessonContent from "./LessonContent";

export default function LessonPage() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, "lessons", id as string));
        if (lessonDoc.exists()) {
          setLesson({ id: lessonDoc.id, ...lessonDoc.data() });
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (!lesson) return <Text>Lección no encontrada</Text>;
  console.log("Lesson data:", lesson);
  return <LessonContent lesson={lesson} />;
}

const styles = StyleSheet.create({
  exerciseContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
