/* // components/PaymentProcessing.tsx
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

interface PaymentProcessingRouteParams {
  sessionId: string;
  levelId: string;
  userId: string;
}

export default function PaymentProcessing() {
  const navigation = useNavigation();
  const route = useRoute();
  const { sessionId, levelId, userId } =
    route.params as PaymentProcessingRouteParams;
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "success" | "error"
  >("processing");
  const [message, setMessage] = useState("Procesando tu pago...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verificar el estado del pago con el backend
        const response = await fetch(
          `https://billingual-app-back.onrender.com/verify-payment/${sessionId}`
        );

        if (response.ok) {
          const paymentData = await response.json();

          if (paymentData.status === "paid") {
            // Pago exitoso - navegar a PaymentSuccess
            navigation.navigate("PaymentSuccess", {
              session_id: sessionId,
              levelId,
              userId,
            });
          } else {
            // Pago aún no confirmado, seguir esperando
            setTimeout(verifyPayment, 3000); // Reintentar cada 3 segundos
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("error");
        setMessage("Error verificando el pago. Contacta soporte.");
      }
    };

    // Iniciar verificación
    verifyPayment();

    // Timeout por si el pago tarda demasiado
    const timeout = setTimeout(() => {
      if (paymentStatus === "processing") {
        setPaymentStatus("error");
        setMessage(
          "El pago está tardando más de lo esperado. Verifica tu email para confirmación."
        );
      }
    }, 60000); // 60 segundos

    return () => clearTimeout(timeout);
  }, [sessionId, levelId, userId]);

  const handleRetry = () => {
    navigation.goBack();
  };

  const handleGoToDashboard = () => {
    navigation.navigate("/dashboard");
  };

  return (
    <View style={styles.container}>
      {paymentStatus === "processing" && (
        <>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.note}>
            No cierres esta pantalla hasta que se complete el proceso.
          </Text>
        </>
      )}

      {paymentStatus === "error" && (
        <>
          <Text style={styles.errorIcon}>❌</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRetry}>
            <Text style={styles.buttonText}>Intentar de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleGoToDashboard}
          >
            <Text style={styles.buttonText}>Volver al Dashboard</Text>
          </TouchableOpacity>
        </>
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
    backgroundColor: "white",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  note: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: 200,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
 */