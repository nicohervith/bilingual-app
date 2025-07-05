import Mission from "@/components/Mission";
import { useAuth } from "@/contexts/AuthContext";
import { getMissionsByLevel } from "@/lib/firebaseUtils";
import { completeMission } from "@/services/progressService";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MissionType } from "../../types/missionsType";

export default function LevelScreen() {
  const { level: levelId } = useLocalSearchParams();
  const [allMissions, setAllMissions] = useState<MissionType[]>([]);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    if (levelId) {
      getMissionsByLevel(levelId as string)
        .then((missions) => {
          setAllMissions(missions);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading missions:", error);
          setLoading(false);
        });
    }
  }, [levelId]);

  const handleCompleteMission = async () => {
    if (!user || !progress || !allMissions.length) return;

    const currentMission = allMissions[currentMissionIndex];

    try {
      await completeMission(
        user.uid,
        levelId as string,
        currentMission.id,
        currentMission.xpReward
      );

      // Actualizar estado local
      setProgress({
        ...progress,
        xp: progress.xp + currentMission.xpReward,
        completedMissions: {
          ...progress.completedMissions,
          [levelId as string]: [
            ...(progress.completedMissions[levelId as string] || []),
            currentMission.id,
          ],
        },
      });

      // Navegar a la siguiente misión o al dashboard
      if (currentMissionIndex < allMissions.length - 1) {
        setCurrentMissionIndex(currentMissionIndex + 1);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error completing mission:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (allMissions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No se encontraron misiones para este nivel</Text>
      </View>
    );
  }

  const currentMission = allMissions[currentMissionIndex];

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {currentMission.title} ({currentMissionIndex + 1}/{allMissions.length})
      </Text>

      <Mission
        key={currentMission.id}
        mission={currentMission}
        onComplete={handleCompleteMission}
        currentLevel={levelId as string}
      />
    </ScrollView>
  );
}
