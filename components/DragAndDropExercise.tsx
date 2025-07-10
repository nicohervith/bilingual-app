import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Draggable from "react-native-draggable";

const DragDropExercise = ({
  sentences = [],
  pronouns = [],
  onComplete,
}: {
  sentences: Array<{ text: string; answer: string }>;
  pronouns: Array<{ pronoun: string; translation: string }>;
  onComplete: () => void;
}) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [completed, setCompleted] = useState(false);

  const handleDrop = (sentenceIndex: number, pronoun: string) => {
    const newAnswers = { ...answers, [sentenceIndex]: pronoun };
    setAnswers(newAnswers);

    // Verificar si todas las respuestas están completas
    const allAnswered = sentences.every((_, index) => newAnswers[index]);
    if (allAnswered) {
      checkAnswers(newAnswers);
    }
  };

  const checkAnswers = (userAnswers: { [key: number]: string }) => {
    const allCorrect = sentences.every(
      (sentence, index) => userAnswers[index] === sentence.answer
    );

    if (allCorrect) {
      setCompleted(true);
      onComplete();
      Alert.alert(
        "¡Correcto!",
        "Todos los pronombres están en el lugar correcto"
      );
    } else {
      Alert.alert("Revisa tus respuestas", "Algunos pronombres no coinciden");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completa las oraciones</Text>

      {/* Área de pronombres para arrastrar */}
      <View style={styles.pronounsContainer}>
        {pronouns.map((item, index) => (
          <Draggable
            key={`drag-${index}`}
            x={50 + index * 60}
            y={0}
            renderSize={56}
            renderColor="#fff"
            renderText={item.pronoun}
            isCircle
            shouldReverse
            /* onDragRelease={(event, gestureState, bounds) => {
              // Lógica para determinar sobre qué oración se soltó
              // (implementación simplificada)
            }} */
          />
        ))}
      </View>

      {/* Oraciones para completar */}
      <View style={styles.sentencesContainer}>
        {sentences.map((sentence, index) => {
          const blank = "___";
          const parts = sentence.text.split(blank);

          return (
            <View key={`sentence-${index}`} style={styles.sentence}>
              <Text style={styles.sentenceText}>
                {parts[0]}
                <TouchableOpacity
                  style={styles.blankSpace}
                  onPress={() => {
                    if (answers[index]) {
                      // Permitir cambiar la respuesta
                      const newAnswers = { ...answers };
                      delete newAnswers[index];
                      setAnswers(newAnswers);
                    }
                  }}
                >
                  <Text style={styles.blankText}>
                    {answers[index] || blank}
                  </Text>
                </TouchableOpacity>
                {parts[1]}
              </Text>
            </View>
          );
        })}
      </View>

      {completed && (
        <Text style={styles.successText}>
          ¡Ejercicio completado correctamente!
        </Text>
      )}
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
  pronounsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    height: 80,
  },
  sentencesContainer: {
    marginTop: 10,
  },
  sentence: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  sentenceText: {
    fontSize: 16,
    lineHeight: 24,
  },
  blankSpace: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingHorizontal: 4,
    marginHorizontal: 2,
  },
  blankText: {
    color: "#2e78b7",
    fontWeight: "bold",
  },
  successText: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DragDropExercise;
