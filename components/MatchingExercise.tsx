import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MatchingPair = {
  id: string;
  left: string;
  right: string;
  leftType: "image" | "text";
  rightType: "image" | "text";
};

type ExercisePair =
  | { from: string; to: string }
  | {
      left: string;
      right: string;
      leftType?: "image" | "text";
      rightType?: "image" | "text";
      id?: string;
    }
  | { image: string; word: string }
  | { person: string; relation: string; image?: string };

interface MatchingExerciseProps {
  pairs: ExercisePair[];
  onComplete: () => void;
  vocabulary?: any[];
  title?: string;
}

const MatchingExercise: React.FC<MatchingExerciseProps> = ({
  pairs = [],
  onComplete,
  vocabulary = [],
  title = "Empareja los elementos correspondientes",
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [leftItems, setLeftItems] = useState<MatchingPair[]>([]);
  const [rightItems, setRightItems] = useState<MatchingPair[]>([]);
  const [normalizedPairs, setNormalizedPairs] = useState<MatchingPair[]>([]);

  // Normalizar los pares a una estructura común
  useEffect(() => {
    if (!pairs || pairs.length === 0) {
      setNormalizedPairs([]);
      return;
    }

    const normalized = pairs.map((pair, index) => {
      // Caso 1: Formato {from, to}
      if ("from" in pair && "to" in pair) {
        return {
          id: `pair-${index}`,
          left: pair.from,
          right: pair.to,
          leftType: "text",
          rightType: "text",
        };
      }
      // Caso 2: Formato {image, word}
      else if ("image" in pair && "word" in pair) {
        return {
          id: `pair-${index}`,
          left: pair.image,
          right: pair.word,
          leftType: "image",
          rightType: "text",
        };
      }
      // Caso 3: Formato {left, right} (con tipos opcionales)
      else if ("left" in pair && "right" in pair) {
        return {
          id: pair.id || `pair-${index}`,
          left: pair.left,
          right: pair.right,
          leftType:
            pair.leftType || (pair.left.startsWith("http") ? "image" : "text"),
          rightType: pair.rightType || "text",
        };
      }
      // Caso 4: Formato {person, relation, image?}
      else if ("person" in pair && "relation" in pair) {
        const translation =
          vocabulary?.find(
            (v) => v.word.toLowerCase() === pair.person.toLowerCase()
          )?.translation || pair.person;

        return {
          id: `pair-${index}`,
          left: pair.image || translation,
          right: pair.relation,
          leftType: pair.image ? "image" : "text",
          rightType: "text",
        };
      }
      // Caso por defecto (no debería ocurrir)
      return {
        id: `pair-${index}`,
        left: JSON.stringify(pair),
        right: "No definido",
        leftType: "text",
        rightType: "text",
      };
    });

    setNormalizedPairs(normalized);
  }, [pairs, vocabulary]);

  // Mezclar y preparar los items para mostrar
  useEffect(() => {
    if (normalizedPairs.length === 0) return;

    const shuffled = [...normalizedPairs].sort(() => Math.random() - 0.5);
    setLeftItems(shuffled.map((pair) => ({ ...pair, id: `left-${pair.id}` })));
    setRightItems(
      shuffled.map((pair) => ({ ...pair, id: `right-${pair.id}` }))
    );

    setSelected(null);
    setMatchedPairs([]);
  }, [normalizedPairs]);

  const handleSelect = (id: string, type: "left" | "right") => {
    if (!selected) {
      setSelected(id);
    } else {
      const [selectedType, selectedId] = selected.split("-");

      // Verificar si es un par válido
      const isValidPair = normalizedPairs.some((pair) => {
        const baseId = id.replace(`${type}-`, "");
        const selectedBaseId = selected.replace(`${selectedType}-`, "");
        return baseId === selectedBaseId;
      });

      if (isValidPair) {
        setMatchedPairs((prev) => [...prev, id, selected]);

        // Verificar si todos los pares están completos
        if (matchedPairs.length + 2 === normalizedPairs.length * 2) {
          setTimeout(onComplete, 500); // Pequeño delay para feedback visual
        }
      }
      setSelected(null);
    }
  };

  if (normalizedPairs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No se encontraron elementos para emparejar
        </Text>
        <Text style={styles.debugText}>
          Formato recibido: {JSON.stringify(pairs, null, 2)}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.columnsContainer}>
        {/* Columna izquierda */}
        <View style={styles.column}>
          {leftItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                !matchedPairs.includes(item.id) && handleSelect(item.id, "left")
              }
              style={[
                styles.itemButton,
                selected === item.id && styles.selectedItem,
                matchedPairs.includes(item.id) && styles.matchedItem,
              ]}
            >
              {item.leftType === "image" ? (
                <Image source={{ uri: item.left }} style={styles.imageItem} />
              ) : (
                <Text style={styles.textItem}>{item.left}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Columna derecha */}
        <View style={styles.column}>
          {rightItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                !matchedPairs.includes(item.id) &&
                handleSelect(item.id, "right")
              }
              style={[
                styles.itemButton,
                selected === item.id && styles.selectedItem,
                matchedPairs.includes(item.id) && styles.matchedItem,
              ]}
            >
              <Text style={styles.textItem}>{item.right}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
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
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  selectedItem: {
    backgroundColor: "#d4e6ff",
  },
  matchedItem: {
    backgroundColor: "#c8e6c9",
    opacity: 0.6,
  },
  imageItem: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textItem: {
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  debugText: {
    color: "#666",
    fontSize: 12,
    marginTop: 10,
  },
});

export default MatchingExercise;
