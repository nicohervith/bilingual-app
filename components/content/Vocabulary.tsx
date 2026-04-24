// components/Vocabulary.tsx
import { View, Text, StyleSheet } from "react-native";

export default function Vocabulary({ section }: { section: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      {section.words.map((word: any, idx: number) => (
        <View key={idx} style={styles.wordBlock}>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.translation}>Traducción: {word.translation}</Text>
          <Text style={styles.example}>Ejemplo: {word.example}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  title: { fontWeight: "bold", marginBottom: 5, fontSize: 16 },
  wordBlock: {
    backgroundColor: "#e0f7fa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  word: { fontSize: 16, fontWeight: "600" },
  translation: { fontStyle: "italic", color: "#555" },
  example: { color: "#333" },
});
