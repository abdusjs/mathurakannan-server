import express from "express";
import { createSubscription } from "../controllers/payment.controller.js";

const router = express.Router();

// 🚀 Route to process the payment
router.post("/", createSubscription);

export default router;
