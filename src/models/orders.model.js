const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Orders = db.define(
  "orders",
  {
    totalPrice: {
      type: DataTypes.REAL,
      allowNull: false,
      field: "total_price"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
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

module.exports = Orders;