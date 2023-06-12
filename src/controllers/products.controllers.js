const ProductService = require("../services/products.services");

const createProduct = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { name, description, price, quantity, userId } = req.body;

    await ProductService.createNewProduct({ name, description, price, quantity, userId, productImage: filename });
    res.status(201).send();
  } catch (error) {
    next(error)
  }
};

const updateDescription = async (req, res, next) => {
  try {
    const { description, id } = req.body;
    await ProductService.updateProductDescription(description, id);
    res.status(201).send();
  } catch (error) {
    next(error)
  }
};

const getAllProducts = async (req, res) =>{
  try {
    products = await ProductService.getProducts()
    res.status(200).json(products);
  } catch(error){
    res.status(400).json(error);
 }
};

module.exports = {
  createProduct,
  updateDescription,
  getAllProducts
}