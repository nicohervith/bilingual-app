// components/ToastConfig.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, props }) => (
    <View style={styles.successToast}>
      <Ionicons name="checkmark-circle" size={24} color="white" />
      <View>
        {text1 && <Text style={styles.toastText}>{text1}</Text>}
        {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
      </View>
    </View>
  ),
  error: ({ text1, text2, props }) => (
    <View style={styles.errorToast}>
      <Ionicons name="close-circle" size={24} color="white" />
      <View>
        {text1 && <Text style={styles.toastText}>{text1}</Text>}
        {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
      </View>
    </View>
  ),
  info: ({ text1, text2, props }) => (
    <View style={styles.infoToast}>
      <Ionicons name="information-circle" size={24} color="white" />
      <View>
        {text1 && <Text style={styles.toastText}>{text1}</Text>}
        {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  errorToast: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  infoToast: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  toastText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  toastSubText: {
    color: "white",
    marginLeft: 10,
    fontSize: 14,
  },
});
