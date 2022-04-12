const { default: mongoose } = require("mongoose"); //call the mongoose 



const bookSchema = new mongoose.Schema({      //create Schema
    bookName: String,
    authorName: {
        type: String,
        required: true,
    },
    category :{
        type : String,
        enum : ["Romance","Action","Drama","Comedy","Adventure"]
    },
    year: String,

    
    

},{timestamps: true});
module.exports = mongoose.model('Book',bookSchema)  // export schema
