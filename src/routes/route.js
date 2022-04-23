const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController")
router.post("/createusers", userController.createUser);

router.post("/createproducts", productController.createProducts);
router. post ("/createorder", orderController.createOrder);


module.exports = router;