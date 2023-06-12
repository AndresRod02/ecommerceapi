const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const addToCartValidator = [
  check("cartId", "Error con el campo cartId")
    .exists()
    .withMessage("cartId es obligatorio")
    .notEmpty()
    .withMessage("cartId debe tener un valor")
    .isInt()
    .withMessage("CartId debe ser un número entero"),
  check("productId", "Error con el campo productId")
    .exists()
    .withMessage("productId  es obligatorio")
    .notEmpty()
    .withMessage("productId debe tener un valor")
    .isInt()
    .withMessage("productId debe ser un número entero"),
  check("quantity", "Error con el campo quantity")
    .isFloat({ gt: 0 })
    .withMessage("quantity debe ser un número positivo"),
  check("price", "Error con el campo price")
    .exists()
    .withMessage("price es obligatorio")
    .notEmpty()
    .withMessage("price debe tener un valor")
    .isFloat({ gt: 0 })
    .withMessage("price debe ser un número positivo"),
  check("status", "Error con el campo status")
  .isBoolean()
  .withMessage("Debe ser un valor booleano"),
  validateResult,
];

module.exports = {
  addToCartValidator,
};
