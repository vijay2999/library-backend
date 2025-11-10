const Author = require("../models/author.model");

exports.createAuthor = async (req, res, next) => {
  try {
    const { name, bio, website } = req.body;
    const author = await Author.create({ name, bio, website });
    res.status(201).json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
};

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json({ success: true, data: authors });
  } catch (err) {
    next(err);
  }
};
