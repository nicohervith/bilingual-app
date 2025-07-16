import React, { useEffect, useRef, useState } from "react";
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
import DragDropExercise from "@/components/DragAndDropExercise";
import ImageSelectionExercise from "@/components/ImageSelectionExercise";
import MatchingExercise from "@/components/MatchingExercise";
import MemoryGame from "@/components/MemoryGame";
import NumbersGame from "@/components/NumbersGame";
import Quiz from "@/components/Quiz";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { completeLesson } from "@/services/courseService";
import { collection, getDocs } from "firebase/firestore";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const LessonContent = ({
  lesson,
  onComplete,
}: {
  lesson: any;
  onComplete?: (xpGained: number) => void;
}) => {
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [showXpReward, setShowXpReward] = useState(false);
  const xpScale = useSharedValue(0);
  const xpOpacity = useSharedValue(0);
  const xpPosition = useSharedValue(0);

  const animationComplete = useRef(false);

  // En tu LessonContent o donde llames a completeLesson
  const handleCompleteLesson = async () => {
    if (!user || !lesson) return;

    try {
      // 1. Obtener datos de la unidad padre
      const unitsQuery = await getDocs(collection(db, "modules"));
      let unitInfo = null;

      unitsQuery.forEach((moduleDoc) => {
        Object.entries(moduleDoc.data().units || {}).forEach(
          ([unitId, unit]: [string, any]) => {
            if (unit.lessons.includes(lesson.id)) {
              unitInfo = {
                id: unitId,
                insignia: unit.insignia,
              };
            }
          }
        );
      });

      // 2. Completar lección con info de la unidad
      await completeLesson(
        user.uid,
        lesson.id,
        lesson.xpReward,
        unitInfo || { id: "" }
      );

      // 3. Mostrar feedback al usuario
      setShowXpReward(true);
      startXpAnimation();
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  const startXpAnimation = () => {
    animationComplete.current = false;

    xpScale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(1.2, { duration: 200, easing: Easing.out(Easing.exp) }),
      withTiming(1, { duration: 100 })
    );

    xpOpacity.value = withTiming(1, { duration: 200 });

    xpPosition.value = withSequence(
      withTiming(0, { duration: 200 }),
      withDelay(
        1000,
        withTiming(-50, {
          duration: 500,
          easing: Easing.out(Easing.exp),
        })
      )
    );

    xpOpacity.value = withDelay(
      1500,
      withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(() => {
            setShowXpReward(false);
            animationComplete.current = true;
            onComplete?.(lesson.xpReward);
          })();
        }
      })
    );
  };

  const xpAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: xpScale.value }, { translateY: xpPosition.value }],
    opacity: xpOpacity.value,
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    zIndex: 1000,
  }));

  useEffect(() => {
    console.log("Lección recibida:", JSON.stringify(lesson, null, 2));
    console.log("¿Tiene game?", !!lesson?.content?.game);
    console.log("Tipo de game:", lesson?.content?.game?.type);
  }, []);

  // Inicializar estado de ejercicios completados
  /*  useEffect(() => {
    if (lesson) {
      const exercisesCount = lesson.content.exercises?.length || 0;
      setCompletedExercises(Array(exercisesCount).fill(false));
      setLoading(false);

      // Debug: Verificar estructura de la lección
      console.log("Lesson content:", JSON.stringify(lesson.content, null, 2));
    }
  }, [lesson]); */

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

  /* const handleExerciseComplete = (exerciseIndex: number) => {
    console.log(`Exercise ${exerciseIndex} completed`);
    setCompletedExercises((prev) => {
      const newCompleted = [...prev];
      newCompleted[exerciseIndex] = true;
      return newCompleted;
    });
  }; */
  const handleExerciseComplete = (exerciseIndex: number) => {
    console.log(`Exercise ${exerciseIndex} completed. Current state:`, [
      ...completedExercises,
    ]);
    setCompletedExercises((prev) => {
      const newCompleted = [...prev];
      newCompleted[exerciseIndex] = true;
      console.log("Updated state:", newCompleted);
      return newCompleted;
    });
  };

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
    <View style={{ flex: 1 }}>
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
              {exercise.type === "numbers_game" && (
                <NumbersGame
                  vocabulary={lesson.content.vocabulary}
                  range={exercise.options?.range || [1, 20]}
                  imageBaseUrl={exercise.options?.imageBaseUrl || ""}
                  onComplete={() => handleExerciseComplete(index)}
                />
              )}
              {exercise.type === "drag_drop" && (
                <DragDropExercise
                  dragItems={exercise.items.map((item: any) => ({
                    id:
                      item.id ||
                      `items-${Math.random().toString(36).substr(2, 9)}`,
                    content: item.from,
                  }))}
                  dropZones={exercise.pairs.map((pair: any) => ({
                    id:
                      pair.id ||
                      `zone-${Math.random().toString(36).substr(2, 9)}`,
                    content: pair.to,
                    correctMatch: pair.id,
                  }))}
                  instructions={
                    exercise.question ||
                    "Arrastra cada elemento a su posición correcta"
                  }
                  onComplete={() => {
                    console.log(`Ejercicio ${index} completado`);
                    handleExerciseComplete(index);
                  }}
                  question={exercise.question}
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
            (!allExercisesCompleted && lesson.content.exercises?.length > 0) ||
            showXpReward
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
      {showXpReward && (
        <Animated.View style={[styles.xpRewardContainer, xpAnimatedStyle]}>
          <View style={styles.xpBubble}>
            <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
            <View style={styles.starsContainer}>
              {[...Array(3)].map((_, i) => (
                <Text key={i} style={styles.star}>
                  ★
                </Text>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
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
  xpAnimationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  xpAnimationContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
  xpRewardContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  xpBubble: {
    backgroundColor: "rgba(255, 215, 0, 0.95)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  xpText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    fontSize: 22,
    color: "#FFF",
    marginHorizontal: 2,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default LessonContent;
