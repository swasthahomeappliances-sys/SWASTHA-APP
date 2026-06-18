const jwt = require("jsonwebtoken");

const adminMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    console.log(
      "AUTH HEADER:",
      authHeader
    );

    if (!authHeader) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const token =
      authHeader.split(" ")[1];

    console.log(
      "TOKEN:",
      token
    );

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(
      "DECODED:",
      decoded
    );

    if (
      decoded.role !==
      "admin"
    ) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    req.admin =
      decoded;

    next();
  } catch (error) {
    console.log(
      "ADMIN MIDDLEWARE ERROR:"
    );

    console.log(error);

    return res.status(401).json({
      message:
        "Unauthorized",
    });
  }
};

module.exports =
  adminMiddleware;