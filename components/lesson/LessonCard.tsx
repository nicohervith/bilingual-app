// components/LessonCard.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LessonCardProps = {
  lesson: {
    id: string;
    title: string;
    xpReward: number;
    objectives?: string[];
  };
  index: number;
  onPress: () => void;
};

export default function LessonCard({
  lesson,
  index,
  onPress,
}: LessonCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.index}>{index + 1} </Text>
        <View style={styles.content}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.xp}>+{lesson.xpReward} XP</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  index: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 16,
    color: "#3a3a3a",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  xp: {
    color: "#FFC107",
    fontWeight: "bold",
    fontSize: 14,
  },
});
