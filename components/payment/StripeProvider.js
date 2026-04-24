import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/stripe-react-api";

const stripePromise = loadStripe(
  "pk_test_51S3hjvFHOc1l5YQO8l0CMWxS6uw0DveEVfznaJez5nL8jiG6RPdcP8ZSVH4YaLwpKUvPe0LvZiugKeesKC6GNSMB00Ed7Lc3HA"
);

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
