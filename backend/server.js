const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes =
  require(
    "./routes/uploadRoutes"
  );
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authroutes");
const pool = require("./db/db");
const addressRoutes =
  require("./routes/addressRoutes");
const app = express();
const productRoutes = require("./routes/productRoutes");
const adminRoutes =
  require("./routes/adminRoutes");
app.use(cors());
app.use(express.json());
app.use(
  "/api/upload",
  uploadRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
const orderRoutes =
  require(
    "./routes/orderRoutes"
  );
app.use(
  "/api/addresses",
  addressRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(
  "Razorpay Key:",
  process.env.RAZORPAY_KEY_ID
);
console.log(
  "SECRET EXISTS:",
  !!process.env.RAZORPAY_KEY_SECRET
);
const razorpay =
  require("./config/razorpay");

app.get(
  "/razorpay-test",
  async (req, res) => {
    try {
      const order =
        await razorpay.orders.create({
          amount: 100,
          currency: "INR",
        });

      res.json(order);
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  }
);
const advertisementRoutes =
  require(
    "./routes/advertisementRoutes"
  );
  app.use(
  "/api/advertisements",
  advertisementRoutes
);
app.get("/test-register", async (req, res) => {
  const bcrypt = require("bcrypt");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const result = await pool.query(
    `INSERT INTO users
    (name,email,phone,password_hash)
    VALUES ($1,$2,$3,$4)
    RETURNING id,name,email`,
    [
      "Sam",
      "sam@test.com",
      "9876543210",
      hashedPassword
    ]
  );

  res.json(result.rows[0]);
});
