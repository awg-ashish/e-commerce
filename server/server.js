import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT;
connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

//default API route at localhost:8000
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/rzp", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
