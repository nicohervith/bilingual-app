import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardType = {
  id: string;
  content: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string;
  type: "text" | "image"; // Nuevo campo para saber qué tipo de contenido mostrar
};

type PairType =
  | { front: string; back: string; id?: string }
  | { image: string; word: string; id?: string; matchId?: string }
  | { back: string; front: string; id?: string };

type MemoryGameProps = {
  pairs?: PairType[];
  config?: {
    pairs?: PairType[];
    timeLimit?: number;
    maxAttempts?: number;
  };
  onComplete: () => void;
};

const getPairType = (pair: any): string => {
  if (
    ("front" in pair && "back" in pair) ||
    ("back" in pair && "front" in pair)
  ) {
    // Si el back es una URL, es un par de imagen-texto
    if (
      pair.back &&
      typeof pair.back === "string" &&
      pair.back.startsWith("http")
    ) {
      return "imageText";
    }
    return "textText";
  }
  if ("image" in pair && "word" in pair) {
    return "imageWord";
  }
  return "unknown";
};

export default function MemoryGame({
  pairs: oldFormatPairs,
  config,
  onComplete,
}: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const effectivePairs = config?.pairs || oldFormatPairs || [];

  useEffect(() => {
    if (effectivePairs.length === 0) {
      console.error("No pairs provided to MemoryGame");
      return;
    }

    const initialCards: CardType[] = [];

    effectivePairs.forEach((pair, index) => {
      const pairType = getPairType(pair);
      const pairId = (pair as any).id || `pair-${index}`;

      switch (pairType) {
        case "imageText": // Formato: {front: "text", back: "url", id: "id"}
          const imageTextPair = pair as {
            front: string;
            back: string;
            id?: string;
          };

          // Carta de texto (front)
          initialCards.push({
            id: `text-${pairId}`,
            content: imageTextPair.front,
            isFlipped: false,
            isMatched: false,
            pairId: pairId,
            type: "text",
          });

          // Carta de imagen (back)
          initialCards.push({
            id: `image-${pairId}`,
            content: imageTextPair.front, // El contenido es el mismo texto para matching
            image: imageTextPair.back, // Pero también tiene la imagen
            isFlipped: false,
            isMatched: false,
            pairId: pairId,
            type: "image",
          });
          break;

        case "textText": // Formato: {front: "text1", back: "text2", id: "id"}
          const textTextPair = pair as {
            front: string;
            back: string;
            id?: string;
          };
          initialCards.push({
            id: `front-${pairId}`,
            content: textTextPair.front,
            isFlipped: false,
            isMatched: false,
            pairId: pairId,
            type: "text",
          });
          initialCards.push({
            id: `back-${pairId}`,
            content: textTextPair.back,
            isFlipped: false,
            isMatched: false,
            pairId: pairId,
            type: "text",
          });
          break;

        case "imageWord": // Formato: {image: "url", word: "text", id: "id", matchId: "matchId"}
          const imageWordPair = pair as {
            image: string;
            word: string;
            id?: string;
            matchId?: string;
          };
          const matchId = imageWordPair.matchId || pairId;

          initialCards.push({
            id: imageWordPair.id || `img-${index}`,
            content: imageWordPair.word,
            image: imageWordPair.image,
            isFlipped: false,
            isMatched: false,
            pairId: matchId,
            type: "image",
          });

          // Buscar el par correspondiente
          const matchingPair = effectivePairs.find(
            (p) => (p as any).id === imageWordPair.matchId
          ) as { image: string; word: string; id?: string };

          if (matchingPair) {
            initialCards.push({
              id: matchingPair.id || `word-${index}`,
              content: matchingPair.word,
              image: matchingPair.image,
              isFlipped: false,
              isMatched: false,
              pairId: matchId,
              type: "text",
            });
          }
          break;

        default:
          console.warn("Unknown pair format:", pair);
          break;
      }
    });

    // Eliminar duplicados y barajar
    const uniqueCards = initialCards.filter(
      (card, index, array) => index === array.findIndex((c) => c.id === card.id)
    );

    setCards(shuffleArray(uniqueCards));
    setFlippedCards([]);
    setMoves(0);
    setGameCompleted(false);
  }, [effectivePairs]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);

        if (newCards.every((card) => card.isMatched)) {
          setGameCompleted(true);
          setTimeout(() => onComplete(), 1500);
        }
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
  }, [flippedCards, cards, onComplete]);

  const renderCardContent = (card: CardType) => {
    if (card.type === "image" && card.image) {
      return (
        <Image
          source={{ uri: card.image }}
          style={styles.image}
          resizeMode="cover"
          onError={(e) =>
            console.log("Image loading error:", e.nativeEvent.error)
          }
        />
      );
    } else {
      return <Text style={styles.cardText}>{card.content}</Text>;
    }
  };

  if (effectivePairs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          No hay elementos para el juego de memoria
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juego de Memoria</Text>
      <Text style={styles.moves}>Movimientos: {moves}</Text>

      <View style={styles.board}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(index)}
            style={[
              styles.card,
              card.isFlipped || card.isMatched
                ? styles.cardFlipped
                : styles.cardBack,
              card.isMatched && styles.cardMatched,
            ]}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? (
              renderCardContent(card)
            ) : (
              <Text style={styles.cardBackText}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {gameCompleted && (
        <View style={styles.completionMessage}>
          <Text style={styles.completionText}>¡Juego completado!</Text>
          <Text style={styles.movesText}>Movimientos totales: {moves}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  moves: {
    fontSize: 16,
    marginBottom: 20,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  card: {
    width: 100,
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardBack: {
    backgroundColor: "#3498db",
  },
  cardFlipped: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#3498db",
  },
  cardMatched: {
    backgroundColor: "#2ecc71",
    borderColor: "#27ae60",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardBackText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  completionMessage: {
    marginTop: 20,
    alignItems: "center",
  },
  completionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  movesText: {
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});