import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch a single products
// @route GET api/products
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  else {
    res.status(404);
    throw new Error("Page Not found");
  }
});

// @desc Reduce qty of the product once the order is placed
// @route PUT api/products
// @access Private
const reduceProductQty = asyncHandler(async (req, res) => {
  console.log(req.body);
  const products = req.body;
  console.log(typeof products);
  if (products) {
    products.map(async (product) => {
      const item = await Product.findById(product._id);
      if (item.countInStock > 0) item.countInStock -= product.qty;
      const updatedItem = await item.save();
      console.log(updatedItem.countInStock);
    });
    res.json("Product reduced");
  } else {
    res.status(404);
    throw new Error("Page Not found");
  }
});

export { getProducts, getProductsById, reduceProductQty };
