import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
        }),
        reduceProductQty: builder.mutation({
            query: (items) => ({
                url: PRODUCTS_URL,
                method: "PUT",
                body: items,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useReduceProductQtyMutation,
} = productsApiSlice;
