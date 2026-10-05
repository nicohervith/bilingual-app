import { CheckmarkIcon } from "@/components/ui/SvgIcons";
import { Reading, ReadingResult } from "@/services/readingService";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReadingRow({
  reading,
  result,
  onPress,
}: {
  reading: Reading;
  result?: ReadingResult;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.row, result && styles.rowDone]}
      onPress={onPress}
    >
      <Text style={styles.rowIcon}>📖</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{reading.title}</Text>
        <Text style={styles.rowSubtitle}>{reading.titleEs}</Text>
        <Text style={styles.rowXp}>
          {result
            ? `${result.score}/${result.total} correctas`
            : `${reading.questions.length} preguntas · +${reading.xpReward} XP`}
        </Text>
      </View>
      {result && (
        <View style={styles.check}>
          <CheckmarkIcon size={18} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  rowDone: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  rowIcon: { fontSize: 24, marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  rowSubtitle: { fontSize: 13, color: "#666", fontStyle: "italic" },
  rowXp: { fontSize: 13, color: "#FF9500", fontWeight: "600", marginTop: 2 },
  check: { backgroundColor: "#4CAF50", borderRadius: 12, padding: 4, marginLeft: 8 },
});
