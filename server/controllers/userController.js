import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Login User
// @route POST api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    console.log(password);
    console.log(await user.matchPassword(password));
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});

// @desc Register User
// @route POST api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("Something went wrong. Invalid user data.");
    }
});

// @desc Logout User
// @route POST api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully" });
});

// @desc Get User's Profile
// @route GET api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Update User's Profile
// @route PUT api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.address) {
            console.log(req.body.address);
            user.address = [...req.body.address];
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Get all users
// @route GET api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("get Users");
});

// @desc Get user by ID
// @route GET api/users/:id
// @access Private/Admin
const getUsersById = asyncHandler(async (req, res) => {
    res.send("get Users by Id");
});

// @desc Delete user
// @route DELETE api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete User");
});

// @desc Update user by Admin
// @route PUT api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("Update User");
});

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersById,
    deleteUser,
    updateUser,
};
