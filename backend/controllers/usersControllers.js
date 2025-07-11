const mongoose = require("mongoose");
const UserModel = require("../models/userSchema");
const roleModel = require("../models/roleSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
const TOKEN_EXP_Time = process.env.EXPIRESIN;

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age, country, email, password } = req.body;

    const newUser = new UserModel({
      firstName,
      lastName,
      age,
      country,
      email,
      password,
      role: "681b3c11b5b003d37afd7489",
    });

    // const findUser = await UserModel.findOne({
    //   email: email.toLowerCase(),
    // }).exec();
    // console.log(findUser);
    newUser
      .save()
      .then(async (result) => {
        const token = await generateTokens(result);
        res.status(201).json({
          success: true,
          message: "Account Created Successfully",
          token: token,
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
  UserModel.find({})
    .populate("role")
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

const FindEmailUser = async (req, res) => {
  await UserModel.findOne({ email: req.params.email.toLowerCase() })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The User is Found`,
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const DeleteUserById = async (req, res) => {
  const FindUser = await UserModel.findOne({
    email: req.query.email.toLowerCase(),
  }).exec();
  if (FindUser) {
    await UserModel.findOneAndDelete({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `The User has been deleted`,
          user: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err.message,
        });
      });
  } else {
    res.status(500).json({
      success: false,
      message: "Sorry the email doesn't exist",
    });
  }
};

const FindUserByID = async (req, res) => {
  await UserModel.find({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The User is Found`,
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Can not get the user",
        err: err.message,
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
    returnValue = jwt.sign(payload, SECRET, options);
  } else {
    returnValue = "Sorry there is no any role for this email";
  }
  console.log(returnValue);
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
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  LoggedUser,
  FindUserByID,
  DeleteUserById,
  FindEmailUser,
};
