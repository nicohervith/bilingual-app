import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import Lottie from "lottie-react-native";
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
import { ExerciseComponentRenderer } from "./ExerciseComponentRenderer";
import type { Exercise } from "./exerciseConfig";
import { normalizeExerciseConfig } from "./exerciseConfig";
import { useExerciseCompletion, useLessonCompletion } from "./useLessonHooks";

const LessonContent = ({
  lesson,
  onComplete,
}: {
  lesson: any;
  onComplete?: (xpGained: number) => void;
}) => {
  const { unitId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Usar hooks personalizados para ejercicios y completitud
  const {
    completedExercises,
    exerciseData,
    handleExerciseComplete,
    handleExerciseData,
    allCompleted,
  } = useExerciseCompletion(
    (lesson?.content?.exercises?.length || 0) + (lesson?.content?.game ? 1 : 0),
  );

  const {
    isAlreadyCompleted,
    completionMessage,
    showXpReward,
    handleCompleteLesson: executeCompleteLesson,
    setShowXpReward,
  } = useLessonCompletion(lesson, onComplete);

  // Inicializar cuando la lección carga
  useEffect(() => {
    if (lesson) {
      setLoading(false);
    }
  }, [lesson]);

  const handleCompleteLesson = async () => {
    await executeCompleteLesson(unitId, allCompleted, lesson?.xpReward || 0);
  };

  const xpReward = lesson?.metadata?.xpReward ?? lesson?.xpReward ?? 0;

  // Renderizar ejercicios con el componente centralizado
  const renderExercise = (exercise: Exercise, index: number) => {
    if (!exercise) return null;

    const normalizedExercise = normalizeExerciseConfig(
      exercise,
      lesson?.content,
    );

    return (
      <View key={`ex-container-${index}`} style={styles.exerciseContainer}>
        <ExerciseComponentRenderer
          exercise={normalizedExercise}
          index={index}
          lessonContent={lesson?.content}
          exerciseData={exerciseData}
          onExerciseData={handleExerciseData}
          onComplete={() => handleExerciseComplete(index)}
          isCompleted={completedExercises[index] || false}
          key={`ex-${exercise.id || index}`}
        />
      </View>
    );
  };

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
              {lesson.content.vocabulary.map((item: any, index: number) => {
                const imageUrl = item.image || item.media?.image;

                return (
                  <View key={index} style={styles.vocabularyItem}>
                    <View style={styles.wordRow}>
                      <Text style={styles.word}>{item.word}</Text>
                      <Text style={styles.translation}>{item.translation}</Text>
                    </View>

                    {imageUrl && (
                      <Image
                        source={{
                          uri: imageUrl,
                          headers: {
                            Accept: "image/webp,image/png,image/jpeg",
                          },
                          cache: "force-cache",
                        }}
                        style={styles.vocabularyImage}
                        resizeMode="contain"
                        onError={(e) =>
                          console.log(
                            "Error loading image:",
                            e.nativeEvent.error,
                          )
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
                );
              })}
            </View>
          )}

          {/* Ejercicios */}
          {lesson.content.exercises?.map((exercise: Exercise, index: number) =>
            renderExercise(exercise, index),
          )}

          {/* Juego final */}
          {lesson.content?.game && (
            <View style={styles.gameContainer}>
              {renderExercise(
                {
                  ...lesson.content.game,
                  id: "game-" + (lesson.content.game.id || "0"),
                },
                lesson?.content?.exercises?.length || 0,
              )}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Mensaje de completitud */}
      {completionMessage && (
        <View
          style={[
            styles.messageContainer,
            isAlreadyCompleted ? styles.infoMessage : styles.successMessage,
          ]}
        >
          <Text style={styles.messageText}>{completionMessage}</Text>
        </View>
      )}

      {/* Botón de completar */}
      <TouchableOpacity
        onPress={handleCompleteLesson}
        disabled={!allCompleted || isAlreadyCompleted}
        style={[
          styles.completeButton,
          !allCompleted && styles.disabledButton,
          isAlreadyCompleted && styles.completedButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {isAlreadyCompleted
            ? "Lección completada"
            : allCompleted
              ? `Completar lección (+${xpReward} XP)`
              : "Completa todos los ejercicios"}
        </Text>
      </TouchableOpacity>

      {/* Animación de XP */}
      {showXpReward && (
        <View style={styles.animationContainer}>
          <Lottie
            source={require("@/assets/animations/xp-reward.json")}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
            speed={1.5}
            onAnimationFinish={() => {
              setShowXpReward(false);
            }}
          />
          <Text style={styles.xpText}>+{xpReward} XP</Text>
        </View>
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
  completedButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  successMessage: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  infoMessage: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
    borderWidth: 1,
  },
  messageText: {
    color: "#2E7D32",
  },
  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  lottieAnimation: {
    width: 300,
    height: 300,
  },
  xpText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default LessonContent;
