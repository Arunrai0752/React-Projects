import { getBooks , getBooksById , addBook , editBook, deleteBook } from "../controllers/bookController.js";
import { Protect } from "../middlewares/authmiddleware.js";


import express from "express";
const router = express.Router();

router.get("/books", getBooks)  // Get All Books
router.get("/mybooks/:id",getBooksById)// Get All Books by id
router.post("/add", addBook) // add book
router.put("/mybooks/:id", editBook) // Edit book by id
router.delete("/mybooks/:id", deleteBook) // Edit book by id


export default router;