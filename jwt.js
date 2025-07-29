const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) res.status(401).json({ message: "Unauthorized" });
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.secret_Key);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const generatejwttoken = (userDetail) => {
  return jwt.sign(userDetail, process.env.secret_Key);
};

module.exports = { jwtAuthMiddleware, generatejwttoken };
