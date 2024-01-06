import { Link, useParams } from "react-router-dom";
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
} from "../slices/orderApiSlice";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { DateTime } from "luxon";
import { useVerifyRzpPaymentMutation } from "../slices/payApiSlice";
import { useReduceProductQtyMutation } from "../slices/productApiSlice";
import { useEffect } from "react";
const OrderDetailsPage = () => {
    const { id } = useParams();
    console.log(id);
    const { data: order, refetch, isLoading } = useGetOrderDetailsQuery(id);
    const [payOrder] = usePayOrderMutation();
    const [verifyRzpPayment, { isLoading: isPaymentVerified }] =
        useVerifyRzpPaymentMutation();
    const [reduceProductQty] = useReduceProductQtyMutation();
    useEffect(() => {
        const verifyPayment = async () => {
            if (order?.razorpayResponse?.paymentId) {
                const paymentVerified = await verifyRzpPayment({
                    razorpayOrderId: order.rzpId,
                    razorpayPaymentId: order.razorpayResponse.paymentId,
                    signature: order.razorpayResponse.signature,
                }).unwrap();
                console.log(paymentVerified);
                if (paymentVerified) {
                    const orderPaid = await payOrder({
                        id: order._id,
                        ...order.razorpayResponse,
                    }).unwrap();
                    console.log(orderPaid);
                    refetch();
                    const reduceQty = reduceProductQty(order.orderItems);
                    console.log(reduceQty);
                }
            }
        };
        if (!order?.isPaid) {
            verifyPayment();
        }
    }, [order, payOrder, verifyRzpPayment, reduceProductQty, refetch]);
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-medium mb-4 mt-10 mx-2">
                Order Details
            </h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {!order.isPaid &&
                        !isPaymentVerified &&
                        order.paymentMethod !== "COD" && (
                            <div className="border border-red-400 border-double bg-red-100 rounded mx-2 my-4 p-2 flex justify-between items-center">
                                <p className="font-bold">
                                    There was some issue with processing your
                                    payment.
                                    <br />
                                    <span className="font-normal text-xs">
                                        If the payment was successful from your
                                        end, please wait for some time and
                                        refresh the page.
                                    </span>
                                </p>
                                <button className="bg-amz-yellow hover:bg-amz-orange w-fit py-1 px-2 my-2 rounded-lg enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400">
                                    Retry Payment
                                </button>
                            </div>
                        )}
                    <div className="flex justify-between items-center mb-4 mx-2">
                        <p>
                            <span>
                                Ordered on{" "}
                                {console.log(
                                    DateTime.fromISO(order?.createdAt)
                                )}
                                {DateTime.fromISO(order?.createdAt).toFormat(
                                    "dd-MMM-yyyy"
                                )}
                            </span>{" "}
                            <span className="mx-2">|</span>{" "}
                            <span>Order# {order?._id}</span>{" "}
                        </p>
                        {order?.isPaid && (
                            <p className="text-lg text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                                Download Invoice
                            </p>
                        )}
                    </div>
                    <div className="border rounded p-4 flex justify-between text">
                        <div>
                            <p className="font-bold my-2">Shipping Address</p>
                            <p>{order?.shippingAddress.name}</p>
                            <p>{order?.shippingAddress.street}</p>
                            <p>
                                {order?.shippingAddress.city},{" "}
                                {order?.shippingAddress.state}
                            </p>
                            <p>
                                {order?.shippingAddress.country} -{" "}
                                {order?.shippingAddress.pinCode}
                            </p>
                        </div>
                        <div>
                            <p className="font-bold my-2">Payment Method</p>
                            <p>{order?.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="font-bold my-2">Order Summary</p>
                            <p className="flex justify-between">
                                <span className="mr-20">
                                    Item(s) Subtotal:{" "}
                                </span>
                                <span>${order?.itemsPrice} </span>
                            </p>
                            <p className="flex justify-between">
                                <span>Tax: </span>
                                <span>${order?.taxPrice} </span>
                            </p>
                            <p className="flex justify-between">
                                <span>Shipping: </span>
                                <span>${order?.shippingPrice} </span>
                            </p>
                            <br />

                            <p className="flex justify-between font-medium">
                                <span>Grand Total: </span>
                                <span>${order?.totalPrice} </span>
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-l border-r rounded-t rounded-r bg-gray-100 mt-2 p-4 -mb-1">
                        <p className="font-medium text-lg">
                            {" "}
                            {order?.orderItems.length} Shipment(s)
                        </p>
                    </div>
                    <div className="border-l border-r border-b rounded-l rounded-b p-4">
                        {order?.isDelivered ? (
                            <p className="font-medium text-xl">
                                Delivered{" "}
                                {DateTime.fromISO(order?.updatedAt).toFormat(
                                    "dd MMM yyyy"
                                )}
                            </p>
                        ) : order?.isPaid ? (
                            <p className="font-medium text-xl text-green-700">
                                Delivery by{" "}
                                {DateTime.fromISO(order?.createdAt)
                                    .plus({ days: 7 })
                                    .toFormat("dd MMM yyyy")}{" "}
                            </p>
                        ) : (
                            ""
                        )}
                        {order?.orderItems.map((item) => (
                            <div key={item._id}>
                                <div className="flex m-2 border-b">
                                    <div className="w-[70%] pr-6">
                                        <div className="flex items-center p-1 m-1">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="h-16"
                                            />
                                            <p className="flex flex-col p-2 ">
                                                <Link
                                                    className="font-medium text-blue-800 hover:text-red-800 hover:underline"
                                                    to={`/products/${item._id}`}
                                                >
                                                    {item.name}
                                                </Link>
                                                <span className="text-sm">
                                                    Quantity: {item.qty}
                                                </span>
                                                <span className="text-sm">
                                                    Total Cost: ${item.price}
                                                </span>
                                                <button className="bg-amz-yellow hover:bg-amz-orange w-fit py-0.5 px-2 my-2 rounded-lg enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400">
                                                    <span>
                                                        <ChangeCircleOutlinedIcon className="scale-[85%]" />
                                                    </span>
                                                    Buy it again
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 items-center justify-center mx-4">
                                        {order?.isDelivered && (
                                            <>
                                                <button className="border border-gray-300 w-full py-0.5 rounded shadow-sm hover:shadow-lg transition duration-100 hover:bg-gray-100 my-1 mx-6">
                                                    Write a product review
                                                </button>
                                                <button className="border border-gray-300 w-full py-0.5 rounded shadow-sm hover:shadow-lg transition duration-100 hover:bg-gray-100 my-1 mx-6 ">
                                                    Return Item
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {order?.isDelivered ? (
                            <p className="text-sm text-blue-700 hover:text-red-700 hover:underline inline hover:cursor-pointer">
                                Archive Order
                            </p>
                        ) : (
                            <p className="text-sm text-blue-700 hover:text-red-700 hover:underline inline hover:cursor-pointer">
                                Cancel Order
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default OrderDetailsPage;
