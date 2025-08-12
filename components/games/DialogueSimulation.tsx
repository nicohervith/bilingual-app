// components/Games/DialogueSimulation.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DialogueSimulationProps {
  config: {
    scenario: string;
    phrases: {
      [role: string]: string[];
    };
  };
  onComplete: (success: boolean) => void;
}

const DialogueSimulation: React.FC<DialogueSimulationProps> = ({
  config,
  onComplete,
}) => {
  const [currentSpeaker, setCurrentSpeaker] = useState("Waiter");
  const [currentStep, setCurrentStep] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState<
    Array<{ speaker: string; text: string }>
  >([]);

  const handleOptionSelect = (option: string) => {
    const newHistory = [
      ...dialogueHistory,
      { speaker: "You", text: option },
      {
        speaker: currentSpeaker,
        text: config.phrases[currentSpeaker][currentStep + 1] || "Thank you!",
      },
    ];

    setDialogueHistory(newHistory);

    if (currentStep >= config.phrases[currentSpeaker].length - 1) {
      onComplete(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scenarioText}>Scenario: {config.scenario}</Text>

      <View style={styles.dialogueBox}>
        {dialogueHistory.map((item, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              item.speaker === "You" ? styles.userBubble : styles.npcBubble,
            ]}
          >
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {currentStep < config.phrases[currentSpeaker].length && (
        <View style={styles.optionsContainer}>
          {config.phrases["UserOptions"].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelect(option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scenarioText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  dialogueBox: {
    flex: 1,
    marginBottom: 20,
  },
  bubble: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#e3f2fd",
  },
  npcBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  bubbleText: {
    fontSize: 16,
  },
  optionsContainer: {
    borderTopWidth: 1,
    paddingTop: 10,
  },
  optionButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#bbdefb",
    borderRadius: 8,
  },
});

export default DialogueSimulation;
