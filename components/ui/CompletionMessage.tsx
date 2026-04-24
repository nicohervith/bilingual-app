import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export type CompletionType = "success" | "perfect" | "excellent" | "custom";

interface CompletionMessageProps {
  visible: boolean;
  type?: CompletionType;
  message?: string;
  showIcon?: boolean;
  duration?: number;
  onHide?: () => void;
}

export const CompletionMessage = ({
  visible,
  type = "success",
  message,
  showIcon = true,
  duration = 1500,
  onHide,
}: CompletionMessageProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const getMessageContent = () => {
    switch (type) {
      case "perfect":
        return { text: "¡Perfecto!", icon: "checkmark-circle" };
      case "excellent":
        return { text: "¡Excelente!", icon: "star" };
      case "success":
        return { text: "¡Correcto!", icon: "checkmark" };
      case "custom":
        return { text: message || "¡Completado!", icon: "checkmark" };
      default:
        return { text: "¡Completado!", icon: "checkmark" };
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.();
      });
    }
  }, [visible, duration, fadeAnim, onHide]);

  if (!visible) return null;

  const content = getMessageContent();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.messageBox}>
        {showIcon && (
          <Ionicons
            name={content.icon as any}
            size={48}
            color="#4CAF50"
            style={styles.icon}
          />
        )}
        <Text style={styles.messageText}>{content.text}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  messageBox: {
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  icon: {
    marginBottom: 12,
  },
  messageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
  },
});
