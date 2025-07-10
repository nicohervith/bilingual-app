import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategorizationGame from "@/components/CategorizationGame";
import ImageSelectionExercise from "@/components/ImageSelectionExercise";
import MatchingExercise from "@/components/MatchingExercise";
import MemoryGame from "@/components/MemoryGame";
import Quiz from "@/components/Quiz";
import { useAuth } from "@/contexts/AuthContext";
import { completeLesson } from "@/services/courseService";
import DragDropExercise from "@/components/DragAndDropExercise";

const LessonContent = ({
  lesson,
  onComplete,
}: {
  lesson: any;
  onComplete?: () => void;
}) => {
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Lección recibida:", JSON.stringify(lesson, null, 2));
    console.log("¿Tiene game?", !!lesson?.content?.game);
    console.log("Tipo de game:", lesson?.content?.game?.type);
  }, []);

  // Inicializar estado de ejercicios completados
  useEffect(() => {
    if (lesson) {
      const exercisesCount = lesson.content.exercises?.length || 0;
      setCompletedExercises(Array(exercisesCount).fill(false));
      setLoading(false);

      // Debug: Verificar estructura de la lección
      console.log("Lesson content:", JSON.stringify(lesson.content, null, 2));
    }
  }, [lesson]);

  useEffect(() => {
    if (lesson) {
      console.log("Inicializando ejercicios...");

      const exercisesCount = lesson.content.exercises?.length || 0;
      const hasGame = lesson.content.game ? 1 : 0;
      const totalExercises = exercisesCount + hasGame;

      console.log(
        `Ejercicios: ${exercisesCount}, Juegos: ${hasGame}, Total: ${totalExercises}`
      );

      setCompletedExercises(Array(totalExercises).fill(false));
      setLoading(false);
    }
  }, [lesson]);

  const handleExerciseComplete = (exerciseIndex: number) => {
    console.log(`Exercise ${exerciseIndex} completed`);
    setCompletedExercises((prev) => {
      const newCompleted = [...prev];
      newCompleted[exerciseIndex] = true;
      return newCompleted;
    });
  };

  const handleCompleteLesson = async () => {
    if (!user || !lesson) return;

    try {
      await completeLesson(user.uid, lesson.id, lesson.xpReward);
      onComplete?.();
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  // Verificar si todos los ejercicios están completos
  const allExercisesCompleted =
    completedExercises.length > 0 &&
    completedExercises.every((completed) => completed);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!lesson) {
    return (
      <View style={styles.notFoundContainer}>
        <Text>No se encontró la lección</Text>
      </View>
    );
  }

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
                  source={{
                    uri: item.image,
                    headers: {
                      Accept: "image/webp,image/png,image/jpeg",
                    },
                    cache: "force-cache",
                  }}
                  alt="Vocabulary Image"
                  style={styles.vocabularyImage}
                  resizeMode="contain"
                  onError={(e) =>
                    console.log("Error loading image:", e.nativeEvent.error)
                  }
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

      {/* Ejercicios */}
      {lesson.content.exercises?.map((exercise: any, index: number) => {
        console.log(`Rendering exercise ${index}:`, exercise); // Debug

        return (
          <View key={`ex-${index}`} style={styles.exerciseContainer}>
            {/* {exercise.type === "memory_game" && (
              <MemoryGame
                pairs={exercise.pairs}
                onComplete={() => handleExerciseComplete(index)}
              />
            )}
            {exercise.type === "matching" && (
              <MatchingExercise
                pairs={exercise.pairs}
                vocabulary={lesson.content.vocabulary}
                onComplete={() => handleExerciseComplete(index)}
                title={exercise.title}
              />
            )} */}
            {exercise.type === "drag_drop" && (
              <DragDropExercise
                sentences={exercise.sentences}
                pronouns={lesson.content.grammarRules}
                onComplete={() => handleExerciseComplete(index)}
              />
            )}
            {exercise.type === "memory_game" && (
              <MemoryGame
                pairs={exercise.pairs}
                onComplete={() => handleExerciseComplete(index)}
              />
            )}

            {exercise.type === "matching" && (
              <MatchingExercise
                pairs={exercise.pairs}
                vocabulary={lesson.content.vocabulary}
                onComplete={() => handleExerciseComplete(index)}
                title={exercise.title}
              />
            )}
            {exercise.type === "image_selection" && (
              <ImageSelectionExercise
                question={exercise.question}
                options={exercise.options}
                onComplete={() => handleExerciseComplete(index)}
              />
            )}
            {exercise.type === "vocabulary" && (
              <CategorizationGame
                categories={exercise.categories}
                items={exercise.items}
                onComplete={() => handleExerciseComplete(index)}
              />
            )}
          </View>
        );
      })}

      {/* Juego de escucha */}
      {/* Juegos */}
      {lesson.content?.game && (
        <View style={styles.gameContainer}>
          {lesson.content.game.type === "categorization" && (
            <CategorizationGame
              categories={lesson.content.game.categories}
              items={lesson.content.game.items}
              onComplete={() => handleExerciseComplete(0)}
            />
          )}
          {lesson.content.game.type === "memory_game" && (
            <MemoryGame
              pairs={lesson.content.game.pairs}
              onComplete={() => handleExerciseComplete(0)}
            />
          )}
          {lesson.content.game.type === "listening_quiz" && (
            <Quiz
              quiz={lesson.content.game}
              onComplete={() => handleExerciseComplete(0)}
            />
          )}
        </View>
      )}

      {/* Botón de completar */}
      <TouchableOpacity
        onPress={handleCompleteLesson}
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
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  loader: {
    marginTop: 20,
  },
  gameContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#444",
  },
  objective: {
    marginLeft: 8,
    color: "#555",
  },
  vocabularyItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
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
  },
  vocabularyImage: {
    width: "100%",
    height: 150,
    marginVertical: 8,
  },
  examplesContainer: {
    marginTop: 8,
    paddingLeft: 8,
  },
  example: {
    fontStyle: "italic",
    color: "#666",
    marginBottom: 4,
  },
  exerciseContainer: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 120,
  },
});

export default LessonContent;
