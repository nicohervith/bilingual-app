import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

type Pair = {
  from: string;
  to: string;
};

/* type MatchingExerciseProps = {
  pairs: Pair[];
  onComplete: () => void;
}; */

interface MatchingPair {
  person: string;
  relation: string;
  image?: string; // Opcional para mostrar imágenes
}

interface MatchingExerciseProps {
  pairs: MatchingPair[];
  vocabulary: any[]; // Para buscar traducciones
  onComplete: () => void;
  title?: string;
}

/* import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"; */

const MatchingExercise = ({
  pairs = [],
  onComplete,
  vocabulary = [],
}: {
  pairs: any[];
  onComplete: () => void;
  vocabulary?: any[];
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Normalizar los pares a una estructura común
  const normalizedPairs = pairs.map((pair) => {
    // Caso memory_game: { image: "a.png", word: "Dog" }
    if ("image" in pair && "word" in pair) {
      return {
        left: pair.image,
        right: pair.word,
        leftType: "image",
        rightType: "text",
      };
    }
    // Caso matching tradicional: { from: "Red", to: "Rojo" }
    else if ("from" in pair && "to" in pair) {
      return {
        left: pair.from,
        right: pair.to,
        leftType: "text",
        rightType: "text",
      };
    }
    // Caso familia: { person: "mother", relation: "parent" }
    else if ("person" in pair && "relation" in pair) {
      const translation =
        vocabulary.find(
          (v) => v.word.toLowerCase() === pair.person.toLowerCase()
        )?.translation || pair.person;
      return {
        left: pair.image || translation,
        right: pair.relation,
        leftType: pair.image ? "image" : "text",
        rightType: "text",
      };
    }
    return pair;
  });

  const handleSelect = (item: string) => {
    if (!selected) {
      setSelected(item);
    } else {
      // Verificar si es un par válido
      const isValidPair = normalizedPairs.some(
        (pair) =>
          (pair.left === selected && pair.right === item) ||
          (pair.right === selected && pair.left === item)
      );

      if (isValidPair) {
        setMatchedPairs([...matchedPairs, selected, item]);
      }
      setSelected(null);

      // Verificar si todos los pares están completos
      if (matchedPairs.length + 2 === normalizedPairs.length * 2) {
        onComplete();
      }
    }
  };

  // Extraer elementos únicos para cada columna
  const leftItems = [...new Set(normalizedPairs.map((p) => p.left))];
  const rightItems = [...new Set(normalizedPairs.map((p) => p.right))];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empareja los elementos correspondientes</Text>

      <View style={styles.columnsContainer}>
        {/* Columna izquierda */}
        <View style={styles.column}>
          {leftItems.map((item, index) => {
            const pair = normalizedPairs.find((p) => p.left === item);
            return (
              <TouchableOpacity
                key={`left-${index}`}
                onPress={() =>
                  !matchedPairs.includes(item) && handleSelect(item)
                }
                style={[
                  styles.itemButton,
                  selected === item && styles.selectedItem,
                  matchedPairs.includes(item) && styles.matchedItem,
                ]}
              >
                {pair?.leftType === "image" ? (
                  <Image source={{ uri: item }} style={styles.imageItem} />
                ) : (
                  <Text>{item}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Columna derecha */}
        <View style={styles.column}>
          {rightItems.map((item, index) => (
            <TouchableOpacity
              key={`right-${index}`}
              onPress={() => !matchedPairs.includes(item) && handleSelect(item)}
              style={[
                styles.itemButton,
                selected === item && styles.selectedItem,
                matchedPairs.includes(item) && styles.matchedItem,
              ]}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  itemButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    alignItems: "center",
    minHeight: 60,
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "#bbdefb",
  },
  matchedItem: {
    backgroundColor: "#c8e6c9",
  },
  imageItem: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default MatchingExercise;

/* const styles = StyleSheet.create({
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
 */