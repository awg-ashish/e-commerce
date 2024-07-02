import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({
    createdAt: -1,
  });
  res.json(products);
});

// @desc Fetch a single products
// @route GET api/products/:id
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

//@desc create a new product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "New Product",
    image: "/images/sample.jpg",
    brand: "Brand",
    category: "Category",
    description: "Description",
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { productName, brand, category, description, price, qty } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = productName;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = qty;
    const updatedProduct = await product.save();
    res.json(updatedProduct.name);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export {
  getProducts,
  getProductsById,
  reduceProductQty,
  createProduct,
  updateProduct,
};
