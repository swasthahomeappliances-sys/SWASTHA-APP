const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} = require("../controllers/productController");

const adminMiddleware = require("../middleware/adminMiddleware");

/*
  Public Routes
*/

router.get("/", getAllProducts);
router.get(
  "/admin/all",
  adminMiddleware,
  getAllProductsAdmin
);
router.get("/:id", getProductById);

/*
  Admin Routes
*/



router.post(
  "/",
  adminMiddleware,
  createProduct
);

router.put(
  "/:id",
  adminMiddleware,
  updateProduct
);

router.patch(
  "/:id/toggle-status",
  adminMiddleware,
  toggleProductStatus
);

router.delete(
  "/:id",
  adminMiddleware,
  deleteProduct
);

module.exports = router;