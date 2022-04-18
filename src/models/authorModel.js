const mongoose = require("mongoose"); // mongooose help us to create the

const ObjectId = mongoose.Schema.Types.ObjectId;

const authorModelSchema = new mongoose.Schema(
  {
    authorName: String,
    age: Number,
    address: String,
    rating: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("newAuthor", authorModelSchema);
