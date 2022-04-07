const express = require('express');
const { get } = require('lodash');
const loggerModules = require("../logger/logger.js");
const helperModules = require('../util/helper');
const formatterModules = require('../validator/formatter');
const lodash = require('lodash')
const router = express.Router();

router.get('/test-me', function (req, res) { 
loggerModules.welcomeMessage()
// helperModules.printTodaysDate()
    res.send('My first ever api!')
});

router.get('/test-me-2', function (req, res) {
    helperModules.myDate();    
    // helperModules.printTodaysDate()
        res.send('My first ever api!')
    });
    router.get('/test-me-3', function (req, res) {
        helperModules.mymonth();    
        // helperModules.printTodaysDate()
            res.send('My first ever api!')
        });
        router.get('/test-me-4', function (req, res) {
            helperModules.mybatch();    
            
                res.send('My first ever api!')
        });
        router.get('/test-me-5', function (req, res) {
            formatterModules.trimString();    
             res.send('My first ever api!')
        });
        router.get('/test-me-6', function (req, res) {
            formatterModules.changetoLowerCase();    
             res.send('My first ever api!')
        });
       
        router.get('/test-me-7', function (req, res) {
            formatterModules.changetoupperCase();    
             res.send('My first ever api!')
        });
        router.get('/hello',function(req,res){
            const month = [" january","february","march","april","may","june","july","agust","september","october","november","december"]
            res.send('<h1> i am soni <h1>'+'my final APi')
            console.log(lodash.chunk(month,4))
        
            const odd = [1,3,5,7,9,11,13,15,17,19]
            console.log(lodash.tail(odd))
        
            const arr1 = [1,2,3,62,6,8];
            const arr2 = [1,2,5,7,62,7];
            const arr3 = [2,4,7,3,8,9];
            const arr4 = [2,61,8,4,10];
            const arr5 = [4,6,3,8,11,10]
            console.log(lodash.union(arr1,arr2,arr3,arr4,arr5))
        
        
            const obj =[
             ['horror','The Shining'],
            ['drama','Titanic'],
            ['thriller','Shutter Island'],
            ['fantasy','Pans Labyrinth']
            ]
            
            let a = lodash.fromPairs(obj);
            console.log(a)
        
        });
       
module.exports = router;

