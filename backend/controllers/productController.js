const pool = require("../db/db");
const getAllProducts = async (
  req,
  res
) => {
  try {
    const { search } =
      req.query;

    let query = `
      SELECT *
      FROM products
      WHERE active = TRUE
    `;

    let values = [];

    if (search) {
      query += `
        AND (
          LOWER(name)
          LIKE LOWER($1)
          OR
          LOWER(category)
          LIKE LOWER($1)
          OR
          LOWER(brand)
          LIKE LOWER($1)
        )
      `;

      values.push(
        `%${search}%`
      );
    }

    query += `
      ORDER BY id DESC
    `;

    const result =
      await pool.query(
        query,
        values
      );

    res.json(
      result.rows
    );
  } catch (error) {
    console.error(
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM products
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image_url,
      brand,
      model_number,
      warranty,
      featured,
      active,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        stock,
        category,
        image_url,
        brand,
        model_number,
        warranty,
        featured,
        active
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,$11
      )
      RETURNING *
      `,
      [
        name,
        description,
        price,
        stock,
        category,
        image_url,
        brand,
        model_number,
        warranty,
        featured ?? false,
        active ?? true,
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      stock,
      category,
      image_url,
      brand,
      model_number,
      warranty,
      featured,
      active,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET
      name = $1,
      description = $2,
      price = $3,
      stock = $4,
      category = $5,
      image_url = $6,
      brand = $7,
      model_number = $8,
      warranty = $9,
      featured = $10,
      active = $11
      WHERE id = $12
      RETURNING *
      `,
      [
        name,
        description,
        price,
        stock,
        category,
        image_url,
        brand,
        model_number,
        warranty,
        featured ?? false,
        active ?? true,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE products
      SET active = FALSE
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deactivated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getAllProductsAdmin = async (
  req,
  res
) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM products
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const toggleProductStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE products
      SET active = NOT active
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  getAllProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
};