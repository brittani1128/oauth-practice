import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user-model.js";

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (acccessToken, refreshToken, profile, done) => {
      // check if user exists in db
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          console.log("current user", user);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log({ newUser });
            });
        }
      });
    }
  )
);
