require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // ✅ You forgot this line

const db = require("../backend/models/db");
const userRouter = require("../backend/routes/userRouter");
const roleRouter = require("../backend/routes/roleRouter");
const jobRouter = require("../backend/routes/jobRouter");
// const commentRouter = require("../backend/routes/commentRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use("/role", roleRouter);
app.use("/jobs", jobRouter);
// app.use("/jobsComment", commentRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
