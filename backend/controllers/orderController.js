
const crypto =
  require("crypto");

const pool =
  require("../db/db");

const razorpay =
  require(
    "../config/razorpay"
  );

const getAdminOrders =
  async (req, res) => {
    try {
      const result =
        await pool.query(`
          SELECT
            o.*,
            STRING_AGG(
              p.name,
              ', '
            ) AS products
          FROM orders o
          LEFT JOIN order_items oi
            ON oi.order_id = o.id
          LEFT JOIN products p
            ON p.id = oi.product_id
          GROUP BY o.id
          ORDER BY o.created_at DESC
        `);

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

const updateOrderStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        order_status,
      } = req.body;

      const result =
        await pool.query(
          `
          UPDATE orders
          SET order_status=$1
          WHERE id=$2
          RETURNING *
          `,
          [
            order_status,
            id,
          ]
        );

      res.json(
        result.rows[0]
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
const getAdminOrderById =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const orderResult =
        await pool.query(
          `
          SELECT *
          FROM orders
          WHERE id = $1
          `,
          [id]
        );

      if (
        orderResult.rows
          .length === 0
      ) {
        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      const itemsResult =
        await pool.query(
          `
          SELECT
            oi.*,
            p.name,
            p.brand,
            p.model_number,
            p.image_url
          FROM order_items oi
          JOIN products p
          ON oi.product_id = p.id
          WHERE oi.order_id = $1
          `,
          [id]
        );

      res.json({
        order:
          orderResult.rows[0],

        items:
          itemsResult.rows,
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
const createOrder =
  async (req, res) => {
    const client =
      await pool.connect();

    try {
      await client.query(
        "BEGIN"
      );

      const userId =
        req.user.userId;

      const {
        full_name,
        phone,
        email,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        notes,
      } = req.body;

      const cartResult =
        await client.query(
          `
          SELECT
          c.*,
          p.price
          FROM cart_items c
          JOIN products p
          ON c.product_id = p.id
          WHERE c.user_id = $1
          `,
          [userId]
        );

      const cartItems =
        cartResult.rows;

      if (
        cartItems.length ===
        0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Cart is empty",
          });
      }

      const total =
        cartItems.reduce(
          (
            sum,
            item
          ) =>
            sum +
            Number(
              item.price
            ) *
              Number(
                item.quantity
              ),
          0
        );

      console.log(
  "KEY:",
  process.env.RAZORPAY_KEY_ID
);

let razorpayOrder;

try {
  razorpayOrder =
    await razorpay.orders.create({
      amount:
        Math.round(
          total * 100
        ),
      currency:
        "INR",
    });

  console.log(
    "Razorpay Order Created:",
    razorpayOrder
  );
} catch (err) {
  console.error(
    "RAZORPAY ERROR:",
    err
  );

  throw err;
}

      const orderResult =
        await client.query(
          `
          INSERT INTO orders
          (
            user_id,
            total,
            payment_status,
            order_status,
            razorpay_order_id,
            full_name,
            phone,
            email,
            address_line1,
            address_line2,
            city,
            state,
            pincode,
            notes,
            payment_method
          )
          VALUES
          (
            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15
          )
          RETURNING *
          `,
          [
            userId,
            total,
            "PENDING",
            "PLACED",
            razorpayOrder.id,
            full_name,
            phone,
            email,
            address_line1,
            address_line2,
            city,
            state,
            pincode,
            notes,
            "RAZORPAY",
          ]
        );
        
      const order =
        orderResult.rows[0];

      for (const item of cartItems) {
        await client.query(
          `
          INSERT INTO order_items
          (
            order_id,
            product_id,
            quantity,
            price
          )
          VALUES
          ($1,$2,$3,$4)
          `,
          [
            order.id,
            item.product_id,
            item.quantity,
            item.price,
          ]
        );
        await client.query(
  `
  UPDATE products
  SET stock =
    stock - $1
  WHERE id = $2
  `,
  [
    item.quantity,
    item.product_id,
  ]
);
      }

      await client.query(
        "COMMIT"
      );

      res.json({
        orderId:
          order.id,
        razorpayOrderId:
          razorpayOrder.id,
        amount:
          razorpayOrder.amount,
      });
    } catch (error) {
      await client.query(
        "ROLLBACK"
      );

      console.error(
        error
      );

      res.status(
        500
      ).json({
        message:
          "Server Error",
      });
    } finally {
      client.release();
    }
  };
const getMyOrders =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT *
          FROM orders
          WHERE user_id = $1
          ORDER BY created_at DESC
          `,
          [req.user.userId]
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
const verifyPayment =
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
              "|" +
              razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res
          .status(400)
          .json({
            message:
              "Invalid Payment",
          });
      }

      await pool.query(
        `
        UPDATE orders
        SET
        payment_status='PAID',
        razorpay_payment_id=$1
        WHERE razorpay_order_id=$2
        `,
        [
          razorpay_payment_id,
          razorpay_order_id,
        ]
      );
const orderResult =
  await pool.query(
    `
    SELECT user_id
    FROM orders
    WHERE razorpay_order_id = $1
    `,
    [razorpay_order_id]
  );

await pool.query(
  `
  DELETE FROM cart_items
  WHERE user_id = $1
  `,
  [
    orderResult.rows[0]
      .user_id,
  ]
);
      res.json({
        success: true,
      });
    } catch (error) {
      console.error(
        error
      );

      res.status(
        500
      ).json({
        message:
          "Server Error",
      });
    }
  };


  module.exports = {
  createOrder,
  verifyPayment,
  getMyOrders,
  getAdminOrders,
  updateOrderStatus,
    getAdminOrderById,
};

