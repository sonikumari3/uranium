const userModel = require('../model/userModel')

const createUser = async function(req,res){
    let data = req.body
    let saveData = await userModel.create(data)
    res.status(201).send({status:true,data:saveData})
}

module.exports.createUser=createUser