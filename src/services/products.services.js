const { createProducts, updateDescription, getAllProducts } = require("../repositories/products.repository")

class ProductService {
  static async createNewProduct(newProduct) {
    try {
      const product = await createProducts(newProduct);
      return product;
    } catch (error) {
      throw error
    }
  }

  

  static async updateProductDescription(description, id) {
    try {
      const product = await updateDescription(description, id);
      return product;
    } catch (error) {
      throw error
    }
  }
  static async getProducts(){
    try{
      const products = await getAllProducts()
      return products
    }
    catch(error){
      throw error
    }
  }
}

module.exports = ProductService