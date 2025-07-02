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
  const { title, content, type, gameConfig } = mission;
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    // Podrías añadir aquí lógica para guardar el progreso
    onComplete();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {Array.isArray(content.sections) &&
        content.sections.map((section: any, index: number) => {
          if (section.type === "dialogue") {
            return <Dialogue key={index} section={section} />;
          }
          if (section.type === "vocabulary") {
            return <Vocabulary key={index} section={section} />;
          }
          if (section.type === "grammar") {
            return (
              <View key={index}>
                <Text style={{ fontWeight: "bold" }}>{section.title}</Text>
                <Text>{section.explanation}</Text>
                {section.examples?.map((ex: string, i: number) => (
                  <Text key={i}>• {ex}</Text>
                ))}
              </View>
            );
          }
          return null;
        })}

      {/* Quiz si existe */}
      {content?.practice?.type === "quiz" && (
        <Quiz quiz={content.practice} onComplete={handleQuizComplete} />
      )}

      {/* Juegos */}
      {type === "game" && gameConfig?.type === "memory" && (
        <View>
          <Text>⚠️ Juego de memoria aún no implementado.</Text>
          <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
            <Text>Marcar juego como completado</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón por si no hay quiz o juego, o después de completarlo */}
      {((!content?.practice && type !== "game") || quizCompleted) && (
        <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
          <Text>Continuar a siguiente misión</Text>
        </TouchableOpacity>
      )}

      {/* Botón de completar para misiones sin quiz */}
     {/*  {(!content.practice || quizCompleted) && (
        <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
          <Text>Continuar a siguiente misión</Text>
        </TouchableOpacity>
      )} */}
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
