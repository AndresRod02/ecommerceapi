const path = require("path");
const multer = require("multer");

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../public/avatar"),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, "avatar-" + uniqueSuffix + ext);
    },
  }),
}).single("avatar");

module.exports = uploadAvatar;