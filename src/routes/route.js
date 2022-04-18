const express = require("express");
const router = express.Router();
const author_Controller = require("../controllers/authorController");
const publisher_Controller = require("../controllers/publisherController");
const book_schema = require("../controllers/bookController");

const authorSchema = require("../models/authorModel");

router.post("/createAuthor", author_Controller.createAuthor);

router.post("/publisher_Controller", publisher_Controller.publisherModel);

router.post("/newBookModel", book_schema.newBookModel);

 router.get("/getBooksWithAuthorDetails", book_schema.getBooksWithAuthorDetails);
 
 router.put("/updateBooks", book_schema.updateBooks);

module.exports = router;
