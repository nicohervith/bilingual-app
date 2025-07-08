import Lesson from "@/components/Lessons";
import { useAuth } from "@/contexts/AuthContext";
import { completeLesson, getLessonsByLevel } from "@/services/firestoreService";

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LevelScreen() {
  const { level: levelId } = useLocalSearchParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (levelId) {
      getLessonsByLevel(levelId as string)
        .then((lessons) => {
          setLessons(lessons);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading lessons:", error);
          setLoading(false);
        });
    }
  }, [levelId]);

  const handleCompleteLesson = async () => {
    if (!user || !lessons.length) return;

    const currentLesson = lessons[currentLessonIndex];

    try {
      if (!isTestMode) {
        await completeLesson(
          user.uid,
          levelId as string,
          currentLesson.id,
          currentLesson.xpReward
        );
      }
      if (currentLessonIndex < lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (lessons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se encontraron lecciones para este nivel</Text>
      </View>
    );
  }

  const currentLesson = lessons[currentLessonIndex];

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {currentLesson.title} ({currentLessonIndex + 1}/{lessons.length})
      </Text>

      <Lesson
        key={currentLesson.id}
        lesson={currentLesson}
        onComplete={handleCompleteLesson}
        currentLevel={levelId as string}
        isTestMode={false}
      />
    </ScrollView>
  );
}
