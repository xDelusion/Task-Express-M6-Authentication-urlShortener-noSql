const express = require("express");

const router = express.Router();
const passport = require("passport");

const { signup, signin, getUsers } = require("./users.controllers");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: fasle }),
  signin
);
router.get("/users", getUsers);

module.exports = router;
