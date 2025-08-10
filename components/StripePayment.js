import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LAIJWIlL7CBuxtZcmAPD1sA5suFZEldPhSnwUIeq7COSXRCTuz4V19Yhp1Ziqy202co2iWzqg3jnft25AzK23dV00IAPmkVVO"
);

export function StripePayment() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod:", paymentMethod);
      // Envía paymentMethod.id a tu backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
    </form>
  );
}

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <StripePayment />
    </Elements>
  );
}
