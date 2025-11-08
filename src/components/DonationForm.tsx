import React, { useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DonationForm = () => {
  const [amount, setAmount] = useState<number>(100);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{type: string, text: string} | null>(null);

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Load Razorpay script
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        setMessage({ type: 'error', text: 'Failed to load Razorpay SDK' });
        setIsLoading(false);
        return;
      }

      // Create order on your server
      const { data: order } = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: amount,
        currency: 'INR',
        receipt: 'donation_' + Date.now(),
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_TEST_KEY_ID', // Add this to your .env file
        amount: order.amount,
        currency: order.currency,
        name: 'NGO Donation',
        description: 'Donation for a good cause',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on your server
            await axios.post('http://localhost:5000/api/payments/verify-payment', {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            setMessage({ type: 'success', text: 'Payment successful! Thank you for your donation.' });
          } catch (error) {
            console.error('Payment verification failed:', error);
            setMessage({ type: 'error', text: 'Payment verification failed' });
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Error processing payment' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Donation Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        onClick={displayRazorpay}
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Processing...' : `Donate ₹${amount}`}
      </button>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Secure payment powered by Razorpay
      </div>
    </div>
  );
};

export default DonationForm;
