const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");
  const isGuest = req.query.guest === "true"; // ✅ Check if it's a guest request

  // ✅ Allow guests to access without a token
  if (!token && isGuest) {
    req.user = null; // Guest users do not have a user ID
    return next();
  }

  // ✅ If a token is provided, verify it
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.id; // Store user ID in request
      return next();
    } catch (error) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  }

  // ✅ If no token and not a guest, reject request
  return res.status(401).json({ msg: "No token, authorization denied" });
};

module.exports = authMiddleware;
