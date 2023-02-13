import stripe from 'stripe';
const config = useRuntimeConfig();
const Stripe = stripe(config.stripeSecret);

export default Stripe;
