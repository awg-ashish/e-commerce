import { createSlice } from "@reduxjs/toolkit";
import { updateCost } from "../utils/cartUtil";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "RAZORPAY" };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id
            );
            if (existItem) {
                state.cartItems = state.cartItems.map((cartItem) =>
                    cartItem._id === item._id ? item : cartItem
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            return updateCost(state);
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem._id != itemId
            );
            return updateCost(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCost(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCost(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.shippingAddress = {};
            state.paymentMethod = "RAZORPAY";
            return updateCost(state);
        },
    },
});
export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
