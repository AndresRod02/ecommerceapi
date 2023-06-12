const {
  createProductInOrder,
  getOneProductInOrder,
  updateTotalInOrder,
  updateQuantityInOrder,
  getOrderDetailsByOrderId,
} = require("../repositories/productInOrder.repository");

class ProductInOrder {
  static async createProductInOrder(dataProductInCart) {
    try {
      const product = await getOneProductInOrder(dataProductInCart);
      await updateTotalInOrder(
        dataProductInCart.price,
        dataProductInCart.orderId
      );
      if (!product) {
        return await createProductInOrder(dataProductInCart);
      }
      return await updateQuantityInOrder(
        dataProductInCart.productId,
        dataProductInCart.orderId
      );
    } catch (error) {
      throw error;
    }
  }

  static async getProductDetails(orderId) {
    try {
      return await getOrderDetailsByOrderId(orderId);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = ProductInOrder;
