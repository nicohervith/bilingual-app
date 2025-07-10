import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Card = {
  id: string;
  content: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type MemoryGameProps = {
  pairs: Array<{ image: string; word: string }>;
  onComplete: () => void;
};

export default function MemoryGame({ pairs, onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Inicializar el juego
  useEffect(() => {
    const initialCards: Card[] = [];

    // Duplicar las parejas para crear pares de cartas
    pairs.forEach((pair, index) => {
      initialCards.push({
        id: `image-${index}`,
        content: pair.image,
        image: pair.image,
        isFlipped: false,
        isMatched: false,
      });
      initialCards.push({
        id: `word-${index}`,
        content: pair.word,
        image: pair.image,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Barajar las cartas
    setCards(shuffleArray(initialCards));
  }, []);

  // Verificar coincidencias
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Verificar si las imágenes coinciden (ambas cartas tienen la misma imagen)
      if (firstCard.image === secondCard.image) {
        // Coincidencia encontrada
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        checkGameCompletion(newCards);
      }

      // Voltear las cartas después de un breve retraso
      setTimeout(() => {
        const newCards = [...cards];
        if (firstCard.image !== secondCard.image) {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
        }
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const checkGameCompletion = (currentCards: Card[]) => {
    if (currentCards.every((card) => card.isMatched)) {
      setGameCompleted(true);
      onComplete();
    }
  };

  const handleCardPress = (index: number) => {
    // No hacer nada si la carta ya está volteada o emparejada
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

  // Función para barajar array
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
      <Text style={styles.subtitle}>Empareja cada imagen con su palabra</Text>
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
              card.id.startsWith("image") ? (
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
