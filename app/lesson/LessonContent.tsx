import AudioMatchingGame from "@/components/AudioMatchingGame";
import AudioToImageMatching from "@/components/AudioToImageMatching";
import CategorizationGame from "@/components/CategorizationGame";
import ConjugationExercise from "@/components/ConjugationExercise";
import DragDropExercise from "@/components/DragAndDropExercise";
import CalendarPlanner from "@/components/games/CalendarPlanner";
import DialogueSimulation from "@/components/games/DialogueSimulation";
import MapInteractive from "@/components/games/MapInteractive";
import ImageSelectionExercise from "@/components/ImageSelectionExercise";
import MatchingExercise from "@/components/MatchingExercise";
import MemoryGame from "@/components/MemoryGame";
import NumbersGame from "@/components/NumbersGame";
import SentenceBuilder from "@/components/SentenceBuilder";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";
import { completeLesson } from "@/services/courseService";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface Exercise {
  id: string;
  type: string;
  title?: string;
  config: any;
  [key: string]: any;
}

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
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState("");

  const [showXpReward, setShowXpReward] = useState(false);
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animatedValue.value }],
    opacity: animatedValue.value,
  }));

  const startXpAnimation = () => {
    setShowXpReward(true);
  };

  useEffect(() => {
    const checkIfCompleted = async () => {
      if (!user || !lesson) return;

      const progressDoc = await getDoc(doc(db, "userProgress", user.uid));
      if (progressDoc.exists()) {
        const completed = progressDoc.data().completedLessons || {};
        const alreadyCompleted = !!completed[lesson.id];
        setIsAlreadyCompleted(alreadyCompleted);
        if (alreadyCompleted) {
          setCompletionMessage(
            "Ya completaste esta lección (no obtendrás XP adicional)"
          );
        }
      }
    };

    checkIfCompleted();
  }, [user, lesson]);

  const handleCompleteLesson = async () => {
    if (!user || !lesson || !allExercisesCompleted) return;

    if (isAlreadyCompleted) {
      return;
    }

    try {
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

      await completeLesson(
        user.uid,
        lesson.id,
        lesson.xpReward,
        unitInfo || { id: "" }
      );

      setIsAlreadyCompleted(true);
      setCompletionMessage(`¡Lección completada! +${lesson.xpReward} XP`);
      setShowXpReward(true);
      startXpAnimation();
      onComplete?.(lesson.xpReward);
    } catch (error) {
      console.error("Error completing lesson:", error);
      setCompletionMessage("Error al completar la lección");
    }
  };

  useEffect(() => {
    if (lesson) {
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

  /*  const ExerciseComponent = ({
    exercise,
    onComplete,
  }: {
    exercise: any;
    onComplete: () => void;
  }) => {
    switch (exercise.type) {
      case "audio_matching":
        return (
          <AudioMatchingGame
            key={exercise.id}
            config={exercise.config}
            vocabulary={lesson.content.vocabulary}
            onComplete={onComplete}
          />
        );

      case "conjugation":
        return (
          <ConjugationExercise
            config={exercise.config}
            onComplete={onComplete}
          />
        );

      case "sentence_formation":
        return (
          <SentenceBuilder config={exercise.config} onComplete={onComplete} />
        );

      default:
        return null;
    }
  }; */

  const ExerciseComponent = ({
    exercise,
    index,
  }: {
    exercise: Exercise;
    index: number;
  }) => {
    const commonProps = {
      key: `ex-${exercise.id || index}`,
      onComplete: () => handleExerciseComplete(index),
    };

    switch (exercise.type) {
      case "audio_matching":
        return exercise.config.mode === "audio_to_image" ? (
          <AudioToImageMatching {...commonProps} config={exercise.config} />
        ) : (
          <AudioMatchingGame
            {...commonProps}
            config={exercise.config}
            vocabulary={lesson.content.vocabulary}
          />
        );

      case "conjugation":
        // Manejar diferentes formatos de conjugación
        const conjugationConfig = exercise.config
          ? {
              ...exercise.config,
              exerciseType: exercise.config.verb ? "verb" : "reflexive",
              tenses: exercise.config.tenses || ["Presente"],
            }
          : {
              pronouns: exercise.pronouns || [],
              correct: exercise.correct || {},
              exerciseType: "reflexive",
              tenses: ["Presente"],
              title: exercise.title,
            };

        return (
          <ConjugationExercise {...commonProps} config={conjugationConfig} />
        );

      case "sentence_formation":
        // Manejar ambos formatos (con y sin config)
        const sentenceProps = exercise.config
          ? exercise.config
          : {
              wordBank: exercise.words || [],
              correctAnswers: [exercise.correct],
              requiredWords: exercise.required,
              timeLimit: exercise.timeLimit || 0,
            };

        return (
          <SentenceBuilder
            {...commonProps}
            config={sentenceProps}
            title={exercise.title}
          />
        );

      case "numbers_game":
        return (
          <NumbersGame
            {...commonProps}
            vocabulary={lesson.content.vocabulary || []}
            range={exercise.options?.range || [1, 20]}
            imageBaseUrl={exercise.options?.imageBaseUrl || ""}
          />
        );

      /* case "drag_drop":
        return (
          <DragDropExercise
            {...commonProps}
            dragItems={exercise.items.map((item: any) => ({
              id: item.id || `items-${Math.random().toString(36).substr(2, 9)}`,
              content: item.from,
            }))}
            dropZones={exercise.pairs.map((pair: any) => ({
              id: pair.id || `zone-${Math.random().toString(36).substr(2, 9)}`,
              content: pair.to,
              correctMatch: pair.id,
            }))}
            instructions={
              exercise.question ||
              "Arrastra cada elemento a su posición correcta"
            }
            question={exercise.question}
          />
        ); */
      case "drag_drop":
        return (
          <DragDropExercise
            {...commonProps}
            dragItems={
              exercise.items?.map((item: any) => ({
                // Usar ?. opcional
                id:
                  item.id || `items-${Math.random().toString(36).substr(2, 9)}`,
                content: item.from,
              })) || []
            } // Fallback a array vacío
            dropZones={
              exercise.pairs?.map((pair: any) => ({
                // Usar ?. opcional
                id:
                  pair.id || `zone-${Math.random().toString(36).substr(2, 9)}`,
                content: pair.to,
                correctMatch: pair.id,
              })) || []
            } // Fallback a array vacío
            instructions={exercise.question || "Arrastra cada elemento..."}
          />
        );

      case "memory_game":
        return (
          <MemoryGame
            {...commonProps}
            pairs={exercise.pairs} // Formato antiguo
            config={exercise.config} // Formato nuevo
          />
        );

      /*   case "matching":
        return (
          <MatchingExercise
            {...commonProps}
            pairs={exercise.pairs}
            vocabulary={lesson.content.vocabulary}
            title={exercise.title}
          />
        ); */
      case "matching":
        return (
          <MatchingExercise
            {...commonProps}
            pairs={exercise.config?.pairs || exercise.pairs}
            vocabulary={lesson.content.vocabulary}
            title={exercise.title}
          />
        );

      case "image_selection":
        // Manejar tanto el formato antiguo como el nuevo
        const imageSelectionProps = exercise.config || {
          question: exercise.question,
          options: exercise.options.map((opt: any) => ({
            image: opt.image,
            correct: opt.correct || opt.isCorrect || false,
            feedback: opt.feedback,
          })),
          multipleSelection: exercise.multipleSelection || false,
        };

        return (
          <ImageSelectionExercise
            {...commonProps}
            config={imageSelectionProps}
          />
        );

      case "vocabulary":
        return (
          <CategorizationGame
            {...commonProps}
            categories={exercise.categories}
            items={exercise.items}
          />
        );

      case "map_interactive":
        return <MapInteractive {...commonProps} config={exercise.config} />;

      case "calendar_planner":
        return <CalendarPlanner {...commonProps} config={exercise.config} />;

      case "dialogue_simulation":
        return <DialogueSimulation {...commonProps} config={exercise.config} />;

      default:
        console.warn(`Tipo de ejercicio no soportado: ${exercise.type}`);
        return null;
    }
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
                // Obtener la imagen de cualquier estructura posible
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
                            e.nativeEvent.error
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
          {/*  {lesson.content.exercises?.map((exercise: any, index: number) => {
            console.log(`Rendering exercise ${index}:`, exercise); // Debug

            return (
              <View key={`ex-${index}`} style={styles.exerciseContainer}>
                {exercise.type === "numbers_game" && (
                  <NumbersGame
                    vocabulary={lesson.content.vocabulary || []}
                    range={exercise.options?.range || [1, 20]}
                    imageBaseUrl={exercise.options?.imageBaseUrl || ""}
                    onComplete={() => handleExerciseComplete(index)}
                  />
                )}

                {lesson.content.exercises.map(
                  (exercise: unknown, index: number) => (
                    <ExerciseComponent
                      key={`ex-${index}`}
                      exercise={exercise}
                      onComplete={() => handleExerciseComplete(index)}
                    />
                  )
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
          )} */}
          {lesson.content.exercises?.map(
            (exercise: Exercise, index: number) => (
              <View
                key={`ex-container-${index}`}
                style={styles.exerciseContainer}
              >
                <ExerciseComponent exercise={exercise} index={index} />
              </View>
            )
          )}

          {/* Juego de escucha */}
          {lesson.content?.game && (
            <View style={styles.gameContainer}>
              <ExerciseComponent
                exercise={{
                  ...lesson.content.game,
                  type: lesson.content.game.type,
                  id: "game-" + (lesson.content.game.id || "0"),
                }}
                index={0}
              />
            </View>
          )}
        </ScrollView>
      </View>
      {/* Botón de completar */}
      {completionMessage ? (
        <View
          style={[
            styles.messageContainer,
            isAlreadyCompleted ? styles.infoMessage : styles.successMessage,
          ]}
        >
          <Text style={styles.messageText}>{completionMessage}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleCompleteLesson}
        disabled={!allExercisesCompleted || isAlreadyCompleted}
        style={[
          styles.completeButton,
          !allExercisesCompleted && styles.disabledButton,
          isAlreadyCompleted && styles.completedButton,
        ]}
      >
        <Text style={styles.buttonText}>
          {isAlreadyCompleted
            ? "Lección completada"
            : allExercisesCompleted
            ? `Completar lección (+${lesson.xpReward} XP)`
            : "Completa todos los ejercicios"}
        </Text>
      </TouchableOpacity>

      {/* Animación XP - Fuera del ScrollView */}
      {showXpReward && (
        <View style={styles.animationContainer}>
          <Lottie
            source={require("@/assets/animations/xp-reward.json")}
            autoPlay
            loop={false}
            style={styles.lottieAnimation}
            onAnimationFinish={() => {
              setShowXpReward(false);
              onComplete?.(lesson.xpReward);
            }}
          />
          <Text style={styles.xpText}>+{lesson.xpReward} XP</Text>
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
  completedButton: {
    backgroundColor: "#E0E0E0",
  },
});

export default LessonContent;
