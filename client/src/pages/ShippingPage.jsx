/* eslint-disable no-debugger */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { useUpdateMutation } from "../slices/userApiSlice";
import {
  useCreateOrderMutation,
  useSaveRzpPaymentMutation,
} from "../slices/orderApiSlice";
import {
  useCreateRzpOrderMutation,
  useCreateRzpPaymentMutation,
} from "../slices/payApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useReduceProductQtyMutation } from "../slices/productApiSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} from "../slices/cartSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
const ShippingPage = () => {
  //initialize the local states for the address form
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [showEditAddressPopup, setShowEditAddressPopup] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [disableDefaultAddress, setDisableDefaultAddress] = useState(false);

  //Step states for activating checkout steps
  const [selectAddress, setSelectAddress] = useState(false);
  const [selectPayment, setSelectPayment] = useState(false);

  // Payment Status and order states, so that once everything is complete we can redirect to the orderDetails page
  const [paymentStatus, setPaymentStatus] = useState({});
  const [order, setOrder] = useState({});

  //get the redux state
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cart = useSelector((state) => state.cart);

  //get the update method from userApiSlice
  const [update] = useUpdateMutation();
  //get the createOrder method from orderApiSlice
  const [createOrder] = useCreateOrderMutation();
  const [saveRzpPayment, { isLoading: isLoadingSave }] =
    useSaveRzpPaymentMutation();

  //get the createOrder method from payApiSlice
  const [createRzpOrder] = useCreateRzpOrderMutation();
  const [createRzpPayment] = useCreateRzpPaymentMutation();

  //reduce the product quantity here if the order is COD, otherwise we will do it after payment verification
  const [reduceProductQty] = useReduceProductQtyMutation();

  //dispatch hook for updating the redux state
  const dispatch = useDispatch();

  //navigate hook for navigating after the create order
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.address.length >= 1 && !cart.shippingAddress._id) {
      userInfo.address.map((address) => {
        if (address.selected) {
          dispatch(saveShippingAddress({ ...address }));
        }
      });
    }
    if (paymentStatus.razorpay_order_id && order._id) {
      if (!isLoadingSave) {
        dispatch(clearCart(cart));
        navigate(`/orders/${order._id}`);
      }
    }
  }, [
    userInfo.address,
    dispatch,
    paymentStatus,
    cart,
    navigate,
    order,
    isLoadingSave,
  ]);

  const addAddressHandler = async () => {
    try {
      let updatedUserAddress = [...userInfo.address];
      //if the user has selected this address to be default address we need to set the selected value of all other addresses to be false
      if (defaultAddress) {
        updatedUserAddress = userInfo.address.map((item) => ({
          ...item,
          selected: false,
        }));
      }

      const res = await toast
        .promise(
          update({
            address: [
              ...updatedUserAddress,
              {
                name,
                contact,
                street,
                city,
                state,
                country,
                pinCode,
                selected: defaultAddress,
              },
            ],
          }),
          {
            pending: "Loading...",
            success: "Added successfully.",
            error: "There was an error.",
          }
        )
        .unwrap();
      dispatch(setCredentials({ ...res }));
      if (!userInfo.address.length || !cart.shippingAddress._id) {
        userInfo.address.map((address) => {
          if (address.selected) {
            dispatch(saveShippingAddress({ ...address }));
          }
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data.message);
    }
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    setDefaultAddress(false);
    setShowAddAddressPopup((prev) => !prev);
  };
  const showEditAddressHandler = (item) => {
    setShowEditAddressPopup((prev) => !prev);
    setAddressId(item._id);
    setName(item.name);
    setContact(item.contact);
    setStreet(item.street);
    setCity(item.city);
    setState(item.state);
    setCountry(item.country);
    setPinCode(item.pinCode);
    setDefaultAddress(item.selected);
    setDisableDefaultAddress(item.selected);
  };
  const showAddAddressHandler = () => {
    setShowAddAddressPopup((prev) => !prev);
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    userInfo.address.length
      ? setDefaultAddress(false)
      : setDefaultAddress(true);
  };
  const editAddressHandler = async () => {
    let selectedAddress = userInfo.address.find((item) => {
      return item._id === addressId;
    });
    let selectedAddressIndex = userInfo.address.findIndex((item) => {
      return item._id === addressId;
    });
    selectedAddress = {
      ...selectedAddress,
      name,
      contact,
      street,
      city,
      state,
      country,
      pinCode,
      selected: defaultAddress,
    };

    let address;
    //if the user has made this address as default address, we need to set selected to false for other addresses.
    if (defaultAddress) {
      address = userInfo.address.map((item) => ({
        ...item,
        selected: false,
      }));
    } else {
      address = [...userInfo.address];
    }

    address[selectedAddressIndex] = selectedAddress;

    try {
      const res = await toast
        .promise(
          update({
            address: [...address],
          }),
          {
            pending: "Loading...",
            success: "Changes Saved.",
            error: "An error has occurred.",
          }
        )
        .unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
    } catch (err) {
      console.log(err);
    }
    setName("");
    setContact("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    setDefaultAddress(false);
    setShowEditAddressPopup((prev) => !prev);
  };
  const addressDeleteHandler = async (id) => {
    const [defaultAddress] = userInfo.address.filter(
      (item) => item.selected === true
    );
    const [toDeleteAddress] = userInfo.address.filter(
      (item) => item._id === id
    );
    if (toDeleteAddress._id === defaultAddress._id) {
      toast.error("Cannot delete default address.");
      return;
    } else if (toDeleteAddress._id === cart.shippingAddress._id) {
      dispatch(saveShippingAddress({ ...defaultAddress }));
    }
    const address = userInfo.address.filter((item) => item._id != id);
    try {
      const res = await toast
        .promise(
          update({
            address: [...address],
          }),
          {
            pending: "Loading...",
            success: "Deleted.",
            error: "Error deleting...",
          }
        )
        .unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };
  const shippingAddressChangeHandler = (e) => {
    const [shippingAddress] = userInfo.address.filter(
      (item) => item._id === e.target.value
    );
    dispatch(saveShippingAddress(shippingAddress));
  };
  const placeOrderHandler = async () => {
    try {
      let rzpRes;
      if (cart.paymentMethod === "COD") {
        rzpRes = {
          id: "COD",
        };
      } else {
        rzpRes = await toast
          .promise(createRzpOrder({ totalPrice: cart.totalCost }), {
            success: "Initiating Payment...",
            pending: "Connecting to Payment Gateway",
            error: "Error connecting to Payment Gateway",
          })
          .unwrap();
      }

      const res = await toast
        .promise(
          createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsCost,
            shippingPrice: cart.shippingCost,
            taxPrice: cart.taxCost,
            totalPrice: cart.totalCost,
            rzpId: rzpRes.id,
          }),
          {
            success: "Order Created.",
            pending: "Loading...",
            error: "Error creating the order",
          }
        )
        .unwrap();

      setOrder({ ...res });
      if (rzpRes.id !== "COD") {
        const rzpOptions = await createRzpPayment(rzpRes).unwrap();
        const rzpPayOptions = {
          ...rzpOptions,
          handler: async (response) => {
            setPaymentStatus({ ...response });
            await saveRzpPayment({
              id: res._id,
              ...response,
            }).unwrap();
          },
        };
        const rzp1 = new window.Razorpay(rzpPayOptions);
        rzp1.open();
      } else {
        const reduceQty = await reduceProductQty(res.orderItems);
        if (reduceQty) {
          dispatch(clearCart(cart));
          navigate(`/orders/${res._id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-10 ${
        showEditAddressPopup || showAddAddressPopup
          ? "overflow-hidden h-[100vh]"
          : ""
      }`}
    >
      <ToastContainer />
      <div className="border-b bg-gray-100">
        <div className="absolute">Amazon</div>
        <div className="text-3xl text-center font-medium p-4">Checkout</div>
      </div>
      <div className="flex ml-10">
        <div className="pt-4 flex-1">
          <div className="">
            <h2 className="text-amz-orange-darker font-medium text-xl">
              1 &nbsp; &nbsp; Select a Delivery Address
            </h2>
            <div className="p-4 border rounded m-2 ml-8 ">
              <p className="text-lg font-medium">Your Addresses</p>
              <hr className="bg-gray-200 h-[0.5px] w-[90%] mb-4" />

              {userInfo.address.map((item) => {
                return (
                  <div
                    className={`rounded border my-0.5 ${
                      item._id === cart.shippingAddress._id
                        ? "border bg-orange-50 border-orange-200"
                        : ""
                    } p-2`}
                    key={item._id}
                  >
                    <input
                      type="radio"
                      name="selectAddress"
                      value={item._id}
                      className="ml-2"
                      checked={item._id === cart.shippingAddress._id}
                      onChange={(e) => shippingAddressChangeHandler(e)}
                    />
                    <label htmlFor="selectAddress" className="px-4">
                      <strong>{item.name}</strong>
                      {`, ${item.street}, ${item.city}, ${item.state}, ${item.country} - ${item.pinCode}. Contact: ${item.contact}`}
                    </label>
                    <span
                      className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800"
                      onClick={() => showEditAddressHandler(item)}
                    >
                      Edit Address
                    </span>
                    <span className="text-sm text-blue-800 mx-2">|</span>
                    <span
                      className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800"
                      onClick={() => addressDeleteHandler(item._id)}
                    >
                      Delete Address
                    </span>
                    {showEditAddressPopup && (
                      <div className="w-full bg-gray-900/50 absolute top-0 left-0 z-50">
                        <div className="bg-white w-1/2 shadow border opacity-100 mx-auto my-8 p-8">
                          <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">Edit address</h2>
                            <span
                              onClick={() =>
                                setShowEditAddressPopup((prev) => !prev)
                              }
                              className="p-1 hover:border-gray-300 rounded hover:cursor-pointer border border-white hover:shadow"
                            >
                              <ClearIcon />
                            </span>
                          </div>

                          <hr className="mb-6" />
                          <p className="font-medium text-sm">Country/Region</p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">
                            Enter full name
                          </p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">
                            Mobile Number
                          </p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">Pin Code</p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">
                            Area, Street, Sector, Village
                          </p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">Town/City</p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                          <p className="font-medium text-sm mt-2">State</p>
                          <input
                            type="text"
                            className="border w-full rounded my-1 p-1 mb-2"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                          <input
                            type="checkbox"
                            name="defaultAddress"
                            id=""
                            checked={defaultAddress}
                            disabled={disableDefaultAddress}
                            onChange={() => setDefaultAddress((prev) => !prev)}
                          />
                          <label htmlFor="defaultAddress" className="pl-2">
                            {disableDefaultAddress
                              ? "This is my default address"
                              : "Make this my default address"}
                          </label>
                          <button
                            className="mt-2 bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-1 w-full rounded-md enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                            onClick={editAddressHandler}
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <p
                className="text-sm text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800 inline p-4"
                onClick={showAddAddressHandler}
              >
                <span className="text-gray-300">
                  <AddIcon />
                </span>
                Add a new address
              </p>
              {showAddAddressPopup && (
                <div className="w-full bg-gray-900/75 absolute top-0 left-0 z-50">
                  <div className="bg-white w-1/2 shadow border opacity-100 mx-auto my-8 p-8">
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold">Add a new address</h2>
                      <span
                        onClick={() => setShowAddAddressPopup((prev) => !prev)}
                        className="p-1 hover:border-gray-300 rounded hover:cursor-pointer border border-white hover:shadow"
                      >
                        <ClearIcon />
                      </span>
                    </div>

                    <hr className="mb-6" />
                    <p className="font-medium text-sm">Country/Region</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">Enter full name</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">Mobile Number</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">Pin Code</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">
                      Area, Street, Sector, Village
                    </p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">Town/City</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <p className="font-medium text-sm mt-2">State</p>
                    <input
                      type="text"
                      className="border w-full rounded my-1 p-1 mb-2"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <input
                      type="checkbox"
                      name="defaultAddress"
                      checked={defaultAddress}
                      disabled={!userInfo.address.length}
                      onChange={() => setDefaultAddress((prev) => !prev)}
                    />
                    <label htmlFor="defaultAddress" className="pl-2">
                      Make this my default address
                    </label>
                    <button
                      className="mt-2 bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-1 w-full rounded-md enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                      onClick={addAddressHandler}
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {selectAddress && (
            <div>
              <h2 className="text-amz-orange-darker font-medium text-xl">
                2 &nbsp; &nbsp; Select a Payment Method
              </h2>
              <div className="p-4 border rounded m-2 ml-8">
                <p className=" text-lg font-medium">Your Payment Methods</p>
                <hr className="bg-gray-200 h-[0.5px] w-[90%] mb-4" />
                <div
                  className={`${
                    cart.paymentMethod === "RAZORPAY"
                      ? "bg-orange-50 border-orange-200"
                      : ""
                  } p-2 my-1 border rounded`}
                >
                  <input
                    type="radio"
                    name="selectPayment"
                    value="RAZORPAY"
                    className="ml-2"
                    checked={cart.paymentMethod === "RAZORPAY"}
                    onChange={() => {
                      dispatch(savePaymentMethod("RAZORPAY"));
                    }}
                  />
                  <label htmlFor="address-1" className="px-4">
                    UPI/Credit/Debit Card (via Razorpay)
                  </label>
                </div>
                <div
                  className={`${
                    cart.paymentMethod === "COD"
                      ? "bg-orange-50 border-orange-200"
                      : ""
                  } border rounded p-2 my-1`}
                >
                  <input
                    type="radio"
                    name="selectPayment"
                    value="COD"
                    className="ml-2"
                    checked={cart.paymentMethod === "COD"}
                    onChange={() => {
                      dispatch(savePaymentMethod("COD"));
                    }}
                  />
                  <label htmlFor="address-2" className="px-4">
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
          )}
          {selectAddress && selectPayment && (
            <div>
              <h2 className="text-amz-orange-darker font-medium text-xl">
                3 &nbsp; &nbsp; Review and Delivery
              </h2>
              <div className="p-4 border rounded m-2 ml-8">
                <p className="text-lg font-medium">
                  Delivery Date:{" "}
                  <span className="text-green-700 font-bold">18 Aug 2023</span>
                </p>
                <hr className="bg-gray-200 h-[0.5px] w-[90%] mb-4" />
                <div className="flex">
                  <div className="w-[70%] pr-6">
                    <p className="font-bold">Items:</p>
                    {cart.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center border rounded p-1 m-1"
                      >
                        <img src={item.image} alt="" className="h-16" />
                        <p className="flex flex-col p-2 ">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-sm">Quantity: {item.qty}</span>
                          <span className="text-sm">
                            Total Cost: ${item.price}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold">Shipping Address:</p>
                    <p>{cart.shippingAddress.name}</p>
                    <p>{cart.shippingAddress.street}</p>
                    <p>
                      {cart.shippingAddress.city},{cart.shippingAddress.state}{" "}
                    </p>
                    <p>
                      {cart.shippingAddress.country},{" "}
                      {cart.shippingAddress.pinCode}
                    </p>
                    <br />
                    <p className="font-bold">Payment Method:</p>
                    <p>
                      {cart.paymentMethod === "RAZORPAY" ? "Online" : "COD"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-[35%] h-fit">
          <div className="fixed border rounded p-4 m-2 mr-20">
            <button
              className="bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-1 w-full rounded-md enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
              disabled={!(cart.shippingAddress._id && cart.cartItems.length)}
              onClick={
                selectAddress
                  ? selectPayment
                    ? placeOrderHandler
                    : () => setSelectPayment((prev) => !prev)
                  : () => setSelectAddress((prev) => !prev)
              }
            >
              {selectAddress
                ? selectPayment
                  ? `Place Order`
                  : `Use this Payment Method`
                : `Use this Address`}
            </button>

            <p className="text-xs text-center">
              By placing your order, you agree to Amazon&apos;s privacy notice
              and conditions of use.
            </p>
            <hr className="my-4" />
            <p className="text-xl font-medium mb-4">Order Summary</p>
            <p className="text-sm flex justify-between">
              <span>Items:</span>
              <span>${cart.itemsCost}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span>Tax:</span>
              <span>${cart.taxCost}</span>
            </p>
            <p className="text-sm flex justify-between">
              <span>Shipping:</span>
              <span>${cart.shippingCost}</span>
            </p>
            <hr className="my-4" />
            <p className="text-amz-orange-darker font-bold text-xl flex justify-between">
              <span>Order Total:</span>
              <span>${cart.totalCost}</span>
            </p>
            <hr className="my-4" />
            <p className="text-green-700 font-medium inline p-1">
              <span>Your Savings : </span>
              <span>$68</span>
              <span> (24%)</span>
            </p>
            <Link
              to="/cart"
              className="flex items-center text-sm hover:cursor-pointer hover:underline hover:text-red-800 py-1"
            >
              <span>
                <ChevronLeftIcon className="scale-[70%]" />
              </span>
              <span className="-ml-1">Back to Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
