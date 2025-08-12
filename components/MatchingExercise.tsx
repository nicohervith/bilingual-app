import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Función para mezclar un array (Fisher-Yates algorithm)
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface MatchingPair {
  left: string;
  right: string;
  leftType?: "image" | "text";
  rightType?: "image" | "text";
}

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
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);

  useEffect(() => {
    if (pairs.length === 0) return;

    const normalizedPairs = pairs.map((pair) => {
      // Normalización de pares
      if ("image" in pair && "word" in pair) {
        return {
          left: pair.image,
          right: pair.word,
          leftType: "image",
          rightType: "text",
        };
      } else if ("from" in pair && "to" in pair) {
        return {
          left: pair.from,
          right: pair.to,
          leftType: "text",
          rightType: "text",
        };
      } else if ("person" in pair && "relation" in pair) {
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

    // Mezclar y separar en columnas
    const shuffled = [...normalizedPairs].sort(() => Math.random() - 0.5);
    setLeftItems(shuffled.map((p) => p.left));
    setRightItems(shuffled.map((p) => p.right));

    // Limpiar selecciones y pares coincidentes al cambiar los pares
    setSelected(null);
    setMatchedPairs([]);
  }, [pairs]); // Solo depende de pairs

  const handleSelect = (item: string) => {
    if (!selected) {
      setSelected(item);
    } else {
      // Verificar si es un par válido
      const isValidPair = pairs.some(
        (pair) =>
          (pair.from === selected && pair.to === item) ||
          (pair.to === selected && pair.from === item) ||
          (pair.image === selected && pair.word === item) ||
          (pair.word === selected && pair.image === item)
      );

      if (isValidPair) {
        setMatchedPairs((prev) => [...prev, selected, item]);

        // Verificar si todos los pares están completos
        if (matchedPairs.length + 2 === pairs.length * 2) {
          onComplete();
        }
      }
      setSelected(null);
    }
  };

  // Obtener el tipo de cada item (para saber si mostrar imagen o texto)
  const getItemType = (item: string): "image" | "text" => {
    // Verificar si es una URL de imagen (simplificado)
    if (
      item.startsWith("http") &&
      (item.includes(".png") || item.includes(".jpg"))
    ) {
      return "image";
    }
    return "text";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empareja los elementos correspondientes</Text>

      <View style={styles.columnsContainer}>
        {/* Columna izquierda - mezclada */}
        <View style={styles.column}>
          {leftItems.map((item, index) => (
            <TouchableOpacity
              key={`left-${index}`}
              onPress={() => !matchedPairs.includes(item) && handleSelect(item)}
              style={[
                styles.itemButton,
                selected === item && styles.selectedItem,
                matchedPairs.includes(item) && styles.matchedItem,
              ]}
            >
              {getItemType(item) === "image" ? (
                <Image source={{ uri: item }} style={styles.imageItem} />
              ) : (
                <Text>{item}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Columna derecha - mezclada */}
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
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  itemButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "#d0e0ff",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  matchedItem: {
    backgroundColor: "#e0ffe0",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  imageItem: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
export default MatchingExercise;

