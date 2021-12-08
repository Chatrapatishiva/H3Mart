const express = require('express');

const router  = express.Router(); 
const ProductController = require('../controller/controller'); 
router.post('/create', ProductController.createSalesOrder); 
router.get('/books', ProductController.getBooks); 
router.get('/get-orders', ProductController.getBooksByOrderID); 

router.get('/', ProductController.homePage); 

module.exports = router; 
