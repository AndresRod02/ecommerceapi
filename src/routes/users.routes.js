// Router de express
const { Router } = require("express");
const {
  createUser,
  login,
  validateEmail,
  updateUser,
  getUserbyId
} = require("../controllers/users.controllers");
const {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
  validateEmailValidator,
} = require("../validators/user.validators");
const uploadAvatar = require("../middlewares/multer.middleware");


const router = Router();

router.post("/users", createUserValidator, createUser);

router.post("/users/login", loginUserValidator, login);

router.post("/users/email-validate",validateEmailValidator, validateEmail);

router.put(
  "/users/:id",
  uploadAvatar,
  updateUserValidator,
  updateUser
);

router.get("/users/:id/cart", getUserbyId);

module.exports = router;
