import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  const handleSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(option.isCorrect)}
            style={styles.option}
          >
            <Image source={{ uri: option.image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  option: {
    margin: 5,
  },
  image: {
    width: 280,
    height: 230,
    objectFit: "cover",
    borderRadius: 8,
  },
});
