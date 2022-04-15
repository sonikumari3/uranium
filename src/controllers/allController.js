const authorModel = require("../models/authorModel")
const BookModel= require("../models/BookModel")

const createBook = async function (req, res) {
    let data= req.body

    let Data= await BookModel.create(data)
    res.send({msg: Data})
}


const createNewAuthor = async function(req,res){
    const data =req.body;
    const SavedData = await authorModel.create(data)
    res.send({msg : SavedData})
}
const allBooks = async function(req,res){
    let authorDetails=await authorModel.find({ authorName:"Chetan Bhagat"})
    let = authorDetails[0].author_id
    let bookname=await BookModel.find({author_id}).select({name:1})
}
const updatedPrice = async function(req,res){
    let body=req.body
    let bookDetails=await BookModel.find(body)
    let id=bookDetails[0].author_id
let authorN=await authorModel.find({author_id:id}).select({author_name:1,_id:0})
    let bookN=bookDetails[0].name
    let updatePrice=await BookModel.findOneAndUpdate({name:bookN},{price:100},{new:true}).select({price:1,_id:0})
    res.send({msg : authorN,updatePrice})

}
module.exports.createBook= createBook
module.exports.createNewAuthor=createNewAuthor
module.exports.allBooks=allBooks
module.exports.updatedPrice=updatedPrice