const ProductInCart = require("../models/productInCart.model");
const { Op } = require("sequelize");

const createProductInCart = async (dataProductInCart) => {
  const productInCart = await ProductInCart.create(dataProductInCart);
  return productInCart;
}

const updateTotal = async (price, productId) => {
  const productInCart = await ProductInCart.increment({ price: price }, {
    where: { productId }
  })
  return productInCart;
}

const getOneProduct = async (productId) => {
  const product = await ProductInCart.findOne({
    where: { productId }
  });
  return product;
}

const updateQantity = async (productId) => {
  const product = await ProductInCart.increment({
    quantity: 1
  }, { where: { productId } })
  return product;
}

const getProductInCart = async () => {
  const productInCart = await ProductInCart.findAll();
  return productInCart;
}
const purchaseProduct = async (dataProduct) => {
  const order = await ProductInCart.update({
    status: true
  }, {
    where: { cartId: dataProduct.cartId }
  })
  return order;
}

const clearProductInCart = async (cartId) => {
  const productInCart = await ProductInCart.findAll({
    where: {
      [Op.and]: [{ cartId: cartId }, { status: false }],
    },
  });
  return productInCart;
};


module.exports = {
  createProductInCart,
  updateTotal,
  getOneProduct,
  updateQantity,
  getProductInCart,
  purchaseProduct,
  clearProductInCart,
};