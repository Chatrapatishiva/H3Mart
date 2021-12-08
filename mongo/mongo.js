const MongoClient = require("mongodb").MongoClient;
require("dotenv").config(); //to access .env file
var booksCollection;
var db;

//Connect To MongoDB
const connectMongoDB = (collection) =>
  MongoClient.connect(process.env.MONGODB, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to Database");
      db = client.db("hmart");
      booksCollection = db.collection(collection);
    })
    .catch((error) => console.error(error));

//insert One
const insertOne = (obj) =>
  booksCollection.insertOne(obj).then((result) => result);

//Read
const readData = (obj, options) =>
  booksCollection
    .find(obj, options)
    .toArray()
    .then((result) => result);

const readOne = (obj) =>
  booksCollection
    .findOne(obj)
    .then((result) => result);

const readDataWithTotal = (obj, options) =>
  booksCollection.count().then((result) => result);

module.exports = { connectMongoDB, insertOne, readData, readOne, readDataWithTotal };
