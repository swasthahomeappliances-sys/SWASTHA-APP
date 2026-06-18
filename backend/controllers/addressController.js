const pool = require("../db/db");

const getAddresses = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM addresses
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const createAddress = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO addresses
      (
        user_id,
        full_name,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        req.user.userId,
        full_name,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAddresses,
  createAddress,
};