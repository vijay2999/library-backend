const Book = require("../models/book.model");
const Author = require("../models/author.model");

exports.createBook = async (req, res, next) => {
  try {
    const { title, summary, isbn, author, publishedAt, pages } = req.body;
    const authorExists = await Author.findById(author);
    if (!authorExists) return res.status(404).json({ message: "Author not found" });

    const book = await Book.create({ title, summary, isbn, author, publishedAt, pages });
    const populated = await book.populate("author");
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Book.countDocuments();
    const books = await Book.find()
      .populate("author")
      .skip(skip)
      .limit(Number(limit));
    res.json({
      success: true,
      meta: { total, page: Number(page), limit: Number(limit) },
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const { authorName } = req.query;
    const authors = await Author.find({ name: { $regex: authorName, $options: "i" } });
    const ids = authors.map((a) => a._id);
    const books = await Book.find({ author: { $in: ids } }).populate("author");
    res.json({ success: true, data: books });
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("author");
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ success: true, message: "Book deleted" });
  } catch (err) {
    next(err);
  }
};
