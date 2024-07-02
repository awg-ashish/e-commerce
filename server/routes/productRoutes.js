import express from "express";
import {
  createProduct,
  getProducts,
  getProductsById,
  reduceProductQty,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .put(protect, reduceProductQty)
  .post(protect, admin, createProduct);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct);

export default router;
