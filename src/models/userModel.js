// const mongoose = requir( 'mongoose');
// const userSchema= new mongoose.Schema ({
//     firstName:String,
//   lastName: String,
//   moblie:   {
//       type:String,
//       uqnine: true,
//       requir:true
      
//   },
// emailID:String,
// gender:{
//     type:[ "male","female","LGBTQ"]
// },
// age:Number
 
  
// } ,{ timestamps:true});
// module.exports =mongoose.model('User',userSchema)
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  authorName: String,
  bookName: String,
  category: {
    type: String,
    unique: true,
  },
  year: { type: Number, required: true },
});
module.exports = mongoose.model("User", bookSchema);