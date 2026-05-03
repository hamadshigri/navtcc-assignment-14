const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", protect, getProducts);
router.get("/:id", protect, getSingleProduct);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;