import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice";

const AdminProductListPage = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({}, { refetchOnMountOrArgChange: true });
  const [createProduct] = useCreateProductMutation();

  const createProductHandler = async () => {
    try {
      await toast
        .promise(createProduct(), {
          success: "Product Created",
          loading: "Loading",
          error: "Error creating the product",
        })
        .unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer />
      <div className="flex items-end justify-between mb-10 mt-10">
        <h1 className="text-3xl font-medium ">All Products</h1>
        <button
          className="text-lg py-1 px-2 rounded-md hover:bg-gray-100"
          onClick={createProductHandler}
        >
          Add New
        </button>
      </div>
      <div>
        <table className="w-full border text-center block overflow-x-scroll mb-10 rounded-lg shadow-lg">
          <thead>
            <tr className="border-t border-l border-r rounded-t rounded-r bg-gray-200">
              <th className="p-4 min-w-min sticky left-0 bg-gray-200">
                Product Details
              </th>

              <th className="py-4 px-10">Price</th>
              <th className="py-4 px-10">Brand</th>
              <th className="py-4 px-10">Category</th>
              <th className="py-4 px-10">Stock</th>
              <th className="py-4 px-10">Rating</th>
              <th className="py-4 px-10">Orders</th>
              <th className="py-4 px-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td>{error?.data?.message || error?.error}</td>
              </tr>
            ) : (
              products &&
              products.map((product) => (
                <tr
                  className="border-t border-l border-r rounded-t rounded-r odd:bg-gray-50 even:bg-white"
                  key={product._id}
                >
                  <td className="min-w-[300px] sticky left-0 bg-inherit">
                    <div className="flex items-center border-r-2 p-4">
                      <img src={product.image} alt="" className="h-16" />

                      <Link
                        className="font-medium text-blue-800 hover:text-red-800 hover:underline mx-4 text-left"
                        to={`${product._id}`}
                      >
                        <span className="">{product.name}</span>
                      </Link>
                    </div>
                  </td>

                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    {product.rating}
                    <span className="text-sm mx-1">({product.numReviews})</span>
                  </td>
                  <td></td>
                  <td>
                    <Link
                      to={`${product._id}`}
                      className="text-sm text-blue-800 pr-2 border-gray-400 hover:underline hover:text-red-800 hover:cursor-pointer"
                    >
                      Edit
                    </Link>
                    <Link className="text-sm text-blue-800 pl-2 border-gray-400 hover:underline hover:text-red-800 hover:cursor-pointer">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductListPage;
