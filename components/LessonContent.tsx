// components/LessonContentComponent.tsx
import { LessonProps } from "@/types/types";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function LessonContent({
  lesson,
  onComplete,
}: {
  lesson: LessonProps["lesson"];
  onComplete: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>

      {/* Renderizar vocabulario */}
      {lesson.content.vocabulary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulario</Text>
          {lesson.content.vocabulary.map((item:any, index:any) => (
            <View key={index} style={styles.vocabularyItem}>
              <Text style={styles.word}>{item.word}</Text>
              <Text style={styles.translation}>{item.translation}</Text>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Renderizar ejercicios */}
      {lesson.content.exercises && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          {/* Aquí iría la lógica para renderizar ejercicios */}
        </View>
      )}

      {/* Botón para completar lección */}
      <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
        <Text style={styles.buttonText}>Completar lección</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  completeButton: {},
  buttonText: {},
  vocabularyItem:{},
  image:{},
  word: {
    fontSize: 16,
    fontWeight: "500",
  },
  translation: {
    fontSize: 14,
    color: "#666",
  },
});
