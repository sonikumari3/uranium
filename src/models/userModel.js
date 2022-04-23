// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema( {
//     // Write the schema content    
//     name: String,
// 	balance:Number, // Default balance at user registration is 100
// 	address:String,
// 	age: Number,
//  	gender: {
//          type: String,
//          enum:[ "male"," female"," other"]
//      },
//          // Allowed values are - “male”, “female”, “other”
// 	isFreeAppUser:{
//                     type: Boolean,
//                     default: false// Default false value  .

//     }
//       }, { timestamps: true });

// module.exports =mongoose.model('User', userSchema) //users



const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    balance: { type: Number, default: 100 },
    address: String,
    age: Number,
    gender: { type: String, enum: ['male', 'female', 'others'] },
    isFreeAppUser: { type: Boolean, default: false }
}, { timestamps: true })



module.exports = mongoose.model('user', userSchema)

