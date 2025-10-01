// components/Games/DialogueSimulation.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DialogueSimulationProps {
  config: {
    scenario: string;
    dialogues?: Array<{
      // Nueva estructura que tienes en tus lecciones
      character: string;
      text: string;
      options?: string[];
    }>;
    phrases?: {
      // Estructura antigua para mantener compatibilidad
      [role: string]: string[];
    };
  };
  onComplete: (success: boolean) => void;
}

const DialogueSimulation: React.FC<DialogueSimulationProps> = ({
  config,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState<
    Array<{ speaker: string; text: string }>
  >([]);

  // Determinar qué estructura de datos usar
  const useDialoguesStructure = !!config.dialogues;

  // Si estamos usando la estructura dialogues (nueva)
  if (useDialoguesStructure) {
    const currentDialogue = config.dialogues?.[currentStep];
    const userOptions = currentDialogue?.options || [];

    const handleOptionSelect = (option: string) => {
      // Agregar la opción seleccionada por el usuario al historial
      const userEntry = { speaker: "Tú", text: option };
      const newHistory = [...dialogueHistory, userEntry];

      // Verificar si hay siguiente diálogo
      if (currentStep < (config.dialogues?.length || 0) - 1) {
        const nextDialogue = config.dialogues?.[currentStep + 1];
        if (nextDialogue) {
          const npcEntry = {
            speaker:
              nextDialogue.character === "user" ? "Tú" : nextDialogue.character,
            text: nextDialogue.text,
          };
          newHistory.push(npcEntry);
        }
      }

      setDialogueHistory(newHistory);

      // Avanzar al siguiente paso o completar
      if (currentStep >= (config.dialogues?.length || 0) - 1) {
        onComplete(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.scenarioText}>Situación: {config.scenario}</Text>

        <View style={styles.dialogueBox}>
          {dialogueHistory.map((item, index) => (
            <View
              key={index}
              style={[
                styles.bubble,
                item.speaker === "Tú" ? styles.userBubble : styles.npcBubble,
              ]}
            >
              <Text style={styles.speakerText}>{item.speaker}:</Text>
              <Text style={styles.bubbleText}>{item.text}</Text>
            </View>
          ))}

          {/* Mostrar el diálogo actual del NPC si existe */}
          {currentDialogue && currentDialogue.character !== "user" && (
            <View style={[styles.bubble, styles.npcBubble]}>
              <Text style={styles.speakerText}>
                {currentDialogue.character}:
              </Text>
              <Text style={styles.bubbleText}>{currentDialogue.text}</Text>
            </View>
          )}
        </View>

        {userOptions.length > 0 && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Elige tu respuesta:</Text>
            {userOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {currentStep >= (config.dialogues?.length || 0) - 1 &&
          userOptions.length === 0 && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => onComplete(true)}
            >
              <Text style={styles.completeButtonText}>Continuar</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }

  // Estructura antigua (phrases) - para mantener compatibilidad
  const [currentSpeaker, setCurrentSpeaker] = useState("Waiter");

  const handleOptionSelectOld = (option: string) => {
    const newHistory = [
      ...dialogueHistory,
      { speaker: "Tú", text: option },
      {
        speaker: currentSpeaker,
        text:
          config.phrases?.[currentSpeaker]?.[currentStep + 1] || "¡Gracias!",
      },
    ];

    setDialogueHistory(newHistory);

    if (currentStep >= (config.phrases?.[currentSpeaker]?.length || 0) - 1) {
      onComplete(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scenarioText}>Situación: {config.scenario}</Text>

      <View style={styles.dialogueBox}>
        {dialogueHistory.map((item, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              item.speaker === "Tú" ? styles.userBubble : styles.npcBubble,
            ]}
          >
            <Text style={styles.speakerText}>{item.speaker}:</Text>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {currentStep < (config.phrases?.[currentSpeaker]?.length || 0) && (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Elige tu respuesta:</Text>
          {(config.phrases?.["UserOptions"] || []).map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleOptionSelectOld(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scenarioText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  dialogueBox: {
    flex: 1,
    marginBottom: 20,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  npcBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  speakerText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bubbleText: {
    fontSize: 16,
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 16,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#34C759",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DialogueSimulation;
