const { Router } = require("express");
const { createProduct, updateDescription, getAllProducts } = require("../controllers/products.controllers");
const uploadProductImage = require("../middlewares/multerProducts.middleware");

const {createProductValidator, updateDescriptionValidator} = require('../validators/products.validators')

const router = Router();

router.post("/products", uploadProductImage, createProductValidator, createProduct);
router.get("/products", getAllProducts)
router.put("/products",updateDescriptionValidator, updateDescription);

module.exports = router;

