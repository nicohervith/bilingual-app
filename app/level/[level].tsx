import Mission from "@/components/Mission";
import { getMissionsByLevel } from "@/lib/firebaseUtils";
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

export default function LevelScreen() {
  const { level } = useLocalSearchParams();
  const [allMissions, setAllMissions] = useState<any[]>([]);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (level) {
      getMissionsByLevel(level as string)
        .then((missions) => {
          setAllMissions(missions);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [level]);

  useEffect(() => {
    console.log("Current mission index:", currentMissionIndex);
  }, [currentMissionIndex]);
  

  const handleCompleteMission = () => {
    // Verificar si hay más misiones disponibles
    if (currentMissionIndex < allMissions.length - 1) {
      console.log(currentMissionIndex);
      setCurrentMissionIndex(currentMissionIndex + 1);
    } else {
      // No hay más misiones, volver al dashboard
      router.replace("/");
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
        key={currentMission.id} // <- esto forzará un nuevo render cuando cambie la misión
        mission={currentMission}
        onComplete={handleCompleteMission}
      />
    </ScrollView>
  );
}
