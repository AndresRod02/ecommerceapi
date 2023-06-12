const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar:{
      type: DataTypes.TEXT
    },
    validUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "valid_user",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Users;
