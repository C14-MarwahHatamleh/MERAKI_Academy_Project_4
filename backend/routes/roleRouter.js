const express = require("express");
const roleRouter = express.Router();


const { createRole } = require("../controllers/roleControllers");

roleRouter.post("/", createRole);


module.exports = roleRouter;
