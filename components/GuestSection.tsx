import { useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function GuestSection() {
  const router = useRouter();

  return (
    <View style={styles.guestInfo}>
      <Text style={styles.guestTitle}>Bienvenido invitado</Text>
      <Text style={styles.guestText}>
        Inicia sesión para acceder a todo el contenido
      </Text>
      <Button title="Iniciar sesión" onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  guestInfo: {
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  guestText: {
    marginBottom: 10,
    color: "#FFFFFF",
    fontFamily: "Poppins",
    fontSize: 14,
    textAlign: "center",
  },
});
