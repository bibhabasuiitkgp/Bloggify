const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
    // unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Books =
  mongoose.models.Books || mongoose.model("Books", BooksSchema);

module.exports = Books;
