/* import * as Speech from "expo-speech"; */
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PronunciationProps {
  config: {
    phrase: string;
    translation?: string;
    audioUrl?: string;
  };
  onComplete: () => void;
  isCompleted: boolean;
}

export const PronunciationGame: React.FC<PronunciationProps> = ({
  config,
  onComplete,
  isCompleted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });

  // 1. Función para Escuchar la pronunciación correcta (TTS)
  const listenCorrectPronunciation = () => {
    Speech.speak(config.phrase, {
      language: "en-US", // O el idioma de tu lección
      pitch: 1.0,
      rate: 0.9,
    });
  };

  // 2. Simulación de grabación y validación
  // En una implementación real, aquí usas Voice.onSpeechResults
  const startRecording = async () => {
    if (isCompleted) return;
    setIsRecording(true);
    setFeedback({ type: null, msg: "" });

    // SIMULACIÓN: En producción aquí activas el micrófono
    setTimeout(() => stopRecording(), 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Lógica de comparación
    validatePronunciation("hello world"); // Aquí iría el texto reconocido
  };

  const validatePronunciation = (transcript: string) => {
    const cleanOriginal = config.phrase
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .trim();
    const cleanUser = transcript.toLowerCase().trim();

    if (cleanUser === cleanOriginal) {
      setFeedback({ type: "success", msg: "¡Excelente pronunciación!" });
      onComplete();
    } else {
      setFeedback({
        type: "error",
        msg: `Dijiste: "${transcript}". Intenta de nuevo.`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Escucha y repite la frase:</Text>

      <View style={styles.phraseCard}>
        <Text style={styles.phraseText}>{config.phrase}</Text>
        {config.translation && (
          <Text style={styles.translationText}>{config.translation}</Text>
        )}

        <TouchableOpacity
          style={styles.listenButton}
          onPress={listenCorrectPronunciation}
        >
          <Ionicons name="volume-medium" size={30} color="#4A90E2" />
          <Text style={styles.listenLabel}>Escuchar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[
            styles.micButton,
            isRecording && styles.micRecording,
            isCompleted && styles.micCompleted,
          ]}
          onPressIn={startRecording}
          disabled={isCompleted}
        >
          {isRecording ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons
              name={isCompleted ? "checkmark" : "mic"}
              size={40}
              color="white"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.micHint}>
          {isRecording
            ? "Escuchando..."
            : isCompleted
            ? "Completado"
            : "Mantén para hablar"}
        </Text>
      </View>

      {feedback.msg !== "" && (
        <View
          style={[
            styles.feedbackBox,
            feedback.type === "error" ? styles.errorBox : styles.successBox,
          ]}
        >
          <Text style={styles.feedbackText}>{feedback.msg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", justifyContent: "center" },
  instructions: { fontSize: 18, marginBottom: 20, color: "#555" },
  phraseCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  phraseText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  translationText: { fontSize: 16, color: "#888", marginTop: 10 },
  listenButton: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  listenLabel: { marginLeft: 8, color: "#4A90E2", fontWeight: "600" },
  actionContainer: { marginTop: 40, alignItems: "center" },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  micRecording: { backgroundColor: "#FF4444", transform: [{ scale: 1.1 }] },
  micCompleted: { backgroundColor: "#4CAF50" },
  micHint: { marginTop: 10, color: "#666", fontWeight: "500" },
  feedbackBox: { marginTop: 20, padding: 15, borderRadius: 10, width: "100%" },
  successBox: { backgroundColor: "#E8F5E9" },
  errorBox: { backgroundColor: "#FFEBEE" },
  feedbackText: { textAlign: "center", fontWeight: "600" },
});
