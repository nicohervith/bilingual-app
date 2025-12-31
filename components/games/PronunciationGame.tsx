import { CompletionMessage } from "@/components/ui/CompletionMessage";
import { API_ENDPOINTS } from "@/constants/api";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

export const PronunciationGame = ({
  config,
  onComplete,
  isCompleted,
}: PronunciationGameProps) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(isCompleted);
  const [showCompletion, setShowCompletion] = useState(false);

  // --- LÓGICA DE GRABACIÓN ---
  async function startRecording() {
    try {
      if (isCompleted) return;
      setError(null);
      setLastTranscript("");
      setShowSuccess(false);

      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecordingAndSend() {
    if (!recording) return;

    try {
      setIsProcessing(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        // CONVERSIÓN A BLOB (Compatible con Web y Mobile)
        const responseAudio = await fetch(uri);
        const audioBlob = await responseAudio.blob();
        const fileToUpload = new Blob([audioBlob], { type: "audio/m4a" });

        const formData = new FormData();
        formData.append("audio", fileToUpload, "pronunciation.m4a");

        // LLAMADA A TU BACKEND
        const response = await fetch(API_ENDPOINTS.TRANSCRIBE, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setLastTranscript(data.text);
          checkPronunciation(data.text);
        } else {
          throw new Error(data.details || "Error del servidor");
        }
      }
    } catch (err) {
      setError("No se pudo procesar el audio.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }

  // --- LÓGICA DE COMPROBACIÓN (Tu normalización original) ---
  const checkPronunciation = (transcript: string) => {
    const normalize = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[?.,!]/g, "")
        .replace(/\bshe's\b/g, "she is")
        .replace(/\bhe's\b/g, "he is")
        .replace(/\bi'm\b/g, "i am")
        .replace(/\bit's\b/g, "it is")
        .replace(/\byou're\b/g, "you are")
        .replace(/\bthey're\b/g, "they are")
        .trim()
        .replace(/\s+/g, " ");
    };

    const target = normalize(config.phrase);
    const spoken = normalize(transcript);

    if (
      spoken === target ||
      spoken.includes(target) ||
      target.includes(spoken)
    ) {
      setShowSuccess(true);
      setShowCompletion(true);
      Speech.speak("Great job!", { language: "en-US" });
      setTimeout(() => onComplete(), 1500);
    } else {
      setError(`Dijiste "${transcript}". Intenta de nuevo.`);
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
          onPressIn={startRecording}
          onPressOut={stopRecordingAndSend}
          style={[
            styles.micButton,
            recording && styles.micActive,
            (isCompleted || showSuccess) && styles.micSuccess,
          ]}
          disabled={isCompleted || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Ionicons
              name={
                isCompleted || showSuccess
                  ? "checkmark"
                  : recording
                  ? "mic"
                  : "mic-outline"
              }
              size={45}
              color="white"
            />
          )}
        </TouchableOpacity>

        <Text style={[styles.status, showSuccess && styles.successText]}>
          {isProcessing
            ? "Analizando..."
            : recording
            ? "Escuchando..."
            : showSuccess
            ? "¡Perfecto!"
            : "Mantén presionado para hablar"}
        </Text>
      </View>

      {lastTranscript !== "" && !showSuccess && (
        <View style={styles.feedbackBox}>
          <Text style={styles.transcript}>Entendí: "{lastTranscript}"</Text>
        </View>
      )}

      {error && !showSuccess && <Text style={styles.errorText}>{error}</Text>}

      <CompletionMessage
        visible={showCompletion}
        type="perfect"
        duration={1200}
        onHide={() => setShowCompletion(false)}
      />
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
