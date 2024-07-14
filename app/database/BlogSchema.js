const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    // required: true
  },
  heading: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

module.exports = Blog;


