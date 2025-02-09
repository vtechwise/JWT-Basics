const jwt = require("jsonwebtoken");

const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw CustomAPIError("Please provide your login details", 400);
  }
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.jwtSecret, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("no token provided", 401);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.jwtSecret);
    const luckyNumbers = Math.floor(Math.random() * 100);
    return res.status(200).json({
      msg: `hello wllcome to the dashboard ${decode.username} here is your secret key ${luckyNumbers}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorize to access this route", 401);
  }
};
module.exports = {
  login,
  dashboard,
};
