import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import Mission from "@/components/Mission";
import { getMissionsByLevel } from "@/lib/firebaseUtils";

export default function LevelScreen() {
  const { level } = useLocalSearchParams();
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (level) {
      getMissionsByLevel(level as string)
        .then(setMissions)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [level]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Level {level} Missions
      </Text>

      {missions.map((mission) => (
        <Mission key={mission.id} mission={mission} />
      ))}
    </ScrollView>
  );
}
