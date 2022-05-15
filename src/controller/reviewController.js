const reviewModel = require('../model/reviewModel')
const bookModel = require('../model/bookModel')
const mongoose = require('mongoose')
const moment = require('moment')

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length == 0
}
const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === null) { return false }

    if (typeof (value) === "string" && (value).trim().length == 0) { return false }

    return true

}
const isValid1 = function (value) {
    if (typeof (value) === null) { return false }

    if (typeof (value) === "string" && (value).trim().length == 0) { return false }

    return true

}
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}



const createReview = async function (req, res) {
    let data = req.params.bookId
    let reviewData = req.body

    let books = await bookModel.findById({ _id: data }, { isDeleted: false })

    if (!books) {
        return res.status(404).send({ status: false, message: "Book Id not found" })
    }

    if (isValidRequestBody(reviewData)) {
        return res.status(400).send({ status: false, message: 'Please provide input' })
    }

    let { bookId, reviewedBy, reviewedAt, rating } = reviewData


    if (!isValid(bookId)) {
        return res.status(400).send({ status: false, message: 'Please provide bookId' })
    }
    if (!isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: 'Please provide valid objectID' })
    }
    let checkBookId = await bookModel.findById(reviewData.bookId);
    if (!checkBookId) {
        return res.status(404).send({ status: false, msg: " No book with this Id" });
    }

    if (!isValid(reviewedAt)) {
        return res.status(400).send({ status: false, message: 'Please provide reviewed date' })
    }
    if (!isValid(rating)) {
        return res.status(400).send({ status: false, message: 'Please provide rating' })
    }
    if (rating == 0) {
        return res.status(400).send({ status: false, message: "rating should be between 1 to 5." })
    }
    if (!(0 < rating && rating < 6)) {
        return res.status(400).send({ status: false, message: "rating should be between 1 to 5." })
    }
    if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(reviewData.reviewedAt)) {
        return res.status(400).send({ status: false, message: 'Please enter date in given format' })
    }
    let saveData = await reviewModel.create(reviewData)
    if (saveData) {
        await bookModel.findOneAndUpdate({ _id: data }, { $inc: { reviews: 1 } })
    }

    res.status(201).send({ status: true, message: 'success', data: saveData })



}
module.exports.createReview = createReview

const updateReviewDetails = async (req, res) => {
    try {
        const bookparams = req.params.bookId
        const reviewparams1 = req.params.reviewId
        const data = req.body
        let { review, rating, reviewedBy } = data

        if (!isValidObjectId(bookparams)) {
            return res.status(400).send({ status: false, message: "Invalid bookId." })
        }

        if (!isValidObjectId(reviewparams1)) {
            return res.status(400).send({ status: false, message: "Invalid reviewId." })
        }

        if (isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details to update.' })
        }
        if (review) {
            if (!isValid(review)) return res.status(400).send({ status: false, message: "review Should be Valid..." })

        }
        if (reviewedBy) {
            if (!isValid(reviewedBy)) return res.status(400).send({ status: false, message: "reviewedBy  Should be Valid..." })
        }

        const searchBook = await bookModel.findById({ _id: bookparams })
        if (!searchBook) {
            return res.status(404).send({ status: false, message: 'Book does not exist.' })
        }
        const searchReview = await reviewModel.findOne({ _id: reviewparams1 })
        if (!searchReview) {
            return res.status(404).send({ status: false, message: 'review does not exist.' })
        }
        let review1 = await reviewModel.findOne({ $and: [{ bookId: bookparams }, { _id: reviewparams1 }] })
        if (!review1) {
            return res.status(400).send({ status: false, message: 'review and book Id  does not match.' })
        }
        if (typeof (rating) === 'number') {
            if (!isValid(rating)) return res.status(400).send({ status: false, message: "rating Should be Valid..." })

            if (rating)
                if (!/^[1-5]\d{0}$/.test(rating)) {
                    return res.status(400).send({ status: false, message: "rating should be in 1 to 5 Number" })
                }
        }
        if (searchBook.isDeleted == false) {
            if (searchReview.isDeleted == false) {
                const changeDetails = await reviewModel.findOneAndUpdate({ _id: reviewparams1 }, { review: review, rating: rating, reviewedBy: reviewedBy }, { new: true })

                res.status(200).send({ status: true, message: "Successfully updated review details.", data: changeDetails })
            }
            else {
                return res.status(400).send({ status: false, message: "Review is deleted." })
            }
        }
        else {
            return res.status(400).send({ status: false, message: "Book is deleted." })
        }
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })

    }
}

module.exports.updateReviewDetails = updateReviewDetails

const deleteReviewData = async function (req, res) {

    let bookId = req.params.bookId
    let reviewId = req.params.reviewId


    let book = await bookModel.findById({ _id: bookId })
    if (!book) {
        return res.status(400).send({ status: false, msg: "no book exist with this id" })
    }

    let review1 = await reviewModel.findOne({ $and: [{ bookId: bookId }, { _id: reviewId }] })
    if (!review1) {
        return res.status(404).send({ status: false, message: 'review and book Id  does not match.' })
    }
    const deletealready = await bookModel.findOne({ _id: bookId })
    if (deletealready.isDeleted == true) { return res.status(400).send({ status: false, msg: 'bookid  has already deleted' }) }
    let review = await reviewModel.findById({ _id: reviewId })
    if (!review) {
        return res.status(404).send({ status: false, msg: "reviewId not in this book " })
    }

    const reviewedId = await reviewModel.findOne({ _id: reviewId })
    if (reviewedId.isDeleted === true) {
        return res.status(400).send({ status: false, msg: "reviewid is already deleted" })
    }


    let deleteBook = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
    if (deleteBook) {
        let reviewcount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })
    }

    res.status(200).send({ status: true, message: 'This review is deleted' })

}


module.exports.deleteReviewData = deleteReviewData