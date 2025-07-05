import { useAuth } from "@/contexts/AuthContext";
import { completeMission } from "@/services/progressService";
import { MissionType } from "@/types/missionsType";
import { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Quiz from "./Quiz";

interface MissionProps {
  mission: MissionType;
  onComplete: () => void;
  currentLevel: string;
}

export default function Mission({
  mission,
  onComplete,
  currentLevel,
}: MissionProps) {
  const { user } = useAuth();
  const [xpAnimation] = useState(new Animated.Value(0));

  const { title, content, type, gameConfig, xpReward, id } = mission;
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showXpReward, setShowXpReward] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    onComplete();
  };

  const handleComplete = async () => {
    if (!user) return;

    try {
      await completeMission(
        user.uid,
        currentLevel,
        mission.id,
        mission.xpReward
      );

      setShowXpReward(true);
      setTimeout(() => {
        setShowXpReward(false);
        onComplete();
      }, 1500);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const opacity = xpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={missionStyles.card}>
      <Text style={missionStyles.title}>{title}</Text>

      {content.sections?.map((section, index) => {
        if (section.type === "dialogue") {
          return (
            <View key={index} style={missionStyles.section}>
              <Text style={missionStyles.sectionTitle}>{section.title}</Text>
              {section.dialogues?.map((dialogue, i) => (
                <View key={i} style={missionStyles.dialogue}>
                  <Text style={missionStyles.speaker}>{dialogue.speaker}:</Text>
                  <Text>{dialogue.text}</Text>
                  <Text style={missionStyles.translation}>
                    {dialogue.translation}
                  </Text>
                </View>
              ))}
            </View>
          );
        }

        if (section.type === "vocabulary") {
          return (
            <View key={index} style={missionStyles.section}>
              <Text style={missionStyles.sectionTitle}>{section.title}</Text>
              {section.words?.map((word, i) => (
                <View key={i} style={missionStyles.vocabularyItem}>
                  <Text style={missionStyles.word}>{word.word}</Text>
                  <Text style={missionStyles.translation}>
                    {word.translation}
                  </Text>
                  {word.example && (
                    <Text style={missionStyles.example}>
                      Ejemplo: {word.example}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          );
        }

        if (section.type === "grammar") {
          return (
            <View key={index} style={missionStyles.section}>
              <Text style={missionStyles.sectionTitle}>{section.title}</Text>
              <Text style={missionStyles.explanation}>
                {section.explanation}
              </Text>
              {section.examples?.map((ex, i) => (
                <Text key={i} style={missionStyles.example}>
                  • {ex}
                </Text>
              ))}
            </View>
          );
        }

        return null;
      })}

      {content.practice?.type === "quiz" && (
        <Quiz quiz={content.practice} onComplete={handleQuizComplete} />
      )}

      {type === "game" && gameConfig?.type === "memory" && (
        <View style={missionStyles.gameContainer}>
          <Text style={missionStyles.gameMessage}>
            ⚠️ Juego de memoria aún no implementado.
          </Text>
          <TouchableOpacity
            onPress={handleComplete}
            style={missionStyles.completeButton}
          >
            <Text style={missionStyles.buttonText}>
              Marcar juego como completado
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showXpReward && (
        <View style={missionStyles.xpReward}>
          <Text style={missionStyles.xpText}>+{xpReward} XP!</Text>
          <Animated.View style={[missionStyles.xpReward, { opacity }]}>
            <Text style={missionStyles.xpText}>
              +{mission.xpReward || 50} XP!
            </Text>
          </Animated.View>
        </View>
      )}

      {((!content.practice && type !== "game") || quizCompleted) && (
        <TouchableOpacity
          onPress={handleComplete}
          style={missionStyles.completeButton}
        >
          <Text style={missionStyles.buttonText}>
            Continuar a siguiente misión
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Estilos específicos para el componente Mission
const missionStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
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
  dialogue: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50",
  },
  speaker: {
    fontWeight: "bold",
    color: "#2196F3",
  },
  translation: {
    fontStyle: "italic",
    color: "#666",
    marginTop: 5,
  },
  vocabularyItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  word: {
    fontWeight: "bold",
    fontSize: 16,
  },
  example: {
    color: "#666",
    marginTop: 5,
  },
  explanation: {
    marginBottom: 10,
    lineHeight: 22,
  },
  gameContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  gameMessage: {
    color: "#FF9800",
    marginBottom: 15,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  xpReward: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  xpText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 10,
  },
  xpAnimation: {
    width: 180,
    height: 180,
  },
});
