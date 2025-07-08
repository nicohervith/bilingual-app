import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

type Option = {
  image: string;
  isCorrect: boolean;
};

type ImageSelectionExerciseProps = {
  question: string;
  options: Option[];
  onComplete: () => void;
};

export default function ImageSelectionExercise({
  question,
  options,
  onComplete,
}: ImageSelectionExerciseProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (index: number) => {
    if (completed) return;

    setSelected(index);

    if (options[index].isCorrect) {
      setCompleted(true);
      setTimeout(onComplete, 1000); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            disabled={completed}
            style={[
              styles.option,
              selected === index && styles.selected,
              selected !== null && options[index].isCorrect && styles.correct,
              selected !== null &&
                selected === index &&
                !options[index].isCorrect &&
                styles.incorrect,
            ]}
          >
            <Image
              source={{ uri: option.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
      {completed && <Text style={styles.successText}>¡Correcto!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  question: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  option: {
    width: "48%",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  selected: {
    borderWidth: 3,
    borderColor: "#2196F3",
  },
  correct: {
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  incorrect: {
    borderWidth: 3,
    borderColor: "#F44336",
  },
  successText: {
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
});
