const { default: mongoose } = require('mongoose')
const userModel = require('../model/userModel')
const moment = require('moment')
const bookModel = require('../model/bookModel')
const reviewModel=require('../model/reviewModel')


const isValid = function (value) {

    if (typeof (value) === 'undefined' || typeof (value) === null) { return false }

    if (typeof (value) === "string" && (value).trim().length == 0) { return false }

    return true

}
const isValid1 = function (value) {
    if (typeof value == undefined || value == null)  return false 

    if (typeof value === "string" && value.trim().length === 0) { return false }

    return true

}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length == 0
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createBooks = async function (req, res) {
    let data = req.body

    if (isValidRequestBody(data)) {
        return res.status(400).send({ status: false, message: 'Please provide input' })
    }

    let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data

    if ((req.userId != userId)) {
        return res.status(400).send({ status: false, message: 'User is not authorised' })
    }

    if (!isValid(title)) {
        return res.status(400).send({ status: false, message: 'Please provide title' })
    }

    if (!isValid(excerpt)) {
        return res.status(400).send({ status: false, message: 'Please provide excerpt' })
    }

    if (!isValid(userId)) {
        return res.status(400).send({ status: false, message: 'Please provide userId' })
    }

    if (!isValid(ISBN)) {
        return res.status(400).send({ status: false, message: 'Please provide ISBN' })
    }

    if (!isValid(category)) {
        return res.status(400).send({ status: false, message: 'Please provide category' })
    }

    if (!isValid(subcategory)) {
        return res.status(400).send({ status: false, message: 'Please provide subcategory' })
    }
    if (!isValid(releasedAt)) {
        return res.status(400).send({ status: false, message: 'Please provide release Date' })
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: 'Please provide valid objectID' })
    }


    let checkTitle = await bookModel.findOne({ title: data.title })
    if (checkTitle) {
        return res.status(400).send({ status: false, msg: "Title already exist" })
    }


    let checkISBN = await bookModel.findOne({ ISBN: data.ISBN })
    if (checkISBN) {
        return res.status(400).send({ status: false, msg: "ISBN already exist" })
    }
    let checkUserId = await userModel.findById(data.userId);
    if (!checkUserId) {
        return res.status(404).send({ status: false, msg: " UserId is required or not valid" });
    }

    if (!(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).test(data.ISBN)) {
        return res.status(400).send({ status: false, message: 'ISBN should be valid' })
    }

    if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(data.releasedAt)) {
        return res.status(400).send({ status: false, message: 'Please enter date in given format' })
    }


    let saveData = await bookModel.create(data)

    res.status(201).send({ status: true, message: 'success', data: saveData })
}

module.exports.createBooks = createBooks


const getBooks = async function (req, res) {
    try {
        let data = req.query
        let filter={isDeleted:false}


if(data.title || data.excerpt || data.ISBN || data.reviews || data.releasedAt ){
    return res.status(400).send({ status: false, msg: 'Filter not available' })
}

        if(data.userId)
        if(!isValidObjectId(data.userId)){
            return res.status(400).send({ status: false, msg: 'UserId is not valid' })
        }
        if(!isValidRequestBody(data)){
          if(data.userId)filter.userId=data.userId.trim()
          if(data.category)filter.category=data.category.trim()
          if(data.subcategory)filter.subcategory=data.subcategory.trim()
        }

        let books = await bookModel.find(filter)
        .select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 });

        // check data exits or not
        if (books.length <= 0) {
            return res.status(404).send({ status: false, msg: 'Data Not Found' })
        }
        return res.status(200).send({ status: true, message: "Books list", data: books })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.getBooks=getBooks

// const getBooks = async function (req, res) {
//     // try {
//         let data = req.query.category
//         let data1 = req.query.subcategory
//         let data2 = req.query.userId
        
//         let filter={isDeleted:false}
        
//         // find the all data filter and query
//         let books = await bookModel.find({$and:[filter, data || data1 ||data2]});
//         if(data.title || data.excerpt || data.ISBN || data.reviews || data.releasedAt ){
//             return res.status(400).send({ status: false, msg: 'Filter not available' })
//         }

//         // check data exits or not
//         if (books.length <= 0) {
//             return res.status(400).send({ status: false, msg: 'Data Not Found' })
//         }
        
