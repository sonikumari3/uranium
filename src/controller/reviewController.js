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
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}



const createReview = async function (req, res) {
    let data=req.params.bookId
    let reviewData=req.body

    let books=await bookModel.findById({_id:data},{isDeleted:false})

    if(!books){
        return res.status(404).send({status:false,message:"Book Id not found"})
    }

    if (isValidRequestBody(reviewData)) {
        return res.status(400).send({ status: false, message: 'Please provide input' })
    }

    let {bookId,reviewedBy,reviewedAt,rating}=reviewData


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


    if (!isValid(reviewedBy)) {
        return res.status(400).send({ status: false, message: "Please provide reviewer's name" })
    }

    if (!isValid(reviewedAt)) {
        return res.status(400).send({ status: false, message: 'Please provide reviewed date' })
    }
    if (!isValid(rating)) {
        return res.status(400).send({ status: false, message: 'Please provide rating' })
    }
    if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(reviewData.reviewedAt)) {
        return res.status(400).send({ status: false, message: 'Please enter date in given format' })
    }
    let saveData = await reviewModel.create(reviewData)
    if(saveData){
        let reviewcount=await bookModel.findOneAndUpdate({_id:data},{$inc:{reviews:1}})
    }

    res.status(201).send({ status: true, message: 'success', data: saveData })



}
module.exports.createReview = createReview