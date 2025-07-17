import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

interface SentenceFormationExerciseProps {
  words: string[];
  correctSentence: string;
  onComplete: () => void;
}

const SentenceFormationExercise: React.FC<SentenceFormationExerciseProps> = ({
  words,
  correctSentence,
  onComplete,
}) => {
  const [sentence, setSentence] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>(words);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddWord = (word: string) => {
    setSentence([...sentence, word]);
    setRemainingWords(remainingWords.filter((w) => w !== word));
  };

  const handleRemoveWord = (word: string) => {
    setSentence(sentence.filter((w) => w !== word));
    setRemainingWords([...remainingWords, word]);
  };

  const handleCheck = () => {
    const userSentence = sentence.join(" ");
    if (userSentence.toLowerCase() === correctSentence.toLowerCase()) {
      setFeedback("¡Correcto! La oración está bien formada");
      onComplete();
    } else {
      setFeedback("La oración no es correcta. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forma una oración con estas palabras</Text>

      <View style={styles.sentenceContainer}>
        {sentence.map((word, index) => (
          <TouchableOpacity
            key={`${word}-${index}`}
            style={styles.word}
            onPress={() => handleRemoveWord(word)}
          >
            <Text>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.wordsContainer}>
        {remainingWords.map((word) => (
          <TouchableOpacity
            key={word}
            style={styles.word}
            onPress={() => handleAddWord(word)}
          >
            <Text>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={handleCheck}
        disabled={sentence.length === 0}
      >
        <Text style={styles.buttonText}>Comprobar</Text>
      </TouchableOpacity>

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  sentenceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  word: {
    padding: 10,
    margin: 5,
    backgroundColor: "#9365FF",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  checkButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  feedback: {
    marginTop: 10,
    color: "#4CAF50",
    textAlign: "center",
  },
});

export default SentenceFormationExercise;
