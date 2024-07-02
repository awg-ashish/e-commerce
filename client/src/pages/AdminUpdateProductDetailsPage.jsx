/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Rating from "../components/Rating";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../slices/productApiSlice";
import { ToastContainer, toast } from "react-toastify";

const AdminUpdateProductDetailsPage = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const [updateProduct] = useUpdateProductMutation();
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");

  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setBrand(product.brand || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
      setQty(product.countInStock || "");
    }
  }, [product]);

  const updateProductHandler = async () => {
    try {
      const updatedProduct = {
        id,
        productName,
        brand,
        price,
        description,
        category,
        qty,
      };
      await toast.promise(updateProduct(updatedProduct), {
        success: "Product Updated",
        loading: "Updating Product...",
        error: "Unable to update product",
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const productDeleteHandler = () => {};
  const productHideHandler = () => {};
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <div className="max-w-7xl mx-auto">
            <p className="mx-[2.5vw] p-2 mt-4 text-3xl font-medium">
              Product Details and Stats
            </p>

            <div className="flex max-w-7xl mx-auto m-1 mt-8">
              <div className="w-[30vw] mx-[2.5vw]">
                <img src={product.image} alt="" />
                Update Image
              </div>
              <div className="flex-1 mx-[2.5vw]">
                <input
                  type="text"
                  className="text-2xl font-bold border p-1 my-2 rounded w-full resize-none"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <p>
                  Brand:{" "}
                  <input
                    type="text"
                    className="border p-0.5 rounded"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </p>
                <div className="flex h-8">
                  {product.rating}
                  <span className="-mt-0.5">
                    <Rating rating={product.rating} />
                  </span>
                </div>
                <hr />
                <p className="mt-4">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    className="text-3xl border rounded p-1 mx-1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </p>
                <p className="mb-6">plus taxes</p>
                <hr />
                <p className="text-lg font-medium mb-2">About this item</p>
                <textarea
                  className="border p-1 rounded w-full h-52 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="border mr-[2.5vw] p-2 rounded-md max-w-[15vw]">
                <p className="text-sm">
                  You can set delivery date while fulfilling the order on the
                  orders page.
                </p>
                <p className="my-4">
                  Category:{" "}
                  <input
                    type="text"
                    className="border rounded p-1 w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </p>
                {product.countInStock > 0 ? (
                  <p className="text-green-700 my-2">In stock</p>
                ) : (
                  <p className="text-red-700 my-2">Out of stock</p>
                )}
                <p>
                  Available Quantity :
                  <input
                    type="number"
                    className="border rounded p-1 w-full"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </p>
                <div className="flex flex-col my-6 mx-4 items-center justify-center">
                  <button
                    className="bg-amz-yellow hover:bg-amz-yellow-dark py-0.5 my-1 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                    onClick={updateProductHandler}
                  >
                    Update Product
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-500 py-0.5 my-2 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                    onClick={productDeleteHandler}
                  >
                    Delete Product
                  </button>
                </div>
                <p>
                  <span>
                    <VisibilityOffIcon className="scale-75" />
                  </span>
                  <span>Want to hide this item from online store ?</span>
                </p>
                <hr />
                <div className="my-2 flex items-center justify-center mx-4">
                  <button
                    className="border border-black w-full py-0.5 rounded shadow-lg hover:shadow-xl transition duration-100 hover:bg-gray-100"
                    onClick={productHideHandler}
                  >
                    Hide Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminUpdateProductDetailsPage;
