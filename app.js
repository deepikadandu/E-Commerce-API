//importing packages

const express = require('express');
const port=8081;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

// initializing express
const app = express();

// using body parser to parse over the request body
app.use(bodyParser.urlencoded({extended: true}));

// using routes
// app.get('/',(req,res)=>{return res.send("postman")});
app.use('/products', require('./routes/products'));

//env file
// require("dotenv").config();
// console.log(process.env.WEATHER_API_KEY);

// starting the server
app.listen(port, function(){
    console.log('API is live on http://localhost:8081');
});