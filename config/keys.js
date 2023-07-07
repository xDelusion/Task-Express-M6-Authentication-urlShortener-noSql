require("dotenv").config();

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXP: process.env.JWT_EXP,
  PORT: process.env.PORT,
};
