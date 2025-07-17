import express from "express";
const router = express.Router();
import {registerUser , loginUser ,LogoutUser,getUserData } from "../controllers/userController.js"
import { Protect } from "../middlewares/authmiddleware.js";



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", LogoutUser);
router.get("/getData",Protect, getUserData);

export default router;