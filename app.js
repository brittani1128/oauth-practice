import express from "express";
import router from "./routes/auth-routes.js";
import "./config/env.js";
import "./config/passport-setup.js";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";

const app = express();

// set up view engine
app.set("view engine", "ejs");

// Sessions
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);

// set up routes
app.use("/auth", router);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () =>
  console.log("App now listening for requests on port 3000")
);
