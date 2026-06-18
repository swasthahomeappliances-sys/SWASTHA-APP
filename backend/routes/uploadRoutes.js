const express = require("express");
const multer = require("multer");

const cloudinary =
  require("../config/cloudinary");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const router =
  express.Router();

const storage =
  multer.memoryStorage();

const upload =
  multer({
    storage,
  });

router.post(
  "/",
  adminMiddleware,
  upload.single("file"),

  async (req, res) => {
    try {
      const base64 =
        Buffer.from(
          req.file.buffer
        ).toString(
          "base64"
        );

      const dataURI =
        `data:${req.file.mimetype};base64,${base64}`;

      const result =
        await cloudinary.uploader.upload(
          dataURI,
          {
            folder:
  "swastha-media",
resource_type:
  "auto"
          }
        );

      res.json({
        url:
          result.secure_url,
           resource_type:
    result.resource_type,
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(
        500
      ).json({
        message:
          "Upload Failed",
      });
    }
  }
);

module.exports =
  router;