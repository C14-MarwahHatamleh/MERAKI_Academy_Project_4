const mongoose = require("mongoose");
const UserModel = require("../models/userSchema");
const roleModel = require("../models/roleSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
const TOKEN_EXP_Time = process.env.EXPIRESIN;

const createUser = (req, res) => {
  try {
    const { firstName, lastName, age, country, email, password, role } =
      req.body;

    const newUser = new UserModel({
      firstName,
      lastName,
      age,
      country,
      email,
      password,
      role,
    });

    newUser
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Account Created Successfully",
          author: result,
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await UserModel.findOne({
    email: email.toLowerCase(),
  }).exec();

  if (findUser) {
    const dbHashPass = findUser.password;
    const isMatch = await bcrypt.compare(password, dbHashPass);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        data: null,
      });
    } else {
      const token = await generateTokens(findUser);
      res.status(200).json({
        success: true,
        message: "Valid login credentials",
        token: token,
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }
};

const getAllUsers = (req, res) => {
    UserModel
      .find({})
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Get All Users",
          Users: result,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Can not get the users",
        });
      });
  };
  

const generateTokens = async (user) => {
    let returnValue;
    if (user !== null) {
      const id = user.role;
      const role = await roleModel.findOne({ _id: id }).exec();
      console.log(role);
      const payload = {
        country: user.country,
        userID: user._id,
        role: {
          role: role.role,
          permissions: role.permissions,
        },
      };
      const options = {
        expiresIn: TOKEN_EXP_Time,
      };
      returnValue =  jwt.sign(payload, SECRET, options);
    }
     else {
      returnValue = "Sorry there is no any role for this email";
    }
    console.log(returnValue)
    return returnValue;
  };
  
  const LoggedUser = async (req, res) => {
    const token = req.token.userID;
    const findUser = await UserModel.findOne({ _id: token }).exec();
  
    if (findUser) {
      res.status(200).json({
        success: true,
        message: "User Found",
        data: findUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }
  };
module.exports = { createUser , loginUser , getAllUsers , LoggedUser};
