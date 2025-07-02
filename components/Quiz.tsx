// components/Quiz.tsx
import { useState } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Quiz({
  quiz,
  onComplete,
}: {
  quiz: any;
  onComplete: () => void;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (!submitted) {
      const updated = [...selectedAnswers];
      updated[questionIndex] = optionIndex;
      setSelectedAnswers(updated);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length < quiz.questions.length) {
      Alert.alert("Completa todas las preguntas antes de enviar.");
      return;
    }

    setSubmitted(true);

    let correctCount = 0;
    quiz.questions.forEach((q: any, i: number) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correctCount++;
      }
    });

    const success = correctCount >= quiz.questions.length * 0.7; // 70% correcto

    if (Platform.OS === "web") {
      if (success) {
        console.log("✅ Completado");
        onComplete();
      } else {
        alert(`Fallaste. Correctas: ${correctCount}/${quiz.questions.length}`);
      }
    } else {
      Alert.alert(
        "Resultado",
        `Respuestas correctas: ${correctCount}/${quiz.questions.length}`,
        [
          {
            text: "OK",
            onPress: () => {
              if (success) {
                console.log("✅ Completado");
                onComplete();
              }
            },
          },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>

      {quiz.questions.map((q: any, idx: number) => (
        <View key={idx} style={styles.questionBlock}>
          <Text style={styles.question}>{q.question}</Text>
          {q.options.map((option: string, optionIdx: number) => {
            const isSelected = selectedAnswers[idx] === optionIdx;
            const isCorrect = submitted && q.correctAnswer === optionIdx;
            const isWrong =
              submitted && isSelected && q.correctAnswer !== optionIdx;

            return (
              <TouchableOpacity
                key={optionIdx}
                onPress={() => handleSelect(idx, optionIdx)}
                style={[
                  styles.option,
                  isSelected && styles.selected,
                  isCorrect && styles.correct,
                  isWrong && styles.wrong,
                ]}
                disabled={submitted}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {!submitted && (
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Enviar respuestas</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  questionBlock: { marginBottom: 15 },
  question: { fontWeight: "600", marginBottom: 5 },
  option: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#eee",
    marginBottom: 5,
  },
  selected: {
    backgroundColor: "#dce775",
  },
  correct: {
    backgroundColor: "#a5d6a7",
  },
  wrong: {
    backgroundColor: "#ef9a9a",
  },
  submitButton: {
    backgroundColor: "#2196f3",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
