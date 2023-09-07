import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { signUp, login, logout, getUserDetails } from "../controllers/userController.js";

const router = express.Router(); 

router.route("/signup").post(signUp);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

export default router;   