/* eslint-disable react/prop-types */
import { useState } from "react";
import Rating from "../components/Rating";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useParams, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
    //check if this item exists in the cart
    const currentItem = cartItems.filter((item) => item._id === id)[0];
    const [qty, setQty] = useState(currentItem?.qty || 1);
    const options = [];
    for (let i = 0; i < product?.countInStock && i < 5; i++) {
        options.push(
            <option value={i + 1} key={i + 1}>
                {i + 1}
            </option>
        );
    }
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
    };
    const buyHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error?.data?.message || error?.error}</h2>
            ) : (
                <>
                    <div className="max-w-7xl mx-auto">
                        <Link to="/">
                            <p className="border mx-[2.5vw] p-2 mt-4 w-min hover:bg-gray-100">
                                <ChevronLeftIcon />
                            </p>
                        </Link>
                        <div className="flex max-w-7xl mx-auto m-1 mt-8">
                            <div className="w-[30vw] mx-[2.5vw]">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="flex-1 mx-[2.5vw]">
                                <h2 className="text-2xl font-bold">
                                    {product.name}
                                </h2>
                                <p>Brand: {product.brand}</p>
                                <div className="flex h-8">
                                    {product.rating}
                                    <span className="-mt-0.5">
                                        <Rating rating={product.rating} />
                                    </span>
                                </div>
                                <hr />
                                <p className="mt-4">
                                    <span className="text-sm">$</span>
                                    <span className="text-3xl">
                                        {product.price}
                                    </span>
                                </p>
                                <p className="mb-6">plus taxes</p>
                                <hr />
                                <p className="text-lg font-medium mb-2">
                                    About this item
                                </p>
                                <p>{product.description}</p>
                            </div>
                            <div className="border mr-[2.5vw] p-2 rounded-md">
                                <p className="mt-4">
                                    <span className="text-sm">$</span>
                                    <span className="text-3xl">
                                        {product.price}
                                    </span>
                                </p>
                                <p>Delivery by Monday 17, July</p>
                                <p className="my-4">
                                    <span>
                                        <LocationOnIcon className="scale-75" />
                                    </span>

                                    <span>Deliver to this location</span>
                                </p>
                                {product.countInStock > 0 ? (
                                    <p className="text-green-700 my-2">
                                        In stock
                                    </p>
                                ) : (
                                    <p className="text-red-700 my-2">
                                        Out of stock
                                    </p>
                                )}
                                <p>
                                    <span>Quantity</span>
                                    {product.countInStock > 0 ? (
                                        <select
                                            className="px-2 mx-2"
                                            onChange={(e) =>
                                                setQty(e.target.value)
                                            }
                                            defaultValue={currentItem?.qty}
                                        >
                                            {options}
                                        </select>
                                    ) : (
                                        ": NA"
                                    )}
                                </p>
                                <div className="flex flex-col my-6 mx-4 items-center justify-center">
                                    <button
                                        className="bg-amz-yellow hover:bg-amz-yellow-dark py-0.5 my-1 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        className="bg-amz-orange hover:bg-amz-orange-dark py-0.5 my-2 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                                        disabled={product.countInStock === 0}
                                        onClick={buyHandler}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                                <p>
                                    <span>
                                        <LockIcon className="scale-75" />
                                    </span>
                                    <span>Secure Transaction</span>
                                </p>
                                <hr />
                                <div className="my-2 flex items-center justify-center mx-4">
                                    <button className="border border-black w-full py-0.5 rounded shadow-lg hover:shadow-xl transition duration-100 hover:bg-gray-100">
                                        Add To Wish List
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

export default ProductDetailsPage;
