import express from "express";
import authRoutes from "./routes/auth-routes.js";
import profileRoutes from "./routes/profile-routes.js";
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

// ROUTES
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () =>
  console.log("App now listening for requests on port 3000")
);
