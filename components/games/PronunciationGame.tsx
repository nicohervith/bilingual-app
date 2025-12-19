import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PronunciationGameProps {
  config: { phrase: string };
  onComplete: () => void;
  isCompleted: boolean;
}

// Importación condicional
const Voice =
  Platform.OS !== "web" ? require("@react-native-voice/voice").default : null;

export const PronunciationGame = ({
  config,
  onComplete,
  isCompleted,
}: PronunciationGameProps) => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(isCompleted);

  useEffect(() => {
    if (Platform.OS === "web" || !Voice) return;

    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (e: any) => {
      if (e.value) {
        setResults(e.value);
        checkPronunciation(e.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    if (isCompleted) return;
    setShowSuccess(false);
    setError(null);
    setResults([]);

    if (Platform.OS === "web") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError("Navegador no soportado.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setResults([text]);
        checkPronunciation(text);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      try {
        await Voice?.start("en-US");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopRecognizing = async () => {
    if (Platform.OS === "web" || !Voice) {
      setIsListening(false);
      return;
    }
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const checkPronunciation = (transcript: string) => {
    // 1. Definimos una función para limpiar y normalizar
    const normalize = (text: string) => {
      return (
        text
          .toLowerCase()
          // Eliminar puntuación
          .replace(/[?.,!]/g, "")
          // Expandir contracciones comunes
          .replace(/\bshe's\b/g, "she is")
          .replace(/\bhe's\b/g, "he is")
          .replace(/\bi'm\b/g, "i am")
          .replace(/\bit's\b/g, "it is")
          .replace(/\byou're\b/g, "you are")
          .replace(/\bthey're\b/g, "they are")
          // Convertir números básicos de dígitos a palabras (opcional pero recomendado)
          .replace(/\b25\b/g, "twenty-five")
          .replace(/\b20\b/g, "twenty")
          // Eliminar espacios múltiples
          .trim()
          .replace(/\s+/g, " ")
      );
    };

    const target = normalize(config.phrase);
    const spoken = normalize(transcript);

    console.log("DEBUG - Target:", target);
    console.log("DEBUG - Spoken:", spoken);

    if (
      spoken === target ||
      spoken.includes(target) ||
      target.includes(spoken)
    ) {
      setShowSuccess(true);
      Speech.speak("Great job!", { language: "en-US" });
      setTimeout(() => onComplete(), 1500);
    } else {
      setError(`Casi... dijiste "${transcript}"`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.phraseCard}>
        <TouchableOpacity
          style={styles.listenIconButton}
          onPress={() => Speech.speak(config.phrase, { language: "en-US" })}
        >
          <Ionicons name="volume-high" size={32} color="#4A90E2" />
          <Text style={styles.listenText}>Escuchar ejemplo</Text>
        </TouchableOpacity>

        <Text style={styles.phraseText}>{config.phrase}</Text>
      </View>

      <View style={styles.micSection}>
        <TouchableOpacity
          onLongPress={startRecognizing}
          onPressOut={stopRecognizing}
          style={[
            styles.micButton,
            isListening && styles.micActive,
            (isCompleted || showSuccess) && styles.micSuccess,
          ]}
          disabled={isCompleted}
        >
          {isListening ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Ionicons
              name={isCompleted || showSuccess ? "checkmark" : "mic"}
              size={45}
              color="white"
            />
          )}
        </TouchableOpacity>

        <Text style={[styles.status, showSuccess && styles.successText]}>
          {isListening
            ? "Escuchando..."
            : showSuccess
            ? "¡Perfecto!"
            : "Mantén presionado para hablar"}
        </Text>
      </View>

      {results.length > 0 && !showSuccess && (
        <View style={styles.feedbackBox}>
          <Text style={styles.transcript}>Entendí: "{results[0]}"</Text>
        </View>
      )}

      {error && !showSuccess && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  phraseCard: {
    backgroundColor: "#F8F9FA",
    width: "100%",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E9ECEF",
  },
  phraseText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 15,
  },
  listenIconButton: { flexDirection: "row", alignItems: "center" },
  listenText: { marginLeft: 8, color: "#4A90E2", fontWeight: "600" },
  micSection: { marginTop: 40, alignItems: "center" },
  micButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  micActive: { backgroundColor: "#EF4444", transform: [{ scale: 1.1 }] },
  micSuccess: { backgroundColor: "#4CAF50" },
  status: { marginTop: 15, fontSize: 16, color: "#6C757D", fontWeight: "600" },
  successText: { color: "#4CAF50" },
  feedbackBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E9ECEF",
    borderRadius: 10,
  },
  transcript: { color: "#495057", fontStyle: "italic" },
  errorText: { marginTop: 15, color: "#DC3545", fontWeight: "500" },
});
