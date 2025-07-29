import { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

type Pair = {
  from: string;
  to: string;
};

interface MatchingPair {
  person: string;
  relation: string;
  image?: string; 
}

/* interface MatchingExerciseProps {
  pairs: MatchingPair[];
  vocabulary: any[]; // Para buscar traducciones
  onComplete: () => void;
  title?: string;
} */
interface MatchingExerciseProps {
  pairs: Array<
    | { from: string; to: string } // Formato tradicional
    | { word: string; image: string } // Formato memory game
    | { person: string; relation: string; image?: string } // Formato familia
  >;
  vocabulary: Array<{
    word: string;
    translation: string;
    image?: string;
  }>;
  onComplete: () => void;
  title?: string;
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
  /*   const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); */
  const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  // Normalizar los pares a una estructura común
  /*  const normalizedPairs = pairs.map((pair) => {
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
  }); */

  /*   const normalizedPairs = useMemo(() => {
  return pairs
    .map((pair) => {
      // Caso 1: Formato { word, image } (memory game)
      if ("word" in pair && "image" in pair) {
        const translation =
          vocabulary.find((v) => v.word === pair.word)?.translation ||
          pair.word;
        return {
          left: pair.image,
          right: translation,
          leftType: "image" as const,
          rightType: "text" as const,
        };
      }

      // Caso 2: Formato { from, to }
      if ("from" in pair && "to" in pair) {
        return {
          left: pair.from,
          right: pair.to,
          leftType: "text" as const,
          rightType: "text" as const,
        };
      }

      // Caso 3: Formato { person, relation, image? }
      if ("person" in pair && "relation" in pair) {
        return {
          left: pair.image || pair.person,
          right: pair.relation,
          leftType: pair.image ? ("image" as const) : ("text" as const),
          rightType: "text" as const,
        };
      }

      return { left: "", right: "", leftType: "text", rightType: "text" };
    })
    .filter((pair) => pair.left && pair.right); // Filtra pares inválidos
}, [pairs, vocabulary]);

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
  }; */

  const normalizedPairs = useMemo(() => {
    return pairs.map((pair) => {
      const translation =
        vocabulary.find((v) => v.word === pair.word)?.translation || pair.word;
      return {
        left: pair.image,
        right: translation,
        leftType: "image" as const,
        rightType: "text" as const,
        originalWord: pair.word,
      };
    });
  }, [pairs, vocabulary]);

  const handleSelect = (item: string, isLeft: boolean) => {
    if (!selected) {
      setSelected(item);
    } else {
      // Encuentra el par completo
      const foundPair = normalizedPairs.find(
        (p) =>
          (isLeft ? p.left === item : p.right === item) &&
          (isLeft ? p.right === selected : p.left === selected)
      );

      if (foundPair) {
        setMatchedPairs(
          new Set([...matchedPairs, foundPair.left, foundPair.right])
        );
      }
      setSelected(null);

      // Verifica si todos los pares están completos
      if (matchedPairs.size >= normalizedPairs.length * 2 - 2) {
        onComplete();
      }
    }
  };
  // Extraer elementos únicos para cada columna
  const leftItems = [...new Set(normalizedPairs.map((p) => p.left))];
  const rightItems = [...new Set(normalizedPairs.map((p) => p.right))];

  return (
    <View style={styles.container}>
     {/*  {title && <Text style={styles.title}>{title}</Text>} */}

      <View style={styles.columnsContainer}>
        {/* Columna de imágenes (izquierda) */}
        <View style={styles.column}>
          {normalizedPairs.map((pair, index) => (
            <TouchableOpacity
              key={`left-${index}`}
              onPress={() =>
                !matchedPairs.has(pair.left) && handleSelect(pair.left, true)
              }
              style={[
                styles.itemButton,
                selected === pair.left && styles.selectedItem,
                matchedPairs.has(pair.left) && styles.matchedItem,
              ]}
            >
              <Image
                source={{ uri: pair.left }}
                style={styles.imageItem}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Columna de texto (derecha) */}
        <View style={styles.column}>
          {normalizedPairs
            .sort(() => Math.random() - 0.5) // Mezcla las opciones
            .map((pair, index) => (
              <TouchableOpacity
                key={`right-${index}`}
                onPress={() =>
                  !matchedPairs.has(pair.right) &&
                  handleSelect(pair.right, false)
                }
                style={[
                  styles.itemButton,
                  selected === pair.right && styles.selectedItem,
                  matchedPairs.has(pair.right) && styles.matchedItem,
                ]}
              >
                <Text style={styles.textItem}>{pair.right}</Text>
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
  textItem:{
    
  },
});

export default MatchingExercise;
