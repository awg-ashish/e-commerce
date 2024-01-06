import express from "express";
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersById,
    deleteUser,
    updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", protect, logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.get("/", protect, admin, getUsers);
router
    .route("/:id")
    .get(protect, admin, getUsersById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

export default router;
