const mongoose = require("mongoose");

const publisherModelSchema = new mongoose.Schema({
  name: String,
  headQuarter: String,
});
module.exports = mongoose.model("newPublisher", publisherModelSchema);
