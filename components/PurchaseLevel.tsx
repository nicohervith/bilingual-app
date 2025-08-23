import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Platform, Text, View } from "react-native";

type LevelId = "A1" | "A2" | "B1";

interface PurchaseLevelProps {
  levelId: LevelId;
  onClose: () => void;
  levelPrices: Record<LevelId, number>;
}

export default function PurchaseLevel({
  levelId,
  onClose,
  levelPrices,
}: PurchaseLevelProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation(); // Hook de navegación

  const handleSubmit = async () => {
    if (!stripe || !elements || !user) return;

    setLoading(true);
 try {
      const baseUrl = Platform.select({
        web: window.location.origin,
        default: "https://bilingual-site-65404.web.app/", 
      });

      const response = await fetch(
        "https://billingual-app-back.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            levelId,
            userId: user.uid,
            successUrl: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&levelId=${levelId}&userId=${user.uid}`,
            cancelUrl: `${baseUrl}/payment-cancel`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(
        "Error en el pago",
        error.message || "No se pudo procesar el pago"
      );
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Comprar Nivel {levelId}
      </Text>

      <Text style={{ marginBottom: 15 }}>Precio: {levelPrices[levelId]}€</Text>

      <Text style={{ marginBottom: 20, color: "#666" }}>
        Acceso completo a todas las lecciones y ejercicios del nivel {levelId}
      </Text>

      <Button
        title={
          loading ? "Procesando..." : `Comprar por ${levelPrices[levelId]}€`
        }
        onPress={handleSubmit}
        disabled={loading}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="Cancelar" onPress={onClose} color="red" />
      </View>
    </View>
  );
}
