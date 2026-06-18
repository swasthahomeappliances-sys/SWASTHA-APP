
const express =
  require("express");

const adminMiddleware =
  require(
    "../middleware/adminMiddleware"
  );

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  createOrder,
  verifyPayment,
  getMyOrders,
   getAdminOrders,
  updateOrderStatus,
    getAdminOrderById,
} = require(
  "../controllers/orderController"
);
router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);
router.post(
  "/create",
  authMiddleware,
  createOrder
);

router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);
router.get(
  "/admin",
  adminMiddleware,
  getAdminOrders
);
router.get(
  "/admin/:id",
  adminMiddleware,
  getAdminOrderById
);
router.patch(
  "/admin/:id/status",
  adminMiddleware,
  updateOrderStatus
);

module.exports =
  router;
