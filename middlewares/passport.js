const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(
  { usernameField: username },
  async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return done(null, false);
      }
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordsMatch) {
        return done(null, false);
      }

      // req.user = foundUser
      done(null, foundUser);
    } catch (error) {
      return done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayLoad, done) => {
    if (Date.now() > jwtPayLoad.exp * 1000) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayLoad._id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
