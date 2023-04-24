const express = require("express");
const cors = require("cors");
const db = require("./db");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./routes/userRouter");
const User = require("./models/userModel");
app.use(express.json());
app.use(cors());
dotenv.config();
db();

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
