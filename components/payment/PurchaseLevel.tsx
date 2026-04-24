import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
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
  const [backendReady, setBackendReady] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const prewarmBackend = async () => {
      try {
        console.log("🔥 Prewarming backend for payment...");
        const response = await fetch(
          "https://billingual-app-back.onrender.com/wake-up",
          { signal: AbortSignal.timeout(3000) }
        );

        if (response.ok) {
          setBackendReady(true);
          console.log("✅ Backend prewarmed and ready for payment");
        }
      } catch (error) {
        console.log("⚠️ Backend prewarming failed:", error);
        // El backend aún podría estar despertando, pero lo intentaremos igual
      }
    };

    prewarmBackend();
  }, []);

 const handleSubmit = async () => {
   if (!stripe || !elements || !user) return;

   setLoading(true);

   try {
     const baseUrl = Platform.select({
       web: window.location.origin,
       default: "https://bilingualsite-ee6f8.web.app/",
     });

     // Inicializar response como null
     let response: Response | null = null;
     let attempts = 0;
     const maxAttempts = 2;

     while (attempts < maxAttempts) {
       try {
         response = await fetch(
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
             signal: AbortSignal.timeout(10000),
           }
         );
         break; // Salir del bucle si tiene éxito
       } catch (error) {
         attempts++;
         if (attempts === maxAttempts) {
           throw new Error(
             "No se pudo conectar con el servidor después de 2 intentos"
           );
         }
         await new Promise((resolve) => setTimeout(resolve, 1000));
       }
     }

     // Verificar que response no sea null
     if (!response) {
       throw new Error("No se recibió respuesta del servidor");
     }

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
       error.message ||
         "No se pudo procesar el pago. Por favor intenta nuevamente."
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

      {!backendReady && (
        <Text style={{ color: "#FFA500", marginBottom: 10, fontSize: 12 }}>
          ⚡ Preparando sistema de pagos...
        </Text>
      )}

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