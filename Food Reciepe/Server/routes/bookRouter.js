import { getBooks , getBook , addBook , editBook, deleteBook } from "../controllers/bookController.js";
import { Protect } from "../middlewares/authmiddleware.js";


import express from "express";
const router = express.Router();

router.get("/books",Protect, getBooks)  // Get All Books
router.get("/:id",Protect,getBook)// Get All Books by id
router.post("/add",Protect, addBook) // add book
router.put("/:id",Protect, editBook) // Edit book by id
router.delete("/:id",Protect, deleteBook) // Edit book by id


export default router;