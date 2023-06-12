const { Router } = require("express");
const {addProductsToOrder} = require("../controllers/productInOrder.controllers");
const { addOrderDetailValidator } = require("../validators/orders.validators");

const router = Router();

router.post(
  "/productInOrder",
  
  addOrderDetailValidator,
  addProductsToOrder
);

module.exports = router;
