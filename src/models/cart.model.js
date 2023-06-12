const { DataTypes } = require("sequelize");
const db = require("../utils/database");


const Cart = db.define(
  "cart",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    totalPrice: {
      type: DataTypes.REAL,
      defaultValue: 0.0,
      field: "total_price"
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cart