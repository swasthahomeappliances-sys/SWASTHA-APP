const pool =
  require("../db/db");

const getAnalytics =
  async (req, res) => {
    try {
      const orders =
        await pool.query(
          `
          SELECT COUNT(*) as total_orders
          FROM orders
          `
        );

      const revenue =
        await pool.query(
          `
          SELECT
          COALESCE(
            SUM(total),
            0
          ) as revenue
          FROM orders
          WHERE payment_status='PAID'
          OR payment_method='COD'
          `
        );

      const products =
        await pool.query(
          `
          SELECT COUNT(*) as total_products
          FROM products
          `
        );

      const customers =
        await pool.query(
          `
          SELECT COUNT(*) as total_customers
          FROM users
          `
        );

      const ads =
        await pool.query(
          `
          SELECT COUNT(*) as total_ads
          FROM advertisements
          `
        );
const pendingOrders =
  await pool.query(
    `
    SELECT
      id,
      full_name,
      total,
      order_status
    FROM orders
    WHERE order_status NOT IN
    (
      'DELIVERED',
      'CANCELLED'
    )
    ORDER BY created_at DESC
    LIMIT 10
    `
  );
      res.json({
        totalOrders:
          orders.rows[0]
            .total_orders,

        totalRevenue:
          revenue.rows[0]
            .revenue,

        totalProducts:
          products.rows[0]
            .total_products,

        totalCustomers:
          customers.rows[0]
            .total_customers,

        totalAdvertisements:
          ads.rows[0]
            .total_ads,
            
            pendingOrders:
  pendingOrders.rows,
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
  getAnalytics,
};