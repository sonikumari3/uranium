const create_product = require("../models/productModel");

const createProducts = async function (req, res) {
  let data = req.body;
  let create_products = await create_product(data);
  res.send({ data: create_products });
};
module.exports.createProducts = createProducts; 
