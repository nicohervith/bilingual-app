// app/lesson/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { db } from "@/lib/firebaseConfig";
import { completeLesson } from "@/services/courseService";
import { useAuth } from "@/contexts/AuthContext";
import MatchingExercise from "@/components/MatchingExercise";
import ImageSelectionExercise from "@/components/ImageSelectionExercise";
import Quiz from "./Quiz";
/* import ListeningQuiz from "@/components/ListeningQuiz"; */

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonDoc = await getDoc(doc(db, "lessons", id as string));
        if (lessonDoc.exists()) {
          const lessonData = lessonDoc.data();
          setLesson(lessonData);

          // Inicializar ejercicios completados basado en el tipo de lección
          const exercisesCount =
            lessonData.content.exercises?.length ||
            (lessonData.content.game ? 1 : 0);
          setCompletedExercises(Array(exercisesCount).fill(false));
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id]);

  const handleExerciseComplete = (exerciseIndex: number) => {
    setCompletedExercises((prev) => {
      const newCompleted = [...prev];
      newCompleted[exerciseIndex] = true;
      return newCompleted;
    });
  };

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

  // Determinar si todos los ejercicios están completos
  const allExercisesCompleted =
    completedExercises.length > 0 &&
    completedExercises.every((completed) => completed);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Encabezado */}
      <Text style={styles.title}>{lesson.title}</Text>

      {/* Objetivos */}
      {lesson.objectives?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          {lesson.objectives.map((obj: string, i: number) => (
            <Text key={i} style={styles.objective}>
              • {obj}
            </Text>
          ))}
        </View>
      )}

      {/* Vocabulario */}
      {lesson.content.vocabulary?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulario</Text>
          {lesson.content.vocabulary.map((item: any, index: number) => (
            <View key={index} style={styles.vocabularyItem}>
              <View style={styles.wordRow}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.translation}>{item.translation}</Text>
              </View>

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.vocabularyImage}
                  resizeMode="contain"
                />
              )}

              {item.examples?.length > 0 && (
                <View style={styles.examplesContainer}>
                  {item.examples.map((ex: string, i: number) => (
                    <Text key={i} style={styles.example}>
                      "{ex}"
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Ejercicios estándar */}
      {lesson.content.exercises?.map((exercise: any, index: number) => {
        switch (exercise.type) {
          case "matching":
            return (
              <MatchingExercise
                key={`ex-${index}`}
                pairs={exercise.pairs}
                onComplete={() => handleExerciseComplete(index)}
              />
            );
          case "image_selection":
            return (
              <ImageSelectionExercise
                key={`ex-${index}`}
                question={exercise.question}
                options={exercise.options}
                onComplete={() => handleExerciseComplete(index)}
              />
            );
          default:
            return null;
        }
      })}

      {/* Juego de escucha (listening_quiz) */}
      {lesson.content.game?.type === "listening_quiz" && (
        <Quiz
          quiz={lesson.content.game}
          onComplete={() => handleExerciseComplete(0)}
        />
      )}

      {/* Botón de completar */}
      <TouchableOpacity
        onPress={handleComplete}
        disabled={
          !allExercisesCompleted && lesson.content.exercises?.length > 0
        }
        style={[
          styles.completeButton,
          !allExercisesCompleted &&
            lesson.content.exercises?.length > 0 &&
            styles.disabledButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {allExercisesCompleted || lesson.content.exercises?.length === 0
            ? `Completar lección (+${lesson.xpReward} XP)`
            : "Completa todos los ejercicios"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
  },
  objective: {
    marginLeft: 8,
    marginBottom: 4,
  },
  vocabularyItem: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  wordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  word: {
    fontWeight: "bold",
    fontSize: 16,
  },
  translation: {
    color: "#666",
    fontSize: 16,
  },
  vocabularyImage: {
    width: "100%",
    height: 150,
    marginVertical: 8,
  },
  examplesContainer: {
    marginTop: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#ddd",
  },
  example: {
    fontStyle: "italic",
    color: "#666",
    marginBottom: 4,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
