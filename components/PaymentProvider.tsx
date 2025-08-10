/* // components/PaymentProvider.tsx
"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode, useEffect, useState } from "react";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default function PaymentProvider({ children }: { children: ReactNode }) {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    getStripe().then(setStripe);
  }, []);

  return (
    <Elements
      stripe={stripe}
      options={{
        locale: "es",
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
          },
        ],
      }}
    >
      {children}
    </Elements>
  );
}
 */