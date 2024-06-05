import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    rzpId,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      rzpId,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user orders
// @route GET api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  if (orders) return res.json(orders);
  else {
    res.status(404);
    throw new Error("Page Not found");
  }
});

// @desc Get order by id
// @route GET api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) return res.json(order);
  else {
    res.status(404);
    throw new Error("Page Not found");
  }
});

// @desc Save razorpay payment response in order
// @route PUT api/orders/:id/savepayment
// @access Private
const saveRzpPaymentDetails = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  if (order) {
    order.razorpayResponse.orderId = razorpay_order_id;
    order.razorpayResponse.paymentId = razorpay_payment_id;
    order.razorpayResponse.signature = razorpay_signature;
  } else {
    res.status(404).json({ message: "order not found" });
  }
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

// @desc Update order to paid
// @route PUT api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paymentMethod = "RAZORPAY";
  }
  const updatedOrder = await order.save();
  res.status(200).json({ updatedOrder });
});

// @desc Update order to delivered
// @route PUT api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get all orders
// @route GET api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({
    createdAt: -1,
  });
  if (orders) return res.json(orders);
  else {
    res.status(404);
    throw new Error("Page Not found");
  }
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  saveRzpPaymentDetails,
};
