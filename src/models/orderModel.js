const moment = require("moment");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  UserID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:' User'
  },
  productID:{
      type: mongoose.Schema.Types.ObjectId,
      ref:' Product'
  },
  amount:Number,
  isFreeAppUser:Boolean,
  date:moment(new Date().format("DD/MM/YYYY"))

 }, {timestamps:true});

module.exports = mongoose.model("Order", orderSchema);








// _id: ObjectId("61951bfa4d9fe0d34da86344"),
// 	userId: “61951bfa4d9fe0d34da86829”,
// 	productId: “61951bfa4d9fe0d34da86344”
// 	amount: 0,
// 	isFreeAppUser: true, 
// 	date: “22/11/2021”