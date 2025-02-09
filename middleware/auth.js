const { UntheticatedError } = require("../errors");
const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UntheticatedError("no token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.jwtSecret);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UntheticatedError("Not authorize to access this route");
  }
};

module.exports = authMiddleware;
