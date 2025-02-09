const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.jwtSecret);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorize to access this route", 401);
  }
};

module.exports = authMiddleware;
