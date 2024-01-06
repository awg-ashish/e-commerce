import asyncHandler from "../middlewares/asyncHandler.js";
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

// @desc Create new razorpay order
// @route POST api/rzp
// @access Private
const createOrder = asyncHandler((req, res) => {
    const { totalPrice } = req.body;
    if (totalPrice > 0) {
        let instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        let rzpOptions = {
            amount: totalPrice * 100,
            currency: "INR",
        };
        instance.orders.create(rzpOptions, (err, order) => {
            res.status(200).json(order);
        });
    }
});

// @desc Create razorpay payment options
// @route POST api/rzp/pay
// @access Private
const createPayment = asyncHandler((req, res) => {
    const { id, amount } = req.body;
    if (id) {
        const options = {
            key: process.env.RAZORPAY_KEY,
            amount: amount,
            name: "Amazon 2.0",
            description: "Test Payment",
            order_id: id,
            theme: {
                color: "#686CFD",
            },
        };
        res.status(200).json(options);
    }
    res.status(404).json({ message: "Rzp Order Not Found" });
});

// @desc Verify razorpay payment
// @route POST api/rzp/verify
// @access Private
const verifyPayment = asyncHandler((req, res) => {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const result = validatePaymentVerification(
        { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
        signature,
        process.env.RAZORPAY_SECRET
    );
    res.json(result);
});

export { createOrder, createPayment, verifyPayment };
