import { Audio } from "expo-av";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ListeningExerciseProps = {
  questions: {
    audio: string;
    options: string[];
    correctAnswer: string;
  }[];
  onComplete: () => void;
};

export default function ListeningExercise({ questions, onComplete }: ListeningExerciseProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const playSound = async (audioUri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    await sound.playAsync();
  };

  const checkAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escucha y selecciona:</Text>

      <TouchableOpacity
        onPress={() => playSound(questions[currentQuestion].audio)}
        style={styles.playButton}
      >
        <Text>🔊 Reproducir audio</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option:any, index:any) => (
          <TouchableOpacity
            key={index}
            onPress={() => checkAnswer(option)}
            style={styles.optionButton}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text>
        Progreso: {currentQuestion + 1}/{questions.length}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 12,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
});