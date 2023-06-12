const {createCart, updateTotalPriceCart} = require("../repositories/cart.repository")

class CartServices {
    static async createNewCart(newCart) {
        try {
            const cart = await createCart(newCart)
            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async updateTotalPrice(price, id) {
        try {
            const cart = await updateTotalPriceCart(price, id);
            return cart;
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartServices