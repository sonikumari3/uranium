const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/route')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

mongoose.connect('mongodb+srv://jaganreddy-functionup:ORj2ygJHT7jbS3y8@cluster0.nduth.mongodb.net/jaganreddy-24?retryWrites=true&w=majority',{
    useNewUrlParser:true
})



.then (() => console.log('mongoDB is connected '))
.catch(err => console.log(err))
app.use("/",router)


app.listen(process.env.PORT||3000,function(){
    console.log("Express app running on PORT "+(process.env.PORT || 3000))
})
