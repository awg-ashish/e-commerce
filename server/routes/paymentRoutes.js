import express from "express";
import {
    createOrder,
    createPayment,
    verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.post("/pay", protect, createPayment);
router.post("/verify", protect, verifyPayment);

export default router;
