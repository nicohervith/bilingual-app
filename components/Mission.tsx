import { View, Text, StyleSheet } from "react-native";
import Dialogue from "./Dialogue";
import Vocabulary from "./Vocabulary";
import Quiz from "./Quiz";

export default function Mission({ mission }: { mission: any }) {
  const { title, content } = mission;

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

      {content.practice?.type === "quiz" && <Quiz quiz={content.practice} />}
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
});
