import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, totalCost, shippingCost, taxCost, itemsCost } =
        useSelector((state) => state.cart);
    const totalItems = cartItems.reduce(
        (totalItems, item) => totalItems + +item.qty,
        0
    );
    const continueShoppingHandler = () => {
        navigate("/");
    };
    return (
        <div className="bg-gray-200 w-full h-full p-2 md:flex">
            <div className="bg-white m-4 p-6 flex-1 h-fit">
                <h1 className="text-2xl font-medium mb-1">Shopping Cart</h1>
                <hr />
                {cartItems.length === 0 ? (
                    <p className="mt-4">Your cart is empty</p>
                ) : (
                    <div>
                        {cartItems.map((cartItem) => (
                            <CartItem key={cartItem._id} cartItem={cartItem} />
                        ))}
                    </div>
                )}
            </div>
            <div className="md:w-[30%] flex flex-col">
                <div className="bg-white m-4  p-4">
                    {cartItems.length != 0 ? (
                        shippingCost == 0 ? (
                            <p className="text-sm text-green-700 mb-4">
                                <span>
                                    <CheckCircleIcon className="scale-[.70]" />
                                </span>
                                Your order is eligible for free shipping.
                            </p>
                        ) : (
                            <p className="text-sm text-orange-700 mb-4">
                                <span>
                                    <InfoIcon className="scale-[.70]" />
                                </span>
                                Add items worth $
                                {(1000 - +itemsCost).toFixed(2)} more to avail
                                free shipping.
                            </p>
                        )
                    ) : (
                        <p></p>
                    )}
                    <p className="text-md font-medium">
                        Subtotal ({totalItems} items):{" "}
                        <span> ${itemsCost > 0 ? itemsCost : 0}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                        GST: <span> ${taxCost > 0 ? taxCost : 0}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                        Shipping:{" "}
                        <span> ${shippingCost > 0 ? shippingCost : 0}</span>
                    </p>
                    <hr className="my-4" />
                    <h2 className="text-xl font-medium">
                        Total ({totalItems} items):{" "}
                        <span className="font-bold ">
                            {" "}
                            ${totalCost > 0 ? totalCost : 0}
                        </span>
                    </h2>
                    <Link to="/shipping">
                        <button
                            className="bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-4 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                            disabled={!Number(totalCost)}
                        >
                            Proceed to Buy
                        </button>
                    </Link>
                    <p
                        className="text-sm text-blue-800 px-2 text-center hover:underline hover:text-red-800 hover:cursor-pointer"
                        onClick={continueShoppingHandler}
                    >
                        Continue Shopping
                    </p>
                </div>
                <div className="bg-white m-4 p-4">
                    <h2 className="font-bold text-lg">Saved For Later</h2>
                    <hr className="mt-2" />
                    <p>You have not saved any item for later.</p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
