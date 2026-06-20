const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const crypto = require("crypto");
const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);
const register = async (req, res) => {
  
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
      (name, email, phone, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, phone`,
      [name, email, phone, hashedPassword]
    );
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if (
  !passwordRegex.test(
    password
  )
) {
  return res
    .status(400)
    .json({
      message:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    });
}
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const forgotPassword =
  async (req, res) => {
    try {
      const { email } =
        req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res.json({
          message:
            "If the email exists, a reset link has been sent.",
        });
      }

      const token =
        crypto
          .randomBytes(32)
          .toString("hex");

      const expiry =
        new Date(
          Date.now() +
            1000 *
              60 *
              60
        );

      await pool.query(
        `
        UPDATE users
        SET
          reset_token = $1,
          reset_token_expiry = $2
        WHERE email = $3
        `,
        [
          token,
          expiry,
          email,
        ]
      );

      const resetLink =
        `${process.env.FRONTEND_URL}/reset-password/${token}`;

      await resend.emails.send(
        {
          from:
            "onboarding@resend.dev",
          to: email,
          subject:
            "Reset Your Password",
          html: `
            <h2>Password Reset</h2>
            <p>Click below to reset your password:</p>
            <a href="${resetLink}">
              Reset Password
            </a>
          `,
        }
      );

      res.json({
        message:
          "Reset email sent",
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
  const resetPassword =
  async (req, res) => {
    try {
      const {
        token,
        password,
      } = req.body;

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE reset_token = $1
          AND reset_token_expiry > NOW()
          `,
          [token]
        );

      if (
        result.rows.length ===
        0
      ) {
        return res
          .status(400)
          .json({
            message:
              "Invalid or expired token",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await pool.query(
        `
        UPDATE users
        SET
          password_hash = $1,
          reset_token = NULL,
          reset_token_expiry = NULL
        WHERE id = $2
        `,
        [
          hashedPassword,
          result.rows[0].id,
        ]
      );

      res.json({
        message:
          "Password updated successfully",
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
const googleLogin =
  async (req, res) => {
    try {
      const {
        email,
        name,
        googleId,
      } = req.body;

      let result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      let user;

      if (
        result.rows.length ===
        0
      ) {
        const insertResult =
  await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      google_id,
      password_hash
    )
    VALUES
    ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      name,
      email,
      googleId,
      "GOOGLE_AUTH_USER"
    ]
  );

        user =
          insertResult.rows[0];
      } else {
        user =
          result.rows[0];
      }

      const token =
        jwt.sign(
          {
            userId:
              user.id,
            email:
              user.email,
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        token,
      });
    } catch (
      error
    ) {
      console.error(
        error
      );

      res.status(500).json({
        message:
          "Google Login Failed",
      });
    }
  };
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        phone,
        created_at
      FROM users
      WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  getProfile,
  forgotPassword,
  resetPassword,
};