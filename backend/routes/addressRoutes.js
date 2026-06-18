const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAddresses,
  createAddress,
} = require("../controllers/addressController");

router.get(
  "/",
  authMiddleware,
  getAddresses
);

router.post(
  "/",
  authMiddleware,
  createAddress
);

module.exports = router;