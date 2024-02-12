import React from 'react'
import Card from './Card'
import axios from "axios";
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const seachQuery = useSearchParams()[0]

  const referenceNum = seachQuery.get("reference")

  const checkoutHandler = async (amount1, amount2) => {
    console.log(amount1, amount2);

    try {
        console.log('ref num',referenceNum);
        const {data:{order1}} = await axios.post("http://localhost:4000/api/checkout1", { amount1 })

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey");
        console.log(order1);

        const options1 = {
          key,
          amount: order1.amount1,
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

          order_id: order1.id,
          callback_url: "http://localhost:4000/api/paymentverification",
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

        const options2 = {
          key,
          amount:1000,
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
          order_id: order1.id,
          callback_url: "http://localhost:4000/api/paymentverification",
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
      
        const razor1 = new window.Razorpay(options1);
        razor1.open();
        const razor2 = new window.Razorpay(options2);
        razor2.open();

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