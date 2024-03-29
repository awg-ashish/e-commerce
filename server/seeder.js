import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

//import Data

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => ({
            ...product,
            user: adminUser,
        }));

        await Product.insertMany(sampleProducts);
        console.log("Data imported successfully!");
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data deleted successfully!");
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    deleteData();
} else {
    importData();
}
