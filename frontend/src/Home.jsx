import React from 'react'
import Card from './Card'
import axios from "axios";

const Home = () => {

  const checkoutHandler = async (amount) => {
    console.log(amount);

    try {
        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey");
        const {data:{order}} = await axios.post("http://localhost:4000/api/checkout", { amount })

       
        console.log(order);
        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "Ajeet",
          description: "Payment",
          image: "",
          config : {
              display: {
            
                hide: [
                  {
                    method:"card",
                  },
                  {
                    method:"wallet",
                  },
                  {
                    method:"netbanking",
                  },
                  {
                    method:"paylater",
                  }
                ],
            
                sequence: ["block.code"], // The sequence in which blocks and methods should be shown
            
                preferences: {
                  show_default_blocks: true // Should Checkout show its default blocks?
                }
              }
            }, 
          callback_url: "http://localhost:4000/api/paymentverification",
          order_id: order.id,
          prefill: {
              name: "Ajeet Verma",
              email: "ajeet@gmail.com",
              contact: "1234567890"
          },
          notes: {
              "address": "IIIT Naya Raipur"
          },
          theme: {
              "color": "#121212"
          }
      };

        const razor1 = new window.Razorpay(options);
        razor1.open();
        
        
    } catch (error) {
        console.error("Error:", error);
    }
};

    return (
        <div>   
            <Card checkoutHandler={checkoutHandler} />
        </div>
    )
}

export default Home