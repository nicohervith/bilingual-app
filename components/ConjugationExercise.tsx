import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

interface ConjugationExerciseProps {
  verb: string;
  pronouns: string[];
  correctConjugations: Record<string, string>;
  onComplete: () => void;
}

const ConjugationExercise: React.FC<ConjugationExerciseProps> = ({
  verb,
  pronouns,
  correctConjugations,
  onComplete,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentEditing, setCurrentEditing] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

const handleConjugate = (pronoun: string, answer: string) => {
  const updatedAnswers = { ...userAnswers, [pronoun]: answer.trim() };
  setUserAnswers(updatedAnswers);

  // Verificar completitud y corrección
  const checkAnswers = () => {
    const allFilled = pronouns.every((p) => updatedAnswers[p]?.trim());
    if (!allFilled) return;

    const isAllCorrect = pronouns.every(
      (p) =>
        updatedAnswers[p]?.toLowerCase() ===
        correctConjugations[p]?.toLowerCase()
    );

    setFeedback(
      isAllCorrect
        ? "¡Correcto! Todas las conjugaciones son correctas"
        : "Algunas conjugaciones no son correctas. Revísalas."
    );

    if (isAllCorrect) onComplete();
  };

  checkAnswers();
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conjuga el verbo "{verb}"</Text>

      {pronouns.map((pronoun) => (
        <View key={pronoun} style={styles.row}>
          <Text style={styles.pronoun}>{pronoun}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setCurrentEditing(pronoun)}
          >
            <Text>{userAnswers[pronoun] || "________"}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {currentEditing && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            Conjugación para {currentEditing}
          </Text>
          <TextInput
            style={styles.textInput}
            autoFocus
            value={userAnswers[currentEditing] || ""}
            onChangeText={(text) => {
              setUserAnswers((prev) => ({ ...prev, [currentEditing]: text }));
            }}
            placeholder={`Escribe la conjugación para ${currentEditing}`}
          />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              handleConjugate(
                currentEditing,
                userAnswers[currentEditing] || ""
              );
              setCurrentEditing(null);
            }}
          >
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
  },
  confirmButton:{
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pronoun: {
    width: 100,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "white",
  },
  modal: {
    position: "absolute",
    top: "30%",
    left: "5%",
    right: "5%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  feedback: {
    marginTop: 10,
    color: "#4CAF50",
    textAlign: "center",
  },
});

export default ConjugationExercise;
