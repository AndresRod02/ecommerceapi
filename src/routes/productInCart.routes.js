const { Router } = require('express');
const {  addProductsToCart} = require('../controllers/productInCart.controllers');
const router = Router();


router.post("/productInCart", addProductsToCart);

module.exports = router;

