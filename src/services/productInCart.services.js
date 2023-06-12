const {
  createProductInCart,
  getOneProduct,
  updateTotal,
  updateQantity,
  purchaseProduct,
  clearProductInCart,
} = require("../repositories/productInCart.repository");
class ProductInCartServices {
  static async createProductInCart(dataProductInCart) {
    return await createProductInCart(dataProductInCart);
  }

  static async addNewProducts(data) {
    try {
      const product = await getOneProduct(data.productId);
      await updateTotal(data.price, data.productId);
      if (!product || product.dataValues.status) {
        return await createProductInCart(data);
      }
      return await updateQantity(data.productId);
    } catch (error) {
      throw error;
    }
  }
static async clearProductInCart(dataProduct) {
    try {
      await purchaseProduct(dataProduct);
      const listCart = await clearProductInCart(dataProduct.cartId);
      return listCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductInCartServices
