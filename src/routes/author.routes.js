const express = require("express");
const router = express.Router();
const { createAuthor, getAuthors } = require("../controllers/authors.controller");

router.post("/", createAuthor);
router.get("/", getAuthors);

module.exports = router;
