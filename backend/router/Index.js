const express = require("express");
const router = express.Router();

const questionRouter = require("./Question");
const answerRouter = require("./Answer");

router.get("/", (req, res) => {
  res.redirect("/Quora");
});

router.get("/Quora", (req, res) => {
  res.send("This is the home page for your Caffeine Connect");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;