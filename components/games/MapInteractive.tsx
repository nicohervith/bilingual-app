// components/Games/MapInteractive.tsx
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";

interface MapInteractiveProps {
  config: {
    mapImage: string;
    scenarios: Array<{
      start: string;
      destination: string;
      correctPath: string[];
    }>;
  };
  onComplete: (isCorrect: boolean) => void;
}

const MapInteractive: React.FC<MapInteractiveProps> = ({
  config,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userPath, setUserPath] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const handleDirectionPress = (direction: string) => {
    const newPath = [...userPath, direction];
    setUserPath(newPath);

    // Verificar si coincide con el paso actual
    if (direction === config.scenarios[0].correctPath[currentStep]) {
      if (currentStep === config.scenarios[0].correctPath.length - 1) {
        onComplete(true);
        setFeedback("¡Correcto! Llegaste al destino.");
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setFeedback("Intenta nuevamente");
      setUserPath([]);
      setCurrentStep(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scenarioText}>
        {`Desde: ${config.scenarios[0].start}\nHacia: ${config.scenarios[0].destination}`}
      </Text>

      <Image
        source={{ uri: config.mapImage }}
        style={styles.mapImage}
        resizeMode="contain"
      />

      <View style={styles.directionButtons}>
        {["left", "straight", "right"].map((dir) => (
          <TouchableOpacity
            key={dir}
            style={styles.button}
            onPress={() => handleDirectionPress(dir)}
          >
            <Text>{dir}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  mapImage: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  directionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  scenarioText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  feedback: {
    marginTop: 20,
    color: "green",
    fontWeight: "bold",
  },
});

export default MapInteractive;