//         return res.status(200).send({ status: true, data: books })

//     // }
//     // catch (err) {
//     //     return res.status(500).send({ status: false, msg: err.message })
//     // }
// }
// module.exports.getBooks = getBooks;

const getBooksById = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Enter the valid bookId" });
        }
        let findBookId = await bookModel.findById({ _id: bookId }).select({ ISBN: 0 });

        if (findBookId.length == 0)
            return res.status(400).send({ status: false, message: "No Book Data Found" });

        let {
            _id,
            title,
            excerpt,
            userId,
            category,
            subcategory,
            review,
            isDeleted,
            deletedAt,
            releasedAt,
            createdAt,
            updatedAt,
        } = findBookId;

        let reviewData = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ bookId: 1, reviewdBy: 1, rating: 1, review: 1 });

        let bookDetails = {
            _id,
            title,
            excerpt,
            userId,
            category,
            subcategory,
            review,
            isDeleted,
            deletedAt,
            releasedAt,
            createdAt,
            updatedAt,
            reviewData,
        };
        return res.status(200).send({ status: true, message: "All books", data: bookDetails });
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message });
    }
};

module.exports.getBooksById = getBooksById;



const updateBookDetails = async function (req, res) {
    try {
        const params = req.params.bookId
        const data = req.body
        let { title, excerpt, releasedAt, ISBN } = data

        if (!isValidObjectId(params)) {
            return res.status(400).send({ status: false, message: "Invalid bookId." })
        }
        console.log(params)

        if (isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide book details to update.' })
        }
        if(title || ISBN || excerpt || releasedAt){


        if (!isValid1(ISBN)) {
            return res.status(400).send({ status: false, message: "Please provide ISBN to update." })
        }


        if (!isValid1(excerpt)) {
            return res.status(400).send({ status: false, message: "Please provide excerpt to update." })
        }


        // if (title || title.length == 0)
        if (!isValid1(title)) {
            return res.status(400).send({ status: false, message: "Please provide title to update." })
        }


        if (!isValid1(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please provide releasedAt to update." })
        };
    }


        const searchBook = await bookModel.findById({ _id: params })
        if (!searchBook) {
            return res.status(404).send({ status: false, message: 'Book does not exist.' })
        }
        const findTitle = await bookModel.findOne({ title: title, isDeleted: false })
        if (findTitle) {
            return res.status(400).send({ status: false, message: 'This title is already exists.Please try a new title.' })
        }
        const findIsbn = await bookModel.findOne({ ISBN: ISBN, isDeleted: false })
        if (findIsbn) {
            return res.status(400).send({ status: false, message: 'This ISBN code is already registered.' })
        }
        if (ISBN)
            if (!(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).test(data.ISBN)) {
                return res.status(400).send({ status: false, message: 'ISBN should be valid' })
            }
        if (releasedAt)
            if (!(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).test(data.releasedAt)) {
                return res.status(400).send({ status: false, message: 'Please enter date in given format' })
            }


        if (searchBook.isDeleted == false) {
            const changeDetails = await bookModel.findOneAndUpdate({ _id: params }, { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true })

            res.status(200).send({ status: true, message: "Successfully updated book details.", data: changeDetails })
        }
        else {
            return res.status(400).send({ status: false, message: "Book is deleted." })
        }
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message })
    }
}

module.exports.updateBookDetails = updateBookDetails

const deleteBooks = async function (req, res) {

    let id = req.params.bookId

    if (!isValidObjectId(id)) {
        return res.status(400).send({ status: false, message: 'Please provide valid objectID' })
    }

    let checkBookId = await bookModel.findById({ _id: id });
    if (!checkBookId) {
        return res.status(404).send({ status: false, msg: " bookId is required or not valid" });
    }

    if (id) {
        let dlbook = await bookModel.findById(id)
        if (dlbook.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "book already deleted" })
        }

        let deleteBook = await bookModel.findOneAndUpdate({ _id: id },
            { $set: { isDeleted: true, deletedAt: Date.now() } })

        return res.status(200).send({ status: true, msg: "The book document is successfully deleted" })
    } else {
        return res.status(400).send({ status: false, msg: "bad request" })
    }
}


module.exports.deleteBooks = deleteBooks

