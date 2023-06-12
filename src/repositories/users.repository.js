const Users = require("../models/users.model.js");
const ProductsInCart = require("../models/productInCart.model.js")
const Products = require("../models/products.model.js");
const Cart = require("../models/cart.model.js");
const path = require("path");
const fs = require("fs");
const createUser = async (newUser) => {
    const user = await Users.create(newUser);
    return user;
}

const loginUser = async (email) => {
    const user = await Users.findOne({
        where: {email}
    });
    return user;
}

const validateEmail = async (decoded) => {
    const user = await Users.update(
        { validUser: true },
        {
          where: { email: decoded.email },
        }
      );
      return user;
}

const isUsernameTaken = async (username, id) => {
  const user = await getUserByUsername(username);

  if (user === null) {
    return false;
  } 
  else if (user.id == id) {
    return false;
  } else {
    return true;
  }
};

const updateUser = async (filename, username, id) => {
    const isTaken = await isUsernameTaken(username, id)
    if(isTaken){
        const filePath = path.join(__dirname, "../public/avatar", filename);
        fs.unlinkSync(filePath);
        throw new Error("El nombre de usuario ya está en uso")
    }
    else{
    if (filename) {
      const user = await getUserById(id);
      const previousFilename = user.avatar;
      if (previousFilename) {
        const filePath = path.join(
          __dirname,
          "../public/avatar",
          previousFilename
        );
        fs.unlinkSync(filePath);
      }
      
    }
    const user = await Users.update(
    {
      username: username,
      avatar: filename,
    },
    {
      where: { id },
    }
    );
    return user;
    }
};

const getUserbyIdAndProductsInCart = async (id) => {
    const user = await Users.findByPk(id,{
        attributes: {exclude: ["password", "validUser","avatar","userId"]},
        include: [
            {
                model: Cart,
                attributes: ["id", "totalPrice"],
                include: [
                    {
                        model: ProductsInCart,
                        where: {status: false},
                        attributes: ["quantity","price","status"],
                        include: [
                            {
                                model: Products,
                                attributes: {exclude:["available","userId"]}
                            }
                        ]
                    }
                ]
            }
        ]
    });
    return user;
}

const getUserById = async (id)=>{
    const user = await Users.findByPk(id,{
        attributes: ["avatar"]})
        return user
    }

const getUserByUsername = async(username)=>{
    const user = await Users.findOne({
      where: { username: username },
      attributes: ["username", "avatar", "id"],
    });
    return user
}
module.exports = {
    createUser,
    loginUser,
    validateEmail,
    updateUser,
    getUserbyIdAndProductsInCart,
    getUserById
}