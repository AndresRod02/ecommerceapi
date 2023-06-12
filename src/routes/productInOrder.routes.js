const { Router } = require("express");
const {addProductsToOrder} = require("../controllers/productInOrder.controllers");
const { addOrderDetailValidator } = require("../validators/orders.validators");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post(
  "/productInOrder",
  authenticate,
  addOrderDetailValidator,
  addProductsToOrder
);

module.exports = router;
