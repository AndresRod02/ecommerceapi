const {createUser, loginUser,getUserById, validateEmail, updateUser, getUserbyIdAndProductsInCart} = require("../repositories/users.repository")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserServices {
  static async createNewUser(newUser) {
    try {
      const user = await createUser(newUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async hashed(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  static async verifyToken(username, email) {
    const verifyToken = jwt.sign(
      { username, email },
      process.env.JWT_SECRET_EMAIL_VALIDATION,
      {
        algorithm: "HS512",
        expiresIn: "1000h",
      }
    );
    return verifyToken;
  }

  static async login(email) {
    try {
      const user = await loginUser(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(user, next) {
    if (!user) {
      return next({
        status: 400,
        name: "Invalid email",
        message: "user not exist",
      });
    }
  }

  static async verifyEmail(user, next) {
    if (!user.validUser) {
      return next({
        status: 400,
        name: "email is not verified",
        message: "User needs verified his/her email",
      });
    }
  }

  static async validPassword(password, user, next) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({
        status: 400,
        name: "Invalid password",
        message: "The password does not match with user email",
      });
    }
  }

  static async token(userData) {
    const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
      algorithm: "HS512",
      expiresIn: "1000h",
    });
    return token;
  }

  static async validEmail(decoded) {
    try {
      const user = await validateEmail(decoded);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async decoded(token, next) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VALIDATION, {
      algorithms: "HS512",
    });
    if (!decoded) {
      return next({
        status: 400,
        name: "Error de verificación",
        message: "Algo sucedio con la verificació, solicite nuevamente",
      });
    }
    return decoded;
  }
  static async updateUser(filename, username, id) {
    try {
      const user = await updateUser(filename, username, id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getProductsInCart(id) {
    try {
      const user = await getUserbyIdAndProductsInCart(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findUserById(id) {
    try {
      const user = await getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;