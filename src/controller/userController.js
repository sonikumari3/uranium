const { default: mongoose } = require('mongoose')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const moment = require('moment')


const isValidRequestBody =function(requestBody){
    return Object.keys(requestBody).length == 0
}
const isValid = function(value){

    if (typeof (value)==='undefined'|| typeof(value)=== null){ return false }

    if (typeof(value)=== "string" && (value).trim().length == 0){return false } 
    
    return true

}
const isValidObjectId = function(ObjectId){
    return mongoose.Types.ObjectId.isValidObjectId
}


const createUser = async function(req,res){
  try{
        let data = req.body
    if(isValidRequestBody(data)){
        return res.status(400).send({status:false , message:'Please provide input'})
     }
     let {title,name,phone,email,password,address} = data

     if(!isValid(title)){
        return res.status(400).send({status:false , message:'Please provide title'})
     }
     if(!isValid(name)){
        return res.status(400).send({status:false , message:'Please provide name'})
     }
     if(!isValid(phone)){
        return res.status(400).send({status:false , message:'Please provide phone'})
     }
     if(!isValid(email)){
        return res.status(400).send({status:false , message:'Please provide email'})
     }
     if(!isValid(password)){
        return res.status(400).send({status:false , message:'Please provide password'})
     }
     if(!isValid(address)){
        return res.status(400).send({status:false , message:'Please provide address'})
     }
     if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(data.email))) {
        return res.status(400).send({ status: false, message: 'email should be a valid email address' })
    }
     let checkEmail = await userModel.findOne({ email: data.email })
            if (checkEmail) return res.status(400).send({status:false, message: "Email already exist" })
            
    if (!/^[2-9]\d{9}$/.test(phone)) {
    return res.status(400).send({ status: false, message: "Enter a valid mobile number" })
        }

    let checkMobile = await userModel.findOne({ phone: data.phone})
            if (checkMobile) {
                return res.status(400).send({ status: false,msg: "Mobile Number already exist" })
            }

            if(!/^[A-Za-z]\w{8,15}$/.test(password)){
                return res.status(400).send({ status: false, message: "Password should be greater than 8 and less than equal to 15" })
            }
     
    let saveData = await userModel.create(data)
    
    res.status(201).send({status:true,message:'success',data:saveData})
  }
  catch(err){
      return res.status(500).send({status:false , message:'error' , error:err.message})
  }
}


const loginUser = async function(req,res){
    let data= req.body
    
    if(isValidRequestBody(data)){
        return res.status(400).send({status:false , message:'Please provide input'})
     }
    
    let user = await userModel.findOne({email :data.email,password : data.password})

    if(!user){
        return res.status(400).send({status : false, message:"please enter email id or password"})
    }
    let token = await jwt.sign({
        userId: user._id.toString(),
       
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60)
    }, "Bookmanagement")

    res.setHeader("x-api-key",token)
        return res.status(200).send({ status: true, message: "Login Successfully", data: token })
}

module.exports.createUser=createUser
module.exports.loginUser=loginUser





