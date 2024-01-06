import dotenv from "dotenv";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

// Simulate a cron job to remove unpaid orders
const removeUnpaidOrders = async () => {
    try {
        // Find and delete orders where isPaid is false (unpaid) created 1 day before and payment method is not cash on delivery.
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const deletedOrders = await Order.deleteMany({
            createdAt: { $lt: yesterday },
            isPaid: false,
            paymentMethod: { $ne: "CASH_ON_DELIVERY" },
        });

        // Print the number of deleted orders
        console.log(deletedOrders);
        console.log(`Removed ${deletedOrders.deletedCount} unpaid orders.`);
        process.exit();
    } catch (error) {
        console.error("Error removing unpaid orders:", error);
        process.exit(1);
    }
};

// Run the removeUnpaidOrders function
removeUnpaidOrders();
