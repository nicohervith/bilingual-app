/* // components/WebPaymentButton.tsx
"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "react-native";

export default function WebPaymentButton({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });

      if (error) {
        console.error(error);
        return;
      }

      // Envía el paymentMethod.id a tu backend
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount,
          currency: "usd",
        }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        title={loading ? "Procesando..." : `Pagar $${amount}`}
        onPress={handleSubmit}
        disabled={!stripe || loading}
      />
    </>
  );
}
 */