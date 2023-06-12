const OrderServices = require("../services/orders.services");
const ProductInCartServices = require("../services/productInCart.services")
const CartServices = require("../services/cart.services")
const ProductInOrder = require("../services/productInOrder.services")
const { sendPurchaseOrderMail } = require("../utils/sendMails");

const getOrdersByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orderByUser = await OrderServices.getOrderByUser(userId);
    res.json(orderByUser);
  } catch (error) {
    next(error)
  }
};

const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;
    await OrderServices.createOrder(orderData);
    res.status(201).send();
  } catch (error) {
    next(error)
  }
};

const completedOrder = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {cartId, email} = req.body;
    await OrderServices.updateStatus(id);
    res.status(201).send();
    
    await ProductInCartServices.clearProductInCart({cartId});
    await CartServices.updateTotalPrice(0, cartId)
    const detailsProduct = await ProductInOrder.getProductDetails(id);
    sendPurchaseOrderMail(email, { detailsProduct });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOrdersByUser,
  createOrder,
  completedOrder
}