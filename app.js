const connectDb = require("./database");
const express = require("express");
const app = express();
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const localStrategy = require("./middlewares/passport");
const { PORT } = require("./config/keys");

connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/urls", urlRoutes);
app.use("/auth", userRoutes);
app.use("/signin", passport.authenticate("local", { session: false }), signin);
app.use("/signup", signup);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(PORT, () => {
  console.log("The application is running on localhost:8000");
});
