const express = require("express");
const userRouter = require("./routes/user.routes");
const reviewRouter = require("./routes/review.routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api", userRouter); //API к пользователю
app.use("/api", reviewRouter); //API к отзывам

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
