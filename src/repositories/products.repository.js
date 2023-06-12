const Products = require("../models/products.model.js");
const path = require("path");
const fs = require("fs");
const Users = require("../models/users.model.js");
const { where } = require("sequelize");
const { Op } = require("sequelize");

const isNameTaken = async(newProduct)=>{
  const productName = await Products.findOne({
    where: {name: newProduct.name}
  })
  return !!productName
}

const createProducts = async (newProduct) => {
  console.log(newProduct)
  const isTaken = await isNameTaken(newProduct)
  if(isTaken){  
        const filePath = path.join(
          __dirname,
          "../public/products",
          newProduct.productImage
        );
        fs.unlinkSync(filePath);
    throw new Error("Ya existe un producto con este nombre")

  }
  const product = await Products.create(newProduct);
  return product;
}

const updateDescription = async (description, id) => {
  const product = await Products.update({
    description: description
  }, {
    where: { id }
  })
  return product;
}

const getAllProducts = async () => {
  const products = await Products.findAll({
    where: {
      quantity: {
        [Op.gt]: 0,
      },
    },
    include: [
      {
        model: Users,
        attributes: [["username", "seller"]],
      },
    ],
    raw: true,
  });
  return products;
};


module.exports = { createProducts, updateDescription, getAllProducts }