import express from "express";
import axios from 'axios';
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createOrder',async(req,res)=>{
  const apiKey = 'rzp_test_oy3lvoc7LBf9KM';
  const apiSecret = '87skuOi2mdCo9hzMjnmGwkRn';
  const url = 'https://api.razorpay.com/v1/orders';

  try {
    const response = await axios.post(url, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/checkout',async(req,res)=>{
  const apiKey = 'rzp_test_oy3lvoc7LBf9KM';
  const checkoutUrl = 'https://api.razorpay.com/v1/checkout/embedded';

  try {
    const response = await axios.post(checkoutUrl,req.body,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
      }
    })

    res.json(response.data);
  } catch (error) {
    console.error('Error initiating Razorpay Checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(4000, () => {
    console.log(`Server is running on http://localhost:4000`);
  });