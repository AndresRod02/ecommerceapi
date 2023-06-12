// check --> verificar/ revisar / chequear / validar
const { check } = require("express-validator");
const validateResult = require("../utils/validate");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];


const createUserValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("username es obligatorio")
    .notEmpty()
    .withMessage("username no debe estar vacio")
    .isString()
    .withMessage("username debe ser string")
    .isLength({ min: 6, max: 30 })
    .withMessage("username debe tener minimo 6 caracteres y máximo 30"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("email es obligatorio")
    .notEmpty()
    .withMessage("email no puede estar vacio")
    .isString()
    .withMessage("email debe ser un string")
    .isEmail()
    .withMessage("email no tiene formato de correo")
    .isLength({min: 10, max: 50})
    .withMessage("email debe tener minimo 10 caracteres y máximo 50"),
  check("password", "Error con el password")
    .exists()
    .withMessage("password es obligatorio")
    .notEmpty()
    .withMessage("password no puede estar vacio")
    .isString()
    .withMessage("El password debe ser un string")
    .isLength({ min: 8 })
    .withMessage("El password debe tener minimo 8 caracteres"),
  check("avatar", "Error con el campo avatar")
  .custom((value, { req }) => {
    if (req.body.file) {
      const fileExtension = path.extname(req.body.file.originalname).toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        throw new Error(
          "El archivo debe ser una imagen (formatos permitidos: JPG, JPEG, PNG, WEBP)"
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
          "../public/avatar",
          req.file.filename
        );
        fs.unlinkSync(filePath);
      }
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

const loginUserValidator = [
  check("email", "Error con el campo email")
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 10, max: 50 }),
  check("password", "Error con el campo password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 4 }),
  validateResult,
];

const updateUserValidator = [
  check("avatar", "Error con el campo avatar")
  .custom((value, { req }) => {
    if (req.file) {
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        const filePath = path.join(
          __dirname,
          "../public/avatar",
          req.file.filename
        );
        fs.unlinkSync(filePath);
        throw new Error(
          "El avatar debe ser una imagen (formatos permitidos: JPG, JPEG, PNG, WEBP)"
        );
      }
    }

    return true;
  }),
  check("username", "Error con el campo username")
  .custom((value, { req }) => {
    if (value) {
      const usernameLength = value.length;
      const minLength = 6;
      const maxLength = 30;

      if (usernameLength < minLength || usernameLength > maxLength) {
        const filePath = path.join(
          __dirname,
          "../public/avatar",
          req.file.filename
        );
        fs.unlinkSync(filePath);
        throw new Error(
          "Debe tener una longitud de mínimo 6 caracteres y máximo 30"
        );
        
      }
    }

    return true;
  }),
  validateResult,
];

const validateEmailValidator = [
  check("token", "Error con el campo token")
    .exists()
    .withMessage("token es obligatorio")
    .notEmpty()
    .withMessage("token no puede estar vacio")
    .isString()
    .withMessage("El token debe ser un string"),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  loginUserValidator,
  validateEmailValidator,
};
