const express = require("express");
const {
  getAnalytics,
} = require(
  "../controllers/adminAnalyticsController"
);

const adminMiddleware =
  require(
    "../middleware/adminMiddleware"
  );
const router = express.Router();

const {
  adminLogin,
} = require(
  "../controllers/adminController"
);

router.post(
  "/login",
  adminLogin
);
router.get(
  "/analytics",
  adminMiddleware,
  getAnalytics
);
module.exports = router;