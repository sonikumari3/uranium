
const create_user = require("../models/userModel");

const createUser = async function (req, res) {
  let data = req.body;
  let create_products = await create_user(data);
  res.send({ data: create_products });
};
module.exports.createUser = createUser;



// const UserModel= require("../models/userModel")

// const createUser = async (req, res) => {
//     let data = req.body
//     let savedData = await user.create(data)
//     res.send({msg: savedData})
// }


// module.exports.createUser= createUser











// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

// module.exports.createUser= createUser
// module.exports.getUsersData= getUsersData
// module.exports.basicCode= basicCode