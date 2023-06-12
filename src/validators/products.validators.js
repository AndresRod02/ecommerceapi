const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const createProductValidator = [
  check("name", "Error con el campo name")
    .exists()
    .withMessage("name es obligatorio")
    .notEmpty()
    .withMessage("Debes incluir un nombre de producto")
    .isString()
    .withMessage("Debe ser un string")
    .isLength({ min: 4, max: 30 })
    .withMessage(
      "El nombre del producto debe tener minimo 4 caracteres y máximo 30"
    ),
  check("description", "Error con el campo descripcion")
    .exists()
    .withMessage("description es obligatorio")
    .notEmpty()
    .withMessage("Debes incluir una descripción"),
  check("price", "Error con el campo price")
    .exists()
    .withMessage("description es obligatorio")
    .notEmpty()
    .withMessage("description no debe ir vacío")
    .isFloat({ gt: 0 })
    .withMessage("price debe ser un número positivo"),
  check("quantity", "Error con el campo quantity")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("quantity debe ser un número positivo"),
  check("status", "Error con el campo status")
    .if((value, { req }) => req.body.hasOwnProperty("status"))
    .isBoolean()
    .withMessage("status debe ser un valor booleano"),
  check("userId", "Error con el campo userId")
    .exists()
    .withMessage("userId es obligatorio")
    .notEmpty()
    .withMessage("userId debe tener un valor")
    .isInt()
    .withMessage("userId debe ser un número entero"),
  check("productImage", "Error con el campo productImage")
  .custom((value, { req }) => {
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        const filePath = path.join(
          __dirname,
          "../public/products",
          req.file.filename
        );
        console.log(filePath)
        fs.unlinkSync(filePath);
        throw new Error(
          "imageProduct debe ser una imagen (formatos permitidos: JPG, JPEG, PNG, WEBP)"
        );
      }
    }

    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "../public/products",
          req.file.filename
        );
        fs.unlinkSync(filePath);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

const updateDescriptionValidator = [
  check("description", "Error en el campo description")
    .exists()
    .withMessage("description es obligatorio")
    .notEmpty()
    .withMessage("description no debe ir vacío")
    .isString()
    .withMessage("description debe ser un string"),
  check("id", "Error en el campo id")
    .exists()
    .withMessage("id es obligatorio")
    .notEmpty()
    .withMessage("id debe contener un valor")
    .isInt()
    .withMessage("id debe ser un número entero"),
];

module.exports = { createProductValidator, updateDescriptionValidator };
