'use client'

import { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ userId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('/api/create-payment-intent', {
          amount: amount * 100, // converting to paisa
          currency: 'pkr',
          userId,
        });

        if (response.status === 200) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error('Error creating PaymentIntent:', error);
      }
    };

    createPaymentIntent();
  }, [amount, userId]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || !clientSecret) return;

  const cardElement = elements.getElement(CardElement);

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    },
  });

  if (result.error) {
    console.error('Payment failed:', result.error.message);
  } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
    console.log('✅ Payment succeeded:', result.paymentIntent.id);
    // Do something after success
  }
};



  return (
   <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
  <div style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '4px' }}>
   <CardElement onChange={(e) => {
    if (e.error) {
      console.error("Stripe input error:", e.error.message);
    }
  }}
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
/>
  </div>
  <button type="submit" disabled={!stripe || !clientSecret} style={{ marginTop: '12px' }}>
    Pay
  </button>
</form>

  );
};

export default CheckoutForm;
