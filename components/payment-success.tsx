import { useLocalSearchParams, useRouter } from "expo-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebaseConfig";

export default function PaymentSuccess() {
  const { session_id, levelId, userId } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verificando pago...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!session_id || !levelId || !userId) {
          throw new Error("Parámetros de pago incompletos");
        }

        // Verificar con el backend
        const response = await fetch(
          `https://billingual-app-back.onrender.com/verify-payment/${session_id}`
        );

        if (!response.ok) {
          throw new Error("No se pudo verificar el pago");
        }

        const paymentData = await response.json();

        if (paymentData.status === "paid") {
          // Actualizar Firebase directamente por si el webhook falló
          if (user && user.uid === userId) {
            await updateDoc(doc(db, "userProgress", user.uid), {
              [`purchasedLevels.${levelId}`]: true,
              unlockedLevels: arrayUnion(levelId),
              lastPurchase: new Date(),
            });
          }

          setMessage(`¡Pago exitoso! Nivel ${levelId} desbloqueado.`);
        } else {
          setMessage("Pago aún no confirmado. Espere unos momentos...");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setMessage("Error verificando el pago. Contacte soporte.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id, levelId, userId, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Pago Exitoso</Text>
      <Text style={styles.message}>{message}</Text>

      {!loading && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.buttonText}>Volver al Dashboard</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#495057",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
