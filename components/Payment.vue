<template>
  <Modal @close="$emit('close')">
    <div
      class="bg-slate-200 p-8 rounded-xl w-full max-w-2xl"
    >
      <form>
        <h2 class="font-bold text-xl text-center">
          Buying {{ course.title }}
        </h2>
        <div
          class="mt-8 text-base width bg-white py-6 px-8 rounded shadow-md"
        >
          <div
            class="w-full flex justify-between items-center mb-8"
          >
            <label class="font-bold"> Email </label>
            <input
              class="input ml-6 focus:outline-none text-left w-full"
              type="email"
              autocomplete="email"
              v-model="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div id="card-element">
            <!-- Elements will create input elements here -->
          </div>
        </div>

        <button
          class="font-sans mt-4 w-full text-lg text-black h-12 px-16 rounded focus:outline-none focus:shadow-outline font-bold flex items-center justify-center transition bg-yellow-300 hover:bg-yellow-200 cursor-pointer"
        >
          <div>Pay $97</div>
        </button>
      </form>
    </div>
  </Modal>
</template>

<script setup>
const course = await useCourse();
const config = useRuntimeConfig();
const stripe = ref(null);
const card = ref(null);
const email = ref('');
const processingPayment = ref(false);
const success = ref(false);

const formStyle = {
  base: {
    fontSize: '16px',
    color: '#3d4852',
    '::placeholder': {
      color: '#8795a1',
    },
  },
};

const elements = computed(() => stripe.value?.elements());

const setupStripe = () => {
  stripe.value = Stripe(config.public.stripeKey);

  if (!card.value && elements.value) {
    card.value = elements.value.create('card', {
      style: formStyle,
    });
    card.value.mount('#card-element');
  }
};

const handleSubmit = async () => {
  if (email.value === '') {
    return;
  }

  processingPayment.value = true;
  let secret;

  try {
    // Create a PaymentIntent with the order amount and currency
    const response = await $fetch(
      '/api/stripe/paymentIntent',
      {
        method: 'POST',
        body: {
          email: email.value,
        },
      }
    );
    secret = response;
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await stripe.value.confirmCardPayment(
      secret,
      {
        payment_method: {
          card: card.value,
        },
        receipt_email: email.value,
      }
    );

    if (response.paymentIntent.status === 'succeeded') {
      success.value = true;
    }
  } catch (e) {
    console.log(e);
  } finally {
    processingPayment.value = false;
  }
};

useHead({
  script: [
    {
      src: 'https://js.stripe.com/v3/',
      onload: setupStripe,
    },
  ],
});
</script>
