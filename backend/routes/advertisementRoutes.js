const express =
  require("express");

const router =
  express.Router();

const adminMiddleware =
  require(
    "../middleware/adminMiddleware"
  );

const {
  getAdvertisements,
  getAllAdvertisements,
  createAdvertisement,
  toggleAdvertisement,
  deleteAdvertisement,
} = require(
  "../controllers/advertisementController"
);

/*
  Public Routes
*/

router.get(
  "/",
  getAdvertisements
);

/*
  Admin Routes
*/

router.get(
  "/admin/all",
  adminMiddleware,
  getAllAdvertisements
);

router.post(
  "/",
  adminMiddleware,
  createAdvertisement
);

router.patch(
  "/:id/toggle",
  adminMiddleware,
  toggleAdvertisement
);

router.delete(
  "/:id",
  adminMiddleware,
  deleteAdvertisement
);

module.exports =
  router;