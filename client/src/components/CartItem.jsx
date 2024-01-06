/* eslint-disable react/prop-types */
import { removeFromCart, addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteHandler = () => {
        dispatch(removeFromCart(cartItem._id));
    };
    const options = [];
    for (let i = 0; i < cartItem?.countInStock && i < 5; i++) {
        options.push(
            <option value={i + 1} key={i + 1}>
                {i + 1}
            </option>
        );
    }

    const quantityHandler = (e) => {
        dispatch(addToCart({ ...cartItem, qty: e.target.value }));
    };

    const productClickHandler = () => {
        navigate(`/products/${cartItem._id}`);
    };
    return (
        <div>
            <div className="flex mx-auto m-8">
                <div
                    className="w-[10vw] mx-4 hover:cursor-pointer"
                    onClick={productClickHandler}
                >
                    <img src={cartItem.image} alt="" />
                </div>
                <div className="flex-1 mx-[2.5vw]">
                    <h2
                        className="text-md font-bold hover:cursor-pointer"
                        onClick={productClickHandler}
                    >
                        {cartItem.name}
                    </h2>
                    <p className="text-sm">Brand: {cartItem.brand}</p>
                    <p className="mt-1 mb-2">
                        <span className="text-sm">$</span>
                        <span className="text-md font-medium">
                            {+(cartItem.price * cartItem.qty).toFixed(2)}
                        </span>
                        <span className="text-sm"> plus taxes</span>
                    </p>
                    <p className="text-sm py-1 pl-2 bg-gray-200 inline rounded shadow-lg border border-gray-400">
                        <span>Qty</span>
                        <select
                            className="mx-0.5 bg-gray-200 focus:outline-none"
                            defaultValue={cartItem.qty}
                            onChange={(e) => {
                                quantityHandler(e);
                            }}
                        >
                            {options}
                        </select>
                    </p>
                    <span
                        className="text-sm text-blue-800 border-l ml-4 px-2 border-gray-400 hover:underline hover:text-red-800 hover:cursor-pointer"
                        onClick={deleteHandler}
                    >
                        Delete
                    </span>
                    <span className="text-sm text-blue-800 border-l px-2 border-gray-400 hover:underline hover:text-red-800 hover:cursor-pointer">
                        Save for Later
                    </span>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default CartItem;
