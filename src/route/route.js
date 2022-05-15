const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const {Authentication,Authorisation}=require('../Middleware/Middleware')
const reviewController=require('../controller/reviewController')

router.post('/register',userController.createUser)

router.post('/login',userController.loginUser)

router.post('/books',Authentication,bookController.createBooks)

router.get("/books", Authentication,bookController.getBooks);

router.get("/books/:bookId", Authentication,bookController.getBooksById);

router.put("/books/:bookId",Authentication,Authorisation, bookController.updateBookDetails);

router.delete("/books/:bookId", Authentication,Authorisation, bookController.deleteBooks);

router.post('/books/:bookId/review',Authentication,reviewController.createReview)

router.put("/books/:bookId/review/:reviewId",Authentication,Authorisation, reviewController.updateReviewDetails);

router.delete("/books/:bookId/review/:reviewId", Authentication,Authorisation, reviewController.deleteReviewData);

module.exports = router
