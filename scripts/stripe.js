// functions/index.js
const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createStripePaymentIntent = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required"
      );
    }

    const { amount, levelId } = data;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Stripe usa centavos
        currency: "usd",
        metadata: {
          userId: context.auth.uid,
          levelId: levelId,
        },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      throw new functions.https.HttpsError("internal", error.message);
    }
  }
);
