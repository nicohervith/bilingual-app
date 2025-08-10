/* import { usePayment } from "@/hooks/usePayment";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, View, Platform } from "react-native";
import { LevelId } from "@/types/types";

interface StripePaymentFormProps {
  amount: number;
  levelId: LevelId;
  onSuccess: () => void;
}

export const StripePaymentForm = ({
  amount,
  levelId,
  onSuccess,
}: StripePaymentFormProps) => {
  const { handlePayment, loading } = usePayment();

  return (
    <View>
      {Platform.OS === "web" && (
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
      )}
      <Button
        title={loading ? "Procesando..." : `Pagar $${amount}`}
        onPress={async () => {
          try {
            const success = await handlePayment(levelId, amount);
            if (success) onSuccess();
          } catch (error) {
            console.error("Payment failed:", error);
          }
        }}
        disabled={loading}
      />
    </View>
  );
};
 */