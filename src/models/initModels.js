const Users = require("./users.model");
const Cart = require("./cart.model")
const Products = require("./products.model")
const ProductInCart = require("./productInCart.model")
const Orders = require("./orders.model")
const ProductInOrder = require("./ProductInOrder.model")

const initModels = () => {

  Products.belongsTo(Users, {foreignKey: "userId"});
  Users.hasMany(Products, {foreignKey: "userId"});

  Users.hasOne(Cart, {foreignKey:"userId"});
  Cart.hasOne(Users, {foreignKey: "userId"});

  Orders.belongsTo(Users, {foreignKey:"userId"});
  Users.hasMany(Orders, {foreignKey:"userId"});

  ProductInCart.belongsTo(Cart, {foreignKey:"cartId"});
  Cart.hasMany(ProductInCart, {foreignKey:"cartId"});

  ProductInCart.belongsTo(Products, {foreignKey:"productId"});
  Products.hasMany(ProductInCart, {foreignKey:"productId"});
  
  ProductInOrder.belongsTo(Orders, {foreignKey: "orderId"});
  Orders.hasMany(ProductInOrder, {foreignKey: "orderId"});

  ProductInOrder.belongsTo(Products, {foreignKey:"productId"});
  Products.hasMany(ProductInOrder, {foreignKey: "productId"});


};

module.exports = initModels;

