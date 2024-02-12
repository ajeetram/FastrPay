import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";

export const checkout1 = async (req, res) => {
  const options1 = {
    amount: Number(req.body.amount1 * 100),
    currency: "INR",
  };
  const order1 = await instance.orders.create(options1);

  res.status(200).json({
    success: true,
    order1,
  });
};

export const checkout2 = async (req, res) => {
  const options2 = {
    amount: Number(req.body.amount2 * 100),
    currency: "INR",
  };
  const order2 = await instance.orders.create(options2);

  res.status(200).json({
    success: true,
    order2,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
