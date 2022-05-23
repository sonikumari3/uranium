const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./route/route')
const app = express()
const multer = require('multer')
const { AppConfig } = require('aws-sdk');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( multer().any())

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://jaganreddy-functionup:ORj2ygJHT7jbS3y8@cluster0.nduth.mongodb.net/Group22Database?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
.then (() => console.log('mongoDB is connected '))
.catch(err => console.log(err))
app.use("/",router)


app.listen(process.env.PORT || 3000,function(){
    console.log("Express app running on PORT "+(process.env.PORT || 3000))
})

