import { apiSlice } from "./apiSlice.js";
import { ORDERS_URL } from "../constants.js";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: { ...order },
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
            }),
        }),
        saveRzpPayment: builder.mutation({
            query: ({ id, ...rzpPaymentResponse }) => ({
                url: `${ORDERS_URL}/${id}/savepayment`,
                method: "PUT",
                body: rzpPaymentResponse,
            }),
        }),
        payOrder: builder.mutation({
            query: ({ id, ...paymentData }) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method: "PUT",
                body: paymentData,
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetOrdersQuery,
    usePayOrderMutation,
    useSaveRzpPaymentMutation,
} = orderApiSlice;
