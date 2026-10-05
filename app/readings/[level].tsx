import ReadingRow from "@/components/content/ReadingRow";
import { getUnitOrder } from "@/constants/unitOrder";
import { useAuth } from "@/contexts/AuthContext";
import {
  getCompletedReadings,
  getReadingsByLevel,
  Reading,
  ReadingResult,
} from "@/services/readingService";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ReadingsScreen() {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [completed, setCompleted] = useState<Record<string, ReadingResult>>({});
  const [loading, setLoading] = useState(true);

  // se recarga al volver de una lectura para mostrarla como completada
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const [data, done] = await Promise.all([
            getReadingsByLevel(level as string),
            user ? getCompletedReadings(user.uid) : Promise.resolve({}),
          ]);
          setReadings(data);
          setCompleted(done);
        } catch (error) {
          console.error("Error loading readings:", error);
        } finally {
          setLoading(false);
        }
      };
      load();
    }, [level, user]),
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  if (readings.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Todavía no hay lecturas para el nivel {level}.</Text>
      </View>
    );
  }

  const units = Object.values(
    readings.reduce<Record<string, { id: string; title: string; readings: Reading[] }>>(
      (acc, r) => {
        acc[r.unitId] ??= { id: r.unitId, title: r.unitTitle, readings: [] };
        acc[r.unitId].readings.push(r);
        return acc;
      },
      {},
    ),
  ).sort((a, b) => getUnitOrder(a.id, level as string) - getUnitOrder(b.id, level as string));

  const doneCount = readings.filter((r) => completed[r.id]).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lecturas {level}</Text>
      <Text style={styles.subtitle}>
        {doneCount}/{readings.length} completadas
      </Text>

      {units.map((unit) => (
        <View key={unit.id} style={styles.unitCard}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          {unit.readings.map((r) => (
            <ReadingRow
              key={r.id}
              reading={r}
              result={completed[r.id]}
              onPress={() => router.push({ pathname: "/reading/[id]", params: { id: r.id } })}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", fontFamily: "Poppins" },
  subtitle: { color: "#F3EFFF", marginBottom: 16 },
  unitCard: {
    backgroundColor: "#F3EFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  unitTitle: { fontSize: 18, fontWeight: "700", color: "#1E1B4B", marginBottom: 10 },
});
