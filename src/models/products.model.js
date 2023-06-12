const db = require("../utils/database");
const { DataTypes } = require("sequelize");


const Products = db.define(
  "products",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    productImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "product_image"
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Products
