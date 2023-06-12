const { Router } = require('express');
const {  addProductsToCart} = require('../controllers/productInCart.controllers');
const authenticate = require("../middlewares/auth.middleware");

const router = Router();


router.post("/productInCart",authenticate, addProductsToCart);

module.exports = router;

