const express = require('express');
const router = express.Router();

const allController= require("../controllers/allController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", allController.createBook  )

router.post("/createNewAuthor", allController.createNewAuthor)

 router.get("/allBooks", allController.allBooks)
 router.get("/updatePrice",allController.updatedPrice)

module.exports = router;