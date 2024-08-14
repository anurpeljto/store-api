const express = require('express');
const router = express.Router();
const ProductControllerClass = require('../controllers/products');

const ProductController = new ProductControllerClass();

router.route('/').get(ProductController.getAllProducts);
router.route('/static').get(ProductController.getAllProductsStatic)

module.exports = router;