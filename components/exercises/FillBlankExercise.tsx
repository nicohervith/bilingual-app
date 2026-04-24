import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FillBlankExercise({
  questions,
  onComplete,
}: {
  questions: any[];
  onComplete: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);

    const isCorrect = option === questions[currentQuestion].answer;

    setTimeout(() => {
      if (isCorrect) {
        setCorrectAnswers((prev) => {
          const newTotal = prev + 1;

          // Si esta era la última pregunta y es correcta
          if (
            currentQuestion === questions.length - 1 &&
            newTotal === questions.length
          ) {
            onComplete();
          }

          return newTotal;
        });
      }

      // Avanzar a la siguiente pregunta
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else if (!isCorrect || correctAnswers < questions.length - 1) {
        // Finaliza aunque no todas fueron correctas
        onComplete();
      }
    }, 1000);
  };

  if (!questions || questions.length === 0 || !questions[currentQuestion]) {
    return (
      <View style={styles.container}>
        <Text>No questions available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sentence}>
        {questions[currentQuestion].sentence.replace("___", "_____")}
      </Text>
      <View style={styles.options}>
        {questions[currentQuestion].options.map((option: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === option && {
                backgroundColor:
                  option === questions[currentQuestion].answer
                    ? "#2ecc71"
                    : "#e74c3c",
              },
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  pair: {},
  optionText: {},
  option: {},
  options: {},
  sentence: {},
});
