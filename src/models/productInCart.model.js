const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const ProductInCart = db.define(
  "product_in_cart",
  {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cart_id"
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id"
    },
    quantity: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = ProductInCart