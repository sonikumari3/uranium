
const authorController = require("../models/authorModel");

const createAuthor = async (req, res) => {
  const data = req.body;
  const author_data = await authorController.create(data);
  res.send({ authorData: author_data });
};
module.exports.createAuthor = createAuthor;
