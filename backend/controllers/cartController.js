const pool = require("../db/db");

const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
      cart_items.id,
      cart_items.quantity,
      products.id as product_id,
      products.name,
      products.price,
      products.stock,
      products.image_url
      FROM cart_items
      JOIN products
      ON cart_items.product_id = products.id
      WHERE cart_items.user_id = $1
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      productId,
      quantity,
    } = req.body;

    const existing =
      await pool.query(
        `
        SELECT *
        FROM cart_items
        WHERE user_id=$1
        AND product_id=$2
        `,
        [userId, productId]
      );

    if (
      existing.rows.length >
      0
    ) {
      const updated =
        await pool.query(
          `
          UPDATE cart_items
          SET quantity = quantity + $1
          WHERE user_id=$2
          AND product_id=$3
          RETURNING *
          `,
          [
            quantity,
            userId,
            productId,
          ]
        );

      return res.json(
        updated.rows[0]
      );
    }

    const result =
      await pool.query(
        `
        INSERT INTO cart_items
        (
          user_id,
          product_id,
          quantity
        )
        VALUES ($1,$2,$3)
        RETURNING *
        `,
        [
          userId,
          productId,
          quantity,
        ]
      );

    res.status(201).json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateCartQuantity =
  async (req, res) => {
    try {
      const userId =
        req.user.userId;

      const { id } =
        req.params;

      const {
        quantity,
      } = req.body;

      if (
        quantity < 1
      ) {
        return res
          .status(400)
          .json({
            message:
              "Quantity must be at least 1",
          });
      }

      const result =
        await pool.query(
          `
          UPDATE cart_items
          SET quantity = $1
          WHERE id = $2
          AND user_id = $3
          RETURNING *
          `,
          [
            quantity,
            id,
            userId,
          ]
        );

      res.json(
        result.rows[0]
      );
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

const deleteCartItem =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      await pool.query(
        `
        DELETE FROM cart_items
        WHERE id = $1
        `,
        [id]
      );

      res.json({
        message:
          "Item removed",
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

module.exports = {
  getCart,
  addToCart,
  deleteCartItem,
  updateCartQuantity,
};