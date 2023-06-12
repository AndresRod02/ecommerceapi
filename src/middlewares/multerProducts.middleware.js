const path = require("path");
const multer = require("multer");

const uploadProductImage = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../public/products"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, "productImage-" + uniqueSuffix + ext);
    },
  }),
}).single("productImage");

module.exports = uploadProductImage