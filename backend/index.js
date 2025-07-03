require("dotenv").config();
const express = require("express");
const db = require("../backend/models/db");
const cors = require("cors");
const userRouter = require("../backend/routes/userRouter");
const roleRouter = require("../backend/routes/roleRouter");
const jobRouter = require("../backend/routes/jobRouter");
// const commentRouter = require("../backend/routes/commentRouter");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use("/users", userRouter);
app.use("/role", roleRouter);
app.use("/jobs", jobRouter);
// app.use("/jobsComment" ,commentRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
