const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');


const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Soni:NJhwvCdwUFanmyma@soni.zdj6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    
    {
      useNewUrlParser: true
     
    }
  )
  .then(() =>  console.log("connected to mongodb"))
  .catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
