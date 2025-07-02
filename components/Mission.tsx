import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialogue from "./Dialogue";
import Quiz from "./Quiz";
import Vocabulary from "./Vocabulary";

export default function Mission({
  mission,
  onComplete,
}: {
  mission: any;
  onComplete: () => void;
}) {
  const { title, content } = mission;
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    // Podrías añadir aquí lógica para guardar el progreso
    onComplete();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {content.sections.map((section: any, index: number) => {
        if (section.type === "dialogue") {
          return <Dialogue key={index} section={section} />;
        }
        if (section.type === "vocabulary") {
          return <Vocabulary key={index} section={section} />;
        }
        return null;
      })}

      {content.practice?.type === "quiz" && (
        <Quiz quiz={content.practice} onComplete={handleQuizComplete} />
      )}

      {/* Botón de completar para misiones sin quiz */}
      {(!content.practice || quizCompleted) && (
        <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
          <Text>Continuar a siguiente misión</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  completeButton: {},
});
