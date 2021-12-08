const express = require("express");
const app = new  express();
const routes = require('./router/router'); // import the routes
const mongo = require('./mongo/mongo'); // import the routes
var path = require('path');

require('dotenv').config(); //to access .env file
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', routes); //to use the routes


const boot = async()=> {
    await mongo.connectMongoDB("hmart");
    app.listen(PORT,()=> {
        console.log(`App is running at port ${PORT}`);
    })
}

boot()