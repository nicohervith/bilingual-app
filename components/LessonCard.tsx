// components/LessonCard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

type LessonCardProps = {
  lesson: {
    id: string;
    title: string;
    xpReward: number;
    objectives?: string[];
  };
  index: number;
  completed?: boolean;
  onPress?: () => void;
};

export default function LessonCard({ lesson, index, completed, onPress }: LessonCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress} // Usamos la prop onPress aquí
      style={[styles.card, completed && styles.completedCard]}
    >
      <View style={styles.header}>
        <Text style={styles.index}>{index + 1}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
      </View>
      <Text style={styles.xp}>+{lesson.xpReward} XP</Text>
      {completed && <Text style={styles.completedText}>✓ Completada</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  completedCard: {
    backgroundColor: "#f0f8ff",
    borderColor: "#4CAF50",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  index: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 12,
    color: "#3a3a3a",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  xp: {
    color: "#FFC107",
    fontWeight: "bold",
  },
  completedText: {
    color: "#4CAF50",
    marginTop: 4,
    fontSize: 12,
  },
});
