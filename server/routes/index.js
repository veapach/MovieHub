const Router = require("express");
const router = new Router();
const filmRouter = require("./filmRouter");
const reviewRouter = require("./reviewRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/film", filmRouter);

module.exports = router;
