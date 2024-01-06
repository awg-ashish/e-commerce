import { DateTime } from "luxon";
import { useGetOrdersQuery } from "../slices/orderApiSlice";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { Link } from "react-router-dom";
const OrdersPage = () => {
    const { data: orders, isLoading } = useGetOrdersQuery();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-medium mb-4 mt-10">Your Orders</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : orders?.length ? (
                orders?.map((item) => (
                    <div key={item._id}>
                        <div className="border-t border-l border-r rounded-t rounded-r bg-gray-100 mt-10 p-4 -mb-1 flex justify-between">
                            <div className="flex justify-between w-[40%]">
                                <div>
                                    <p className="text-xs font-medium">
                                        ORDER PLACED
                                    </p>
                                    <p className="text-sm">
                                        {DateTime.fromISO(
                                            item.createdAt
                                        ).toFormat("dd MMM yyyy")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium">TOTAL</p>
                                    <p className="text-sm">
                                        ${item.totalPrice}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium">
                                        SHIP TO
                                    </p>
                                    <p className="text-sm">
                                        {item.shippingAddress.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium">
                                    ORDER# {item._id}
                                </p>
                                <Link
                                    to={`/orders/${item._id}`}
                                    className="text-blue-700 hover:text-red-700 hover:underline text-sm"
                                >
                                    View Order Details
                                </Link>
                            </div>
                        </div>
                        <div className="border-l border-r border-b rounded-l rounded-b p-4">
                            {item.isPaid || item.paymentMethod === "COD" ? (
                                <h2>
                                    {item.isDelivered ? (
                                        <p className="font-bold">
                                            Delivered{" "}
                                            {DateTime.fromISO(
                                                item.updatedAt
                                            ).toFormat("dd MMM yyyy")}
                                        </p>
                                    ) : (
                                        <p className="font-medium text-green-700">
                                            Delivery by{" "}
                                            {DateTime.fromISO(item.createdAt)
                                                .plus({ days: 7 })
                                                .toFormat("dd MMM yyyy")}{" "}
                                        </p>
                                    )}
                                </h2>
                            ) : (
                                <h2 className="font-medium border-red-700 border rounded bg-red-100 p-2">
                                    We couldn&apos;t process your payment. View
                                    Order Details to retry payment.
                                </h2>
                            )}
                            {item.orderItems.map((orderItem) => (
                                <div
                                    className="flex m-2 border-b"
                                    key={orderItem._id}
                                >
                                    <div className="w-[70%] pr-6">
                                        <div className="flex items-center p-1 m-1">
                                            <img
                                                src={orderItem.image}
                                                alt=""
                                                className="h-16"
                                            />
                                            <div className="flex flex-col p-2 ">
                                                <Link
                                                    className="font-medium text-blue-800 hover:text-red-800 hover:underline"
                                                    to={`/products/${orderItem._id}`}
                                                >
                                                    {orderItem.name}
                                                </Link>
                                                <p className="flex flex-row items-end">
                                                    <button className="bg-amz-yellow hover:bg-amz-orange w-fit py-0.5 px-2 my-2 rounded-lg enabled:shadow-md enabled:hover:shadow-lg transition duration-100 disabled:bg-gray-400">
                                                        <span>
                                                            <ChangeCircleOutlinedIcon className="scale-[85%]" />
                                                        </span>
                                                        Buy it again
                                                    </button>
                                                    {item.isDelivered && (
                                                        <button className="border border-gray-300 w-fit py-0.5 px-2 rounded-lg shadow-md hover:shadow-lg transition duration-100 hover:bg-gray-100 my-2 mx-2">
                                                            Return Item
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 items-center justify-center mx-4">
                                        {item.isDelivered && (
                                            <button className="border border-gray-300 w-full py-0.5 rounded shadow-sm hover:shadow-lg transition duration-100 hover:bg-gray-100 my-1 mx-6">
                                                Write a product review
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {item.isDelivered ? (
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
                ))
            ) : (
                <div>You don&apos;t have any orders yet.</div>
            )}
        </div>
    );
};

export default OrdersPage;
