const ProductInCartServices = require("../services/productInCart.services");
const CartServices = require("../services/cart.services")


const addProductsToCart = async (req, res, next) => {
  try {
    const { cartId, productId, quantity, price } = req.body;
    await ProductInCartServices.addNewProducts({
      cartId,
      productId,
      quantity,
      price,
    })
    res.status(201).send()
    await CartServices.updateTotalPrice(price, cartId);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  addProductsToCart
}