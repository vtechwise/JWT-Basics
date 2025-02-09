const jwt = require("jsonwebtoken");

const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw BadRequestError("Please provide your login details");
  }
  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.jwtSecret, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumbers = Math.floor(Math.random() * 100);
  const { id, username } = req.user;
  return res.status(200).json({
    msg: `hello wellcome to the dashboard ${username} here is your secret key ${luckyNumbers}`,
  });
};
module.exports = {
  login,
  dashboard,
};
