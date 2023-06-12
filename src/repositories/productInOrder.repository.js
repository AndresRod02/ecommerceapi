const { Op } = require("sequelize");
const ProductInOrder = require("../models/ProductInOrder.model.js");
const Products = require("../models/products.model.js");

const createProductInOrder = async (productInOrder) => {
  const order = await ProductInOrder.create(productInOrder);
  return order;
};

const getOneProductInOrder = async (dataProductInCart) => {
  const product = await ProductInOrder.findOne({
    where: {
      [Op.and]: [
        { productId: dataProductInCart.productId },
        { orderId: dataProductInCart.orderId },
      ],
    },
  });
  return product;
};

const updateTotalInOrder = async (price, orderId) => {
  const productInOrder = await ProductInOrder.increment(
    { price: price },
    {
      where: { orderId },
    }
  );
  return productInOrder;
};

const updateQuantityInOrder = async (productId, orderId) => {
  const product = await ProductInOrder.increment(
    {
      quantity: 1,
    },
    {
      where: {
        [Op.and]: [{ productId: productId }, { orderId: orderId }],
      },
    }
  );
  return product;
};

const getOrderDetailsByOrderId = async (orderId) => {
  const order = await ProductInOrder.findAll({
    where: { orderId },
    include: [
      {
        model: Products,
        attributes: {
          exclude: ["userId", "description", "status", "available"],
        },
      },
    ],
  });
  return order;
};

module.exports = {
  createProductInOrder,
  getOneProductInOrder,
  updateTotalInOrder,
  updateQuantityInOrder,
  getOrderDetailsByOrderId,
};
