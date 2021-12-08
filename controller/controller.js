const { response } = require("express");
const mongo = require("../mongo/mongo");

const homePage = (req, res, next) => {
  res.status(200).send({
    message: "App is running at 3000",
    code: 200,
    status: true
});
};

const createSalesOrder = (req, res, next) => {
  console.log(req.body);
  if (
    req.body.username &&
    req.body.quantity &&
    req.body.books &&
    req.body.totalAmount
  ) {
    let rand = (Math.random() * 100) | 0;
    req.body.order_id = rand.toString();
    mongo
      .insertOne(req.body)
      .then((response) => {
        res.status(200).send({
          code: 200,
          status: true,
          message: "Sales Order Created Successfully",
        });
      })
      .catch((error) => console.log(error));
  } else {
    res.status(400).send({
      code: 400,
      status: false,
      message: "All fields are mandatory",
      fields: ["username", "quantity", "books", "totalAmount"],
    });
  }
};

const getBooks = async (req, res, next) => {
  await mongo.connectMongoDB("books");

  console.log(req.query);
  let pagination = {
    limit: req.query.limit ? parseInt(req.query.limit) : 10,
    skip: req.query.skip ? parseInt(req.query.skip) : 0,
  };
  console.log(pagination);
  mongo
    .readData({}, pagination) //{limit:10, skip:0}
    .then(async (response) => {
      let object = {
        code: 200,
        status: true,
        books: response,
        totalCount: 0,
      };

      await mongo.readDataWithTotal({}).then((total) => {
        object.totalCount = total;
      });
      res.status(200).send(object);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).send({
        code: 400,
        status: false,
        books: [],
        totalCount: 0,
      });
    });
};



const getBooksByOrderID = (req, res, next) => {
  console.log(req.query)
   mongo
    .readOne(req.query)
    .then((response) => {
     console.log(response)
      let object = {
        code: 200,
        status: true,
        books: response,
      };
      res.status(200).send(object);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).send({
        code: 400,
        status: false,
        books: [],
      });
    });
};

module.exports = {
  getBooks,
  createSalesOrder,
  homePage,
  getBooksByOrderID
};
