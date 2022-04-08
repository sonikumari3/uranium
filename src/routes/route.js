const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

router.get('/test-me', function (req, res) {
    console.log('------------------')
    console.log(req)
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});
// problem 1
//Create an API for GET /movies that returns a list of movies. Define an array of movies in your code and return the value in response.
const arr1 = ['DDLG','PK','ZNMD','ABCD']
router.get('/movies1',function(req,res){
res.send(arr1)
});
// Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api
router.get('/movies2/:indexNumber',function (req,res){
let v=req.params.indexNumber
res.send(arr1[v])
});
//Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api



//Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name. An example of movies array is 


    [ {
        “id”: 1,
        “”: "DDLJ"
       }, {
        “id”: 2,
        “name”: "PK"
       }, {
        “id”: 3,
        “name”: "ZNMD"
       }, {
        “id”: 4,
        “name”: "ABCD"
       }]
       router.get('/movies2/:indexNumber',function (req,res){
        let v=req.params.indexNumber
        res.send(arr1[v])
       
module.exports = router;
// adding this comment for no reason