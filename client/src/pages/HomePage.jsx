import Banner from "../components/Banner";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomePage = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>{error?.data?.message || error?.error}</h2>
            ) : (
                <>
                    <div className="max-w-7xl mx-auto">
                        <Banner />
                    </div>
                    <div className="flex flex-wrap justify-center max-w-7xl mx-auto -my-8">
                        {products &&
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="max-w-[270px]"
                                >
                                    <Product product={product} />
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    );
};

export default HomePage;
