import express from "express";
const router = express.Router();
import {registerUser , loginUser ,LogoutUser } from "../controllers/userController.js"


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", LogoutUser);

export default router;