import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

// Define el tipo para los datos de entrada
/* interface CreateCheckoutSessionRequest {
  levelId: string;
} */

export const createCheckoutSession = functions.https.onCall(
  async (request): Promise<{ sessionId: string }> => {
    try {
      // Verifica autenticación
      if (!request.auth) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "Debes iniciar sesión para realizar esta acción"
        );
      }

      // Extrae levelId de los datos de la solicitud
      const levelId = request.data.levelId;
      if (!levelId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "El parámetro levelId es requerido"
        );
      }

      // Precios por nivel (REEMPLAZA CON TUS PRICE_IDS REALES)
      const PRICE_IDS: Record<string, string> = {
        A1: "100", // Reemplaza con tu price_id real
        A2: "120", // Reemplaza con tu price_id real
        B1: "150", // Reemplaza con tu price_id real
      };

      // Verifica que el levelId sea válido
      if (!PRICE_IDS[levelId]) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Nivel no válido"
        );
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: PRICE_IDS[levelId],
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          "https://tu-dominio.com/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://tu-dominio.com/cancel",
        metadata: {
          userId: request.auth.uid,
          levelId: levelId,
        },
      });

      return { sessionId: session.id };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error al crear la sesión de pago"
      );
    }
  }
);
