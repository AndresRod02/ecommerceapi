const { Router } = require("express");

const {
  createOrder,
  completedOrder,
  getOrdersByUser,
} = require("../controllers/orders.controllers");
const {
  createOrderValidator,
  completedOrderValidator,
} = require("../validators/orders.validators");

const router = Router();

router.post(
  "/orders",
  createOrderValidator,
  createOrder
);
router.put(
  "/orders/:id",
  completedOrderValidator,
  completedOrder
);
router.get("/orders/:userId", getOrdersByUser)

module.exports = router;
