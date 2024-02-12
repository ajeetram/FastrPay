import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios using: npm install axios
import { useParams } from 'react-router-dom'; // Use this for handling order_id in a real-world scenario

const UPIPayment = () => {
  const [order, setOrder] = useState(null);

  // Simulate order creation, replace with your actual server-side logic
  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/checkout', {
        amount: 1000,
        currency: 'INR',
        payment_capture: 1,
      });

      setOrder(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  // Simulate UPI payment initialization
  const initiateUPIPayment = async () => {
    try {
      const response = await axios.post('YOUR_SERVER_ENDPOINT_TO_INITIATE_UPI_PAYMENT', {
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        payment_method: 'upi',
      });

      // Redirect the user to the UPI interface
      window.location = response.data.notes.payment_link;
    } catch (error) {
      console.error('Error initiating UPI payment:', error);
    }
  };

  // In a real-world scenario, you would handle order_id from the URL params
  // const { orderId } = useParams();

  return (
    <div>
      <h1>Razorpay UPI Payment</h1>
      <button onClick={createOrder}>Create Order</button>
      {order && (
        <div>
          <p>Order ID: {order.id}</p>
          <p>Amount: {order.amount / 100} INR</p>
          <button onClick={initiateUPIPayment}>Initiate UPI Payment</button>
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
