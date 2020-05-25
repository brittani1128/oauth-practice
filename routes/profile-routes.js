import express from "express";
const router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  next();
};

router.get("/", authCheck, (req, res) => {
  res.send("user" + req.user.username);
});

export default router;
