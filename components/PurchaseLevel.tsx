// components/PurchaseLevel.tsx
import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Toast from "react-native-toast-message";
import { httpsCallable } from "firebase/functions";

interface PurchaseLevelProps {
  levelId: string; // or number, depending on your usage
  onClose: () => void;
}
 export default function PurchaseLevel({ levelId, onClose }: PurchaseLevelProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

 /*  const stripe = useStripe(); */
 /*  const elements = useElements(); */
 /*  const [loading, setLoading] = useState(false); */

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Crear la sesión de pago
      const response = await fetch(
        "https://us-central1-TU_PROJECT_ID.cloudfunctions.net/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Si necesitas autenticación:
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
          body: JSON.stringify({ levelId }),
        }
      );

      const { sessionId } = await response.json();

      // 2. Redirigir a Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error en el pago",
        text2: error.message || "No se pudo procesar el pago",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Comprar Nivel</Text>
      <CardElement />
      <Button
        title={loading ? "Procesando..." : "Pagar"}
        onPress={handleSubmit}
        disabled={loading}
      />
      <Button title="Cancelar" onPress={onClose} color="red" />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
}



