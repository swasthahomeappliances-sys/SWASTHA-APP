const pool =
  require("../db/db");

const getAdvertisements =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT *
          FROM advertisements
          WHERE active = true
          ORDER BY id DESC
          `
        );

      res.json(
        result.rows
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

const getAllAdvertisements =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT *
          FROM advertisements
          ORDER BY id DESC
          `
        );

      res.json(
        result.rows
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

const createAdvertisement =
  async (req, res) => {
    try {
      const {
        title,
        description,
        media_type,
        image_url,
        video_url,
        button_text,
        product_id,
      } = req.body;

      const result =
        await pool.query(
          `
          INSERT INTO advertisements
          (
            title,
            description,
            media_type,
            image_url,
            video_url,
            button_text,
            product_id,
            active
          )
          VALUES
          (
            $1,$2,$3,$4,$5,$6,$7,true
          )
          RETURNING *
          `,
          [
            title,
            description,
            media_type,
            image_url,
            video_url,
            button_text,
            product_id,
          ]
        );

      res.status(201).json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

const toggleAdvertisement =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const result =
        await pool.query(
          `
          UPDATE advertisements
          SET active = NOT active
          WHERE id = $1
          RETURNING *
          `,
          [id]
        );

      res.json(
        result.rows[0]
      );
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

const deleteAdvertisement =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      await pool.query(
        `
        DELETE FROM advertisements
        WHERE id = $1
        `,
        [id]
      );

      res.json({
        message:
          "Advertisement Deleted",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  getAdvertisements,
  getAllAdvertisements,
  createAdvertisement,
  toggleAdvertisement,
  deleteAdvertisement,
};