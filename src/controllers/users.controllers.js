const UserServices = require("../services/users.services")
const { sendWelcomeMail } = require("../utils/sendMails");
require("dotenv").config();
const CartServices = require("../services/cart.services")

const createUser = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const hash = await UserServices.hashed(password)
    const user = await UserServices.createNewUser({username, email, password:hash});
    await CartServices.createNewCart({userId: user.dataValues.id});
    const vt = await UserServices.verifyToken(username, email)
    sendWelcomeMail(email, { username, vt });
    res.status(201).send()
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.login(email)
    await UserServices.verifyUser(user, next);
    await UserServices.verifyEmail(user, next);
    await UserServices.validPassword(password, user, next)
    const {id, username, rolId } = user;
    const userData = {id, username, email, rolId };
    const token = await UserServices.token(userData)
    userData.token = token;
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = await UserServices.decoded(token, next)
    await UserServices.validEmail(decoded)
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  
  try {
    const { id } = req.params;
    const { username } = req.body;
    const {filename} = req.file
    await UserServices.updateUser(filename, username, id);
    res.status(201).json({ message: "Actualización exitosa" });
  } catch (error) {
    next(error);
  }
};

const getUserbyId = async (req, res, next) =>{
  try{
    const {id} = req.params;
    const user = await UserServices.getProductsInCart(id);
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  login,
  validateEmail,
  updateUser,
  getUserbyId
};

// alguien esta editando
