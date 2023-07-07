require("dotenv").config();
const mongoose = require("mongoose");
const { MONGODB_URL } = require("./config/keys");

const connectDB = async () => {
  const conn = await mongoose.connect(MONGODB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
