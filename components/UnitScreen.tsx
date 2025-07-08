import { getLessonById, getUnitById } from "@/services/courseService";
import { Lesson, Unit } from "@/types/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

export default function UnitScreen() {
  const { id } = useLocalSearchParams();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const loadUnit = async () => {
      try {
        // 1. Obtener datos de la unidad
        const unitData = await getUnitById(id as string);
        setUnit(unitData);

        // 2. Obtener todas las lecciones de la unidad
        if (unitData && unitData.lessons) {
          const lessonsData = await Promise.all(
            unitData.lessons.map((lessonId) => getLessonById(lessonId))
          );
          setLessons(lessonsData);
        } else {
          setLessons([]);
        }
      } catch (error) {
        console.error("Error loading unit:", error);
      }
    };

    loadUnit();
  }, [id]);

  return (
    <ScrollView>
      <Text style={styles.title}>{unit?.title}</Text>

      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onPress={() => router.push(`/lesson/${lesson.id}`)}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    
  },
});
