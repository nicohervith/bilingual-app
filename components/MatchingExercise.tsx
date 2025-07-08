import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Pair = {
  from: string;
  to: string;
};

type MatchingExerciseProps = {
  pairs: Pair[];
  onComplete: () => void;
};

export default function MatchingExercise({
  pairs,
  onComplete,
}: MatchingExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const handleSelect = (word: string) => {
    if (!selected) {
      setSelected(word);
    } else {
      // Verificar si el par coincide
      const pair =
        pairs.find((p) => p.from === selected && p.to === word) ||
        pairs.find((p) => p.from === word && p.to === selected);

      if (pair) {
        setMatchedPairs([...matchedPairs, pair.from, pair.to]);
      }
      setSelected(null);

      // Verificar si todos los pares están completos
      if (matchedPairs.length + 2 === pairs.length * 2) {
        onComplete();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empareja las palabras correctas</Text>

      <View style={styles.wordsContainer}>
        {/* Palabras en inglés */}
        <View style={styles.column}>
          {pairs.map((pair, index) => (
            <TouchableOpacity
              key={`from-${index}`}
              onPress={() =>
                !matchedPairs.includes(pair.from) && handleSelect(pair.from)
              }
              style={[
                styles.wordButton,
                selected === pair.from && styles.selected,
                matchedPairs.includes(pair.from) && styles.matched,
              ]}
            >
              <Text>{pair.from}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Palabras en español */}
        <View style={styles.column}>
          {pairs.map((pair, index) => (
            <TouchableOpacity
              key={`to-${index}`}
              onPress={() =>
                !matchedPairs.includes(pair.to) && handleSelect(pair.to)
              }
              style={[
                styles.wordButton,
                selected === pair.to && styles.selected,
                matchedPairs.includes(pair.to) && styles.matched,
              ]}
            >
              <Text>{pair.to}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  wordsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  wordButton: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
    borderWidth: 1,
  },
  matched: {
    backgroundColor: "#E8F5E9",
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
});
