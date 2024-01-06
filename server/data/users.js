import bcrypt from "bcryptjs";

const users = [
    {
        name: "Administrator",
        email: "admin@tuda.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@tuda.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Jane Doe",
        email: "jane@tuda.com",
        password: bcrypt.hashSync("123456", 10),
    },
];
export default users;