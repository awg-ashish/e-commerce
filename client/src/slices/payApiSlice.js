import { PAYMENTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const payApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRzpOrder: builder.mutation({
            query: (totalCost) => ({
                url: PAYMENTS_URL,
                method: "POST",
                body: { ...totalCost },
            }),
        }),
        createRzpPayment: builder.mutation({
            query: (rzpOrder) => ({
                url: `${PAYMENTS_URL}/pay`,
                method: "POST",
                body: { ...rzpOrder },
            }),
        }),
        verifyRzpPayment: builder.mutation({
            query: (rzpPayment) => ({
                url: `${PAYMENTS_URL}/verify`,
                method: "POST",
                body: { ...rzpPayment },
            }),
        }),
    }),
});

export const {
    useCreateRzpOrderMutation,
    useCreateRzpPaymentMutation,
    useVerifyRzpPaymentMutation,
} = payApiSlice;
