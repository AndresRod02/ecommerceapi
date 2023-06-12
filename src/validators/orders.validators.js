const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createOrderValidator = [
  check("userId", "Error en el campo userId")
    .exists()
    .withMessage("userId es obligatorio")
    .notEmpty()
    .withMessage("userId debe tener algún valor")
    .isInt()
    .withMessage("userId debe ser un número entero"),
  check("totalPrice", "Error en el campo totalPrice")
    .exists()
    .withMessage("totalPrice es obligatorio")
    .notEmpty()
    .withMessage("totalPrice no puede estar vacío")
    .isFloat()
    .withMessage("totalPrice debe ser un número Real"),
  check("status", "Error en el campo status")
    .isBoolean()
    .withMessage("status debe contener un valor booleano"),
  validateResult,
];

const completedOrderValidator = [
  check("cartId", "Error en el campo cartId")
    .exists()
    .withMessage("cartId es obligatorio")
    .notEmpty()
    .withMessage("cartId no debe ir vacío")
    .isInt()
    .withMessage("cartId debe ser un número entero"),
  validateResult,
];

const addOrderDetailValidator = [
  check("orderId", "Error en el campo orderId")
    .exists()
    .withMessage("orderId es obligatorio")
    .notEmpty()
    .withMessage("orderId debe tener un valor")
    .isInt()
    .withMessage("orderId debe ser un número entero"),
  check("productId", "Error en el campo productId")
    .exists()
    .withMessage("productId es obligatorio")
    .notEmpty()
    .withMessage("productId debe tener un valor")
    .isInt()
    .withMessage("productId debe ser un número entero"),
  check("price", "Error en el campo price")
    .exists()
    .withMessage("price es obligatorio")
    .notEmpty()
    .withMessage("price debe tener un valor")
    .isFloat()
    .withMessage("price debe ser un número Real"),
  validateResult,
];

module.exports = {
  createOrderValidator,
  completedOrderValidator,
  addOrderDetailValidator,
};
