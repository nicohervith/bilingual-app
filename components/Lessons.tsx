import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


import FillBlankExercise from "./FillBlankExercise";
import MatchingExercise from "./MatchingExercise";

import { useAuth } from "@/contexts/AuthContext";
import ImageSelectionExercise from "./ImageSelectionExercise";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { completeLesson, getProgress, unlockNextUnit } from "@/services/courseService";
import LessonContent from "./LessonContent";

// Definición de tipos para TypeScript
type VocabularyItem = {
  word: string;
  translation: string;
  image?: string;
  examples?: string[];
};

type GrammarRule = {
  rule: string;
  examples: string[];
};

type Exercise = {
  type: string;
  [key: string]: any;
};

type LessonContent = {
  vocabulary?: VocabularyItem[];
  grammarRules?: GrammarRule[];
  exercises?: Exercise[];
};

type LessonProps = {
  lesson: {
    id: string;
    title: string;
    content: LessonContent;
    type?: string;
    xpReward: number;
    objectives?: string[];
  };
  onComplete: () => void;
  currentLevel: string;
  isTestMode?: boolean;
  onPress?: () => void;
};


export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const loadLesson = async () => {
      const lessonDoc = await getDoc(doc(db, "lessons", id as string));
      setLesson(lessonDoc.data());
      setLoading(false);
    };
    
    loadLesson();
  }, [id]);

  const handleComplete = async () => {
    if (!user || !lesson) return;
    
    try {
      await completeLesson(user.uid, lesson.id, lesson.xpReward);
      
      // Verificar si se completó la unidad
      const userProgress = await getProgress(user.uid);
      const allLessonsCompleted = '';
      
      if (allLessonsCompleted) {
        // Desbloquear siguiente unidad
        await unlockNextUnit(user.uid, lesson.module, lesson.unit);
      }
      
      router.back();
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  if (loading || !lesson) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <LessonContent 
        lesson={lesson}
        onComplete={handleComplete}
      />
    </View>
  );
}

/* export default function Lesson({
  lesson,
  onComplete,
  currentLevel,
  isTestMode = false,
}: LessonProps) {
  const { user } = useAuth();
  const [xpAnimation] = useState(new Animated.Value(0));
  const { title, content, xpReward, objectives } = lesson;
  const [showXpReward, setShowXpReward] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exercisesCompleted, setExercisesCompleted] = useState<boolean[]>([]);

  const renderTestModeControls = () => {
    if (!isTestMode) return null;
    console.log("Rendering test mode controls");
    return (
      <View style={styles.testControls}>
        <TouchableOpacity
          onPress={onComplete}
          style={[styles.completeButton, { backgroundColor: "#ff9900" }]}
        >
          <Text style={styles.buttonText}>
            Avanzar manualmente (Modo prueba)
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleComplete = async () => {
    if (!user) return;

    try {
      await completeLesson(user.uid, currentLevel, lesson.id, lesson.xpReward);

      setShowXpReward(true);
      setTimeout(() => {
        setShowXpReward(false);
        onComplete();
      }, 1500);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleExerciseComplete = (exerciseIndex: number) => {
    setExercisesCompleted((prev) => {
      const newCompleted = [...prev];
      newCompleted[exerciseIndex] = true;
      return newCompleted;
    });
  };

  const opacity = xpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Animación para el XP
  useEffect(() => {
    if (showXpReward) {
      Animated.timing(xpAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showXpReward]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {objectives && objectives.length > 0 && (
        <View style={styles.objectivesContainer}>
          <Text style={styles.sectionTitle}>Objetivos:</Text>
          {objectives.map((obj, index) => (
            <Text key={index} style={styles.objective}>
              • {obj}
            </Text>
          ))}
        </View>
      )}

      {content.vocabulary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulario</Text>
          {content.vocabulary.map((item, index) => (
            <View key={index} style={styles.vocabularyItem}>
              <Text style={styles.word}>{item.word}</Text>
              <Text style={styles.translation}>{item.translation}</Text>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
              {item.examples && item.examples.length > 0 && (
                <View style={styles.examplesContainer}>
                  <Text style={styles.examplesTitle}>Ejemplos:</Text>
                  {item.examples.map((example, i) => (
                    <Text key={i} style={styles.example}>
                      - {example}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}


      {content.grammarRules && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reglas Gramaticales</Text>
          {content.grammarRules.map((rule, index) => (
            <View key={index} style={styles.grammarRule}>
              <Text style={styles.ruleText}>{rule.rule}</Text>
              {rule.examples && (
                <View style={styles.examplesContainer}>
                  {rule.examples.map((example, i) => (
                    <Text key={i} style={styles.example}>
                      • {example}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {content.exercises && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          {content.exercises.map((exercise, index) => {
            if (exercise.type === "matching") {
              return (
                <MatchingExercise
                  key={index}
                  pairs={exercise.pairs}
                  onComplete={() => handleExerciseComplete(index)}
                />
              );
            }
            if (exercise.type === "fill_blank") {
              return (
                <FillBlankExercise
                  key={index}
                  questions={exercise.questions}
                  onComplete={() => {
                    setExerciseCompleted(true);
                    onComplete();
                  }}
                />
              );
            }

            if (exercise.type === "image_selection") {
              return (
                <ImageSelectionExercise
                  key={index}
                  question={exercise.question}
                  options={exercise.options}
                  onComplete={() => setExerciseCompleted(true)}
                />
              );
            }
            return null;
          })}
        </View>
      )}
      {showXpReward && (
        <Animated.View style={[styles.xpReward, { opacity }]}>
          <Text style={styles.xpText}>+{xpReward} XP!</Text>
        </Animated.View>
      )}

      {!isTestMode && exercisesCompleted && (
        <TouchableOpacity
          onPress={handleComplete}
          style={styles.completeButton}
        >
          <Text style={styles.buttonText}>
            {content.exercises
              ? "Continuar a siguiente lección"
              : "Completar lección"}
          </Text>
        </TouchableOpacity>
      )}
      {renderTestModeControls()}
    </View>
  );
}
 */
const styles = StyleSheet.create({
  container:{

  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  objectivesContainer: {
    marginBottom: 15,
  },
  objective: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  vocabularyItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  word: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  translation: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  examplesContainer: {
    marginTop: 8,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
  example: {
    fontSize: 13,
    color: "#555",
    marginLeft: 5,
    marginTop: 3,
  },
  grammarRule: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f7ff",
    borderRadius: 8,
  },
  ruleText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2980b9",
  },
  completeButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  xpReward: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(46, 204, 113, 0.9)",
    padding: 20,
    borderRadius: 10,
    zIndex: 100,
  },
  xpText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  testControls: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff8e6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcc00",
  },
});
