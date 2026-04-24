import { View, Text, StyleSheet } from "react-native";

export default function Dialogue({ section }: { section: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      {section.dialogues.map((line: any, idx: number) => (
        <View key={idx} style={styles.line}>
          <Text style={styles.speaker}>{line.speaker}:</Text>
          <Text>{line.text}</Text>
          <Text style={styles.translation}>({line.translation})</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  title: { fontWeight: "bold", marginBottom: 5 },
  line: { marginVertical: 5 },
  speaker: { fontWeight: "600" },
  translation: { color: "#666", fontStyle: "italic" },
});
