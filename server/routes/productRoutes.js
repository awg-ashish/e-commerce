import express from "express";
import {
    getProducts,
    getProductsById,
    reduceProductQty,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).put(protect, reduceProductQty);
router.get("/:id", getProductsById);

export default router;
