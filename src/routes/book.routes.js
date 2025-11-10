const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  searchBooks,
  updateBook,
  deleteBook,
} = require("../controllers/books.controller");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
