/* eslint-disable react/prop-types */
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`}>
            <div className="m-1 mb-4 flex flex-col items-center border border-gray-100">
                <div className="bg-gray-300">
                    <img src={product.image} alt="" />
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold uppercase">{product.brand}</p>
                    <h2 className="text-center">
                        {product.name.length > 30
                            ? product.name.slice(0, 30) + "..."
                            : product.name}
                    </h2>
                    <Rating rating={product.rating} />
                    <p className="-mt-4">
                        <span className="text-sm">$</span>{" "}
                        <span className="text-lg">{product.price}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Product;
