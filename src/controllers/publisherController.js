const publisherModel1 = require("../models/publisherModel");

const publisherModel = async (req, res) => {
  const data = req.body;
  const publisher_data = await publisherModel1.create(data);
  res.send({ authorData: publisher_data });
};
module.exports.publisherModel = publisherModel;
