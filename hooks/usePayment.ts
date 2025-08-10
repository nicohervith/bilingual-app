/* import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebaseConfig";
import { LevelId } from "@/types/types";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Platform } from "react-native";

export const usePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (levelId: LevelId, amount: number) => {
    if (!stripe || !elements) {
      throw new Error("Stripe no está inicializado correctamente");
    }

    setLoading(true);

    try {
      // 1. Llama a tu Cloud Function
      const createPayment = httpsCallable<
        { amount: number; levelId: string },
        { clientSecret: string }
      >(functions, "createStripePayment");

      const { data } = await createPayment({ amount, levelId });

      // 2. Manejo diferente para web y móvil
      if (Platform.OS === "web") {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          data.clientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
            },
          }
        );

        if (error) throw error;
        return paymentIntent?.status === "succeeded";
      } else {
        // Lógica para móvil

      }
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading };
};

/* export const usePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (levelId: LevelId, amount: number) => {
    setLoading(true);

    try {
      // 1. Llama a tu Cloud Function
      const createPayment = httpsCallable<
        { amount: number; levelId: string },
        { clientSecret: string }
      >(functions, "createStripePayment");

      const { data } = await createPayment({ amount, levelId });

      // 2. Configura el payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Bilingual Site",
        style: "automatic",
        appearance: {
          colors: {
            primary: "#4CAF50", // Color verde
          },
        },
      });

      if (error) throw error;

      // 3. Presenta el formulario de pago
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) throw paymentError;

      return true; // Pago exitoso
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading };
};
 */ 