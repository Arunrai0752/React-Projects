import { getBooks , getBook , addBook , editBook, deleteBook } from "../controllers/bookController.js";
import { Protect } from "../middlewares/authmiddleware.js";


import express from "express";
const router = express.Router();

router.get("/books", getBooks)  // Get All Books
router.get("/:id",getBook)// Get All Books by id
router.post("/add", addBook) // add book
router.put("/:id", editBook) // Edit book by id
router.delete("/:id", deleteBook) // Edit book by id


export default router;