// import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ReactComponent as Logo } from "/public/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useLogoutMutation } from "../slices/userApiSlice.js";
import { logout } from "../slices/authSlice.js";
import { clearCart } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
const Header = () => {
    const [toggleProfileDropDown, setToggleProfileDropDown] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            dispatch(clearCart());
            dispatch(logout());
            await logoutCall().unwrap();
            navigate("/");
        } catch (err) {
            toast.error(err);
        }
    };
    return (
        <>
            <nav className="bg-amz-gray-dark">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14">
                        <Link to="/">
                            <div className="flex flex-shrink-0 items-center border border-amz-gray-dark hover:border-white h-full mx-2 p-2 h-full">
                                <Logo className="scale-[80%]" />
                                <span className="text-white rounded-md px-1 py-2 text-sm font-medium">
                                    Amazon
                                </span>
                            </div>
                        </Link>
                        <div className="text-amz-text-dark flex items-center border-amz-gray-dark hover:border-white border mx-2 p-2 h-full">
                            <span className="text-white">
                                <LocationOnIcon />
                            </span>
                            <div className="flex flex-col">
                                <span className="text-sm">Deliver To...</span>
                                <span className="text-white">
                                    {userInfo?.address?.length
                                        ? `${
                                              userInfo?.address?.filter(
                                                  (item) =>
                                                      item.selected === true
                                              )[0].city
                                          } - ${
                                              userInfo?.address?.filter(
                                                  (item) =>
                                                      item.selected === true
                                              )[0].pinCode
                                          }`
                                        : "Location"}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white text-gray-700 rounded m-3 flex flex-1">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Search..."
                                className="rounded focus:outline-none w-full text-gray-700 text-sm px-1"
                            />
                            <span className="p-1 bg-amz-orange">
                                <SearchIcon />
                            </span>
                        </div>
                        <div
                            className="relative"
                            onMouseEnter={() =>
                                setToggleProfileDropDown((prev) => !prev)
                            }
                            onMouseLeave={() =>
                                setToggleProfileDropDown((prev) => !prev)
                            }
                        >
                            <Link to={userInfo ? "/" : "/login"}>
                                <div className="flex flex-col mx-2 border-amz-gray-dark hover:border-white border p-2 h-full">
                                    <span className="text-amz-text-dark text-sm">
                                        Hello{" "}
                                        {userInfo
                                            ? `${userInfo.name}!`
                                            : "Guest!"}
                                    </span>
                                    <span className="text-white">
                                        {userInfo ? (
                                            <span>
                                                Account & Lists{" "}
                                                <ArrowDropDownIcon className="scale-[80%] -ml-2" />
                                            </span>
                                        ) : (
                                            `Sign In`
                                        )}
                                    </span>
                                </div>
                            </Link>
                            {toggleProfileDropDown && userInfo && (
                                <div className=" absolute bg-white p-4 rounded right-2 flex w-max z-[100] shadow">
                                    <div className="pl-8 pr-32 border-r">
                                        <h3 className="text-base font-medium mb-4">
                                            Your Lists
                                        </h3>
                                        <Link to="/logout">
                                            <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
                                                Your Wish List
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="pl-8 pr-32">
                                        <h3 className="text-base font-medium mb-4">
                                            Your Account
                                        </h3>
                                        <Link to="/profile">
                                            <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
                                                Your Profile
                                            </p>
                                        </Link>
                                        <Link to="/orders">
                                            <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
                                                Your Orders
                                            </p>
                                        </Link>
                                        <hr className="my-4" />

                                        <p
                                            className="text-sm hover:cursor-pointer hover:underline hover:text-red-800"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to="/orders">
                            <div className="flex flex-col mx-2 border-amz-gray-dark hover:border-white border p-2 h-full">
                                <span className="text-amz-text-dark text-sm">
                                    Returns
                                </span>
                                <span className="text-white">& Orders</span>
                            </div>
                        </Link>
                        <Link
                            to="/cart"
                            className="border-amz-gray-dark hover:border-white border p-2 h-full"
                        >
                            <div className="flex flex-col">
                                <div className="relative">
                                    <span className="absolute -top-2 left-2 text-white text-[12px]">
                                        {cartItems.reduce(
                                            (totalItems, item) =>
                                                totalItems + Number(item.qty),
                                            0
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-white">
                                        <ShoppingCartIcon className="scale-125" />
                                    </span>
                                    <span className="text-white text-lg">
                                        Cart
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
