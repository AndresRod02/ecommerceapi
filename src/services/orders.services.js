const { getOrderByUser, createOrder, updateStatusOrder } = require("../repositories/orders.repository");

class OrderServices {
  static async getOrderByUser(userId) {
    try {
      return await getOrderByUser(userId);
    } catch (error) {
      throw error
    }
  }
  static async createOrder(orderData) {
    try {
      return await createOrder(orderData);
    } catch (error) {
      throw error
    }
  }
  static async updateStatus(id) {
    try{
      const order = await updateStatusOrder(id)
    } catch (error) {
      throw error
    }
  }
}

module.exports = OrderServices