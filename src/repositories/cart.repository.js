const Cart = require("../models/cart.model.js")

const createCart = async (newCart) => {
    const cart = await Cart.create(newCart)
    return cart;
}

const updateTotalPriceCart = async (price, id) => {
    if(price === 0) {
        const cart = await Cart.update({totalPrice: price},{
            where: {id}
        })
        return cart;
    }
    const cart = await Cart.increment({totalPrice: price}, {
        where: {id}
    })
    return cart;
}

module.exports = {
    createCart,
    updateTotalPriceCart
}

