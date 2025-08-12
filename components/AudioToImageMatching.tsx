import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import ExerciseFeedback from "./ExerciseFeedback";

interface AudioToImageMatchingProps {
  config: {
    pairs: Array<{
      id: string;
      text?: string;
      matchId?: string;
      audio: string;
      image?: string;
    }>;
    mode: string;
  };
  onComplete: () => void;
}

const AudioToImageMatching: React.FC<AudioToImageMatchingProps> = ({
  config,
  onComplete,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Separar los pares en audios e imágenes
  const audioItems = config.pairs.filter((item) => item.audio);
  const imageItems = config.pairs.filter((item) => item.image);

  // Reproducir el audio actual
  const playSound = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioItems[currentIndex].audio },
        { shouldPlay: true }
      );
      setSound(newSound);
      setHasPlayed(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  // Limpiar el sonido al desmontar
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handleImageSelect = (imageId: string) => {
    if (!hasPlayed) return;

    const currentAudio = audioItems[currentIndex];
    const isCorrect = currentAudio.matchId === imageId;

    setSelectedImage(imageId);

    if (isCorrect) {
      setShowSuccess(true);
      setTimeout(() => {
        if (currentIndex < audioItems.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedImage(null);
          setHasPlayed(false);
          setShowSuccess(false);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedImage(null);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {config.mode === "audio_to_image"
          ? "Escucha y selecciona la imagen correcta"
          : "Selecciona la imagen que corresponde"}
      </Text>

      <View style={styles.audioSection}>
        <Text style={styles.audioPrompt}>
          Audio {currentIndex + 1} de {audioItems.length}
        </Text>
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          <Text style={styles.playButtonText}>▶ Reproducir Audio</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imagesContainer}>
        {imageItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.imageButton,
              selectedImage === item.id && styles.selectedImage,
              selectedImage === item.id && showSuccess && styles.correctImage,
              selectedImage === item.id && showError && styles.incorrectImage,
            ]}
            onPress={() => handleImageSelect(item.id)}
            disabled={!hasPlayed || selectedImage !== null}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      <ExerciseFeedback
        visible={showSuccess}
        message="¡Correcto!"
        type="success"
      />
      <ExerciseFeedback
        visible={showError}
        message="Inténtalo de nuevo"
        type="error"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  audioSection: {
    marginBottom: 30,
    alignItems: "center",
  },
  audioPrompt: {
    fontSize: 16,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
  },
  playButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageButton: {
    margin: 10,
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  selectedImage: {
    borderColor: "#2196F3",
  },
  correctImage: {
    borderColor: "#4CAF50",
  },
  incorrectImage: {
    borderColor: "#F44336",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AudioToImageMatching;
