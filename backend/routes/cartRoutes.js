const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
  getCart,
  addToCart,
  deleteCartItem,
  updateCartQuantity,
} = require("../controllers/cartController");

router.get(
  "/",
  authMiddleware,
  getCart
);

router.post(
  "/",
  authMiddleware,
  addToCart
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCartItem
);

router.patch(
  "/:id",
  authMiddleware,
  updateCartQuantity
);

module.exports = router;