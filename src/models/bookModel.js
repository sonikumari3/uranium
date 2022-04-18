
const mongoose = require("mongoose"); // 


const ObjectId = mongoose.Schema.Types.ObjectId;

const bookModelSchema = new mongoose.Schema(
  {
    name: String,
    author: {
      type: ObjectId, 
      ref: "newAuthor",
    },
    price: Number,
    ratings: Number,
    publisher: {
      type: ObjectId,
      ref: "newPublisher",
    },
  
  isHardCover :{
    type :Boolean,
    default : false
  },
  },
    {timestamps: true }
);
 module.exports = mongoose.model("newBook", bookModelSchema);
// // const mongoose = require('mongoose');
// // const ObjectId = mongoose.Schema.Types.ObjectId

// // const bookSchema = new mongoose.Schema( {
// name:String,
// price:Number,
// ratings:Number,
//  publisher:{type:ObjectId, ref: 'Publisher1'},
//  author:{type:ObjectId,ref:'Author1'},
//  isHardCover:{type:Boolean,default:false}

// },

// { timestamps: true });


//module.exports = mongoose.model('Book1', bookSchema)
