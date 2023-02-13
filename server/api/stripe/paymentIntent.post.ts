import stripe from './stripe';

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  // We only have one course for now, so we have the price hard-coded
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 97 * 100,
    currency: 'usd',
    metadata: {
      email,
    },
  });

  // Only return the secret
  return paymentIntent.client_secret;
});
