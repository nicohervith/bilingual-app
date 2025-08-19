import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExerciseFeedback from "./ExerciseFeedback";

type Card = {
  id: string;
  content: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: "front" | "back";
  pairId: string;
};

type MemoryGameProps = {
  pairs?: Array<
    { front: string; back: string } | { image: string; word: string }
  >;
  config?: {
    pairs?: Array<
      { front: string; back: string } | { image: string; word: string }
    >;
    timeLimit?: number;
    maxAttempts?: number;
  };
  onComplete: () => void;
};

export default function MemoryGame({
  pairs: oldFormatPairs,
  config,
  onComplete,
}: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Determinar qué pares usar (formato antiguo o nuevo)
  const effectivePairs = config?.pairs || oldFormatPairs || [];

  // Inicializar el juego
  useEffect(() => {
    if (!effectivePairs || effectivePairs.length === 0) {
      console.error("No pairs provided to MemoryGame");
      return;
    }

    const initialCards: Card[] = [];

    // Procesar todos los formatos posibles
    effectivePairs.forEach((pair, index) => {
      // Formato {front, back}
      if ("front" in pair && "back" in pair) {
        initialCards.push({
          id: `front-${index}`,
          content: pair.front,
          isFlipped: false,
          isMatched: false,
          type: "front",
          pairId: `pair-${index}`,
        });
        initialCards.push({
          id: `back-${index}`,
          content: pair.back,
          isFlipped: false,
          isMatched: false,
          type: "back",
          pairId: `pair-${index}`,
        });
      }
      // Formato {image, word}
      else if ("image" in pair && "word" in pair) {
        initialCards.push({
          id: `image-${index}`,
          content: pair.word,
          image: pair.image,
          isFlipped: false,
          isMatched: false,
          type: "front",
          pairId: `pair-${index}`,
        });
        initialCards.push({
          id: `word-${index}`,
          content: pair.word,
          image: pair.image,
          isFlipped: false,
          isMatched: false,
          type: "back",
          pairId: `pair-${index}`,
        });
      }
    });

    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMoves(0);
    setGameCompleted(false);
  }, [effectivePairs]);

  // Verificar coincidencias
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Verificar si son del mismo par
      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        checkGameCompletion(newCards);
      }

      setTimeout(() => {
        const newCards = [...cards];
        if (!isMatch) {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
        }
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards]);

  const checkGameCompletion = (currentCards: Card[]) => {
    if (currentCards.every((card) => card.isMatched)) {
      setGameCompleted(true);
      setShowSuccess(true);
      setTimeout(() => onComplete(), 1500);
    }
  };

  const handleCardPress = (index: number) => {
    if (
      cards[index].isFlipped ||
      cards[index].isMatched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
    setMoves(moves + 1);
  };

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juego de Memoria</Text>
      <Text style={styles.subtitle}>
        Empareja las palabras correspondientes
      </Text>
      <Text style={styles.moves}>Movimientos: {moves}</Text>

      <View style={styles.board}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={`${card.id}-${index}`}
            onPress={() => handleCardPress(index)}
            style={[
              styles.card,
              card.isFlipped || card.isMatched
                ? styles.cardFlipped
                : styles.cardBack,
              card.isMatched && styles.cardMatched,
            ]}
          >
            {card.isFlipped || card.isMatched ? (
              card.image ? (
                <Image
                  source={{ uri: card.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.cardText}>{card.content}</Text>
              )
            ) : (
              <Text style={styles.cardBackText}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {gameCompleted && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>¡Juego completado!</Text>
          <Text style={styles.movesText}>Total de movimientos: {moves}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 120,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
  moves: {
    marginBottom: 16,
    fontWeight: "600",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  card: {
    width: 80,
    height: 100,
    margin: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBack: {
    backgroundColor: "#6200ee",
  },
  cardFlipped: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#6200ee",
  },
  cardMatched: {
    backgroundColor: "#c8e6c9",
    borderColor: "#4caf50",
  },
  cardImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBackText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  completionMessage: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
    alignItems: "center",
  },
  completionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  movesText: {
    fontSize: 16,
    color: "#666",
  },
});
