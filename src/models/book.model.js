const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String },
    isbn: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    publishedAt: { type: Date },
    pages: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
