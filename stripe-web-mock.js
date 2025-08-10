module.exports = {
  StripeProvider: ({ children }) => children,
  useStripe: () => ({
    initPaymentSheet: () => Promise.resolve(),
    presentPaymentSheet: () => Promise.resolve({ error: null }),
    confirmPayment: () => Promise.resolve({ error: null }),
  }),
  useElements: () => ({}),
  CardField: () => null,
  CardForm: () => null,
  // Exporta todos los componentes que uses
  __esModule: true,
};
