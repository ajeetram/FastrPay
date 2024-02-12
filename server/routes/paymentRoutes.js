import express from "express";
import {
  checkout1,checkout2,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/checkout1").post(checkout1);
router.route("/checkout2").post(checkout2);

router.route("/paymentverification").post(paymentVerification);

export default router;
