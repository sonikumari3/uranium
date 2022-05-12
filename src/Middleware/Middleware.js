const jwt=require('jsonwebtoken')
const bookModel=require("../model/bookModel")

const Authentication=async function (req,res,next){
    let token=req.headers['x-api-key']
    if(!token) token = req.headers['X-Api-Key']
    if(!token){
        return res.status(400).send({status:false,message:"Please enter token in header"})
    }

    let decodedToken = jwt.verify(token,"Bookmanagement")
    req.userId=decodedToken.userId
    if(!decodedToken){
        return res.status(400).send({status:false,message:"Please enter valid token"})
    }
    next();

    
}

module.exports.Authentication=Authentication

const Authorisation=async function(req,res,next){
    let token=req.headers['x-api-key']
    if(!token) token = req.headers['X-Api-Key']
    if(!token){
        return res.status(400).send({status:false,message:"Please enter token in header"})
    }
    let bookId = req.params.bookId;
    let decodedToken = jwt.verify(token,"Bookmanagement")
    
    let decoded= decodedToken.userId
    console.log(decoded)
    let book= await bookModel.findById(bookId)
    if(!book){
        return res.status(404).send({status:false,message:"Book does not exist"})
    }
    let user = book.userId.toString()
        
        if (user != decoded) {
            return res.status(401).send({status:false,message:"Not Authorised!!"})
        }
        next()
    
}

module.exports.Authorisation=Authorisation





