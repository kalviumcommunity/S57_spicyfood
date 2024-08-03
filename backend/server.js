const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { connectDb, checkConnected } = require("./config/db");
const router = require("./Routes/route");
const port = 3002;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routes/userRoute");
const User = require("./Schema/userSchema");

app.get("/home", (req, res) => {
  res.json({
    message: checkConnected()
      ? "Database is connected"
      : "Database is disconnected",
  });
});

// Enable CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend's origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/users", async (req, res) => {

  try {
    const users = await User.find(); // Assuming you have a User model
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/", router);
app.use("/users", userRouter);

app.listen(port || 3001, async () => {
  try {
    await connectDb();
    if (checkConnected()) {
      console.log(`port is running on ${port} successfully`);
    }
  } catch (error) {
    console.log(error);
  }
});
