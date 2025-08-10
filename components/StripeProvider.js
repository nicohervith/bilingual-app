import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/stripe-react-api";

const stripePromise = loadStripe(
  "pk_test_51LAIJWIlL7CBuxtZcmAPD1sA5suFZEldPhSnwUIeq7COSXRCTuz4V19Yhp1Ziqy202co2iWzqg3jnft25AzK23dV00IAPmkVVO"
);

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
