import { Audio } from "expo-av";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ExerciseFeedback from "./ExerciseFeedback";

type AudioMatchingGameProps = {
  config: {
    items: Array<{
      audio: string;
      correctMatch: string;
    }>;
    options?: {
      imageSource: "vocabulary" | "custom";
      attemptsBeforeHint?: number;
    };
  };
  vocabulary: Array<{
    id: string;
    word: string;
    media?: {
      image?: string;
      audio?: string;
    };
  }>;
  onComplete: () => void;
};

const AudioMatchingGame: React.FC<AudioMatchingGameProps> = ({
  config,
  vocabulary,
  onComplete,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hasPlayedFirstAudio, setHasPlayedFirstAudio] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const playSound = async (audioUri: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setHasPlayedFirstAudio(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedOption(id);
    setAttempts((prev) => prev + 1);

    if (id === config.items[currentItem].correctMatch) {
      if (currentItem < config.items.length - 1) {
        setShowSuccess(true);
        setTimeout(() => {
          setCurrentItem((prev) => prev + 1);
          setSelectedOption(null);
          setAttempts(0);
          setShowHint(false);
          setShowSuccess(false);
        }, 1000);
      } else {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    } else if (
      config.options?.attemptsBeforeHint &&
      attempts >= config.options.attemptsBeforeHint - 1
    ) {
      setShowHint(true);
    }
  };

  const options = React.useMemo(() => {
    if (!vocabulary || !config?.items || currentItem >= config.items.length)
      return [];

    const currentItemId = config.items[currentItem]?.correctMatch;
    const currentItemData = vocabulary.find(
      (item) => item.id === currentItemId
    );

    if (!currentItemData) {
      console.error(`No se encontró el ítem con id: ${currentItemId}`);
      return [];
    }

    // Obtener opciones posibles (excluyendo la correcta)
    let distractors = vocabulary
      .filter(
        (item) =>
          item.id !== currentItemId &&
          item.media &&
          (item.media.image || item.word)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // 3 distractores

    // Mezclar la opción correcta con los distractores
    return [currentItemData, ...distractors].sort(() => Math.random() - 0.5);
  }, [vocabulary, config.items, currentItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escucha y selecciona</Text>

      <TouchableOpacity
        style={styles.playButton}
        onPress={() => playSound(config.items[currentItem].audio)}
      >
        <Text>🔊 Reproducir</Text>
      </TouchableOpacity>

      {showHint && (
        <Text style={styles.hint}>
          Pista:{" "}
          {
            vocabulary.find(
              (v) => v.id === config.items[currentItem].correctMatch
            )?.word
          }
        </Text>
      )}

      <View style={styles.optionsGrid}>
        {options.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.optionCard,
              selectedOption === item.id && styles.selectedOption,
              selectedOption === item.id &&
                item.id === config.items[currentItem].correctMatch &&
                styles.correctOption,
              selectedOption === item.id &&
                item.id !== config.items[currentItem].correctMatch &&
                styles.incorrectOption,
            ]}
            onPress={() => handleSelect(item.id)}
            disabled={selectedOption !== null}
          >
            {item.media?.image ? (
              <Image
                source={{ uri: item.media.image }}
                style={styles.optionImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.textOption}>
                <Text style={styles.optionText}>{item.word}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.progress}>
        {currentItem + 1}/{config.items.length}
      </Text>

      <ExerciseFeedback
        visible={showSuccess}
        message="¡Correcto!"
        type="success"
      />
      
      {currentItem === config.items.length - 1 && (
        <ExerciseFeedback
          visible={showSuccess}
          message="¡Ejercicio completado con éxito!"
          type="success"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playButton: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  optionCard: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#2196F3",
  },
  correctOption: {
    backgroundColor: "#a5d6a7",
  },
  incorrectOption: {
    backgroundColor: "#ef9a9a",
  },
  optionImage: {
    width: 80,
    height: 80,
  },
  hint: {
    fontStyle: "italic",
    color: "#757575",
    marginBottom: 15,
  },
  progress: {
    fontSize: 16,
    color: "#616161",
  },
  textOption: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  successOverlay: {
    position: "absolute",
    /* top: 0, */
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(76, 175, 80, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    height: 30,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default AudioMatchingGame;
