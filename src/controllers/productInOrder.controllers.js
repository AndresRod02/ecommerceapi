const ProductInOrder = require("../services/productInOrder.services");

const addProductsToOrder = async (req, res, next) => {
  try {
    const { orderId, productId, quantity, price } = req.body;
    await ProductInOrder.createProductInOrder({
      orderId,
      productId,
      quantity,
      price,
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProductsToOrder,
};
