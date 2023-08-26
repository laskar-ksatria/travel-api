const User = require("../models/user_model");
const UTILS = require("./utils/user_utils");
const {
  OKE,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_FOUND,
  CREATED,
  BAD_REQ,
} = require("../utils/status");

class UserController {
  //Get All Users
  static async getAllUser(req, res, next) {
    let users = await User.find({});
    res.status(200).json(users);
  }

  //Get By ID
  static async getById(req, res, next) {}

  //User Register
  static async userRegister(req, res, next) {
    console.log(req.body);
    await UTILS.register(req, res, next);
  }

  //User Login
  static async userLogin(req, res, next) {
    await UTILS.login(req, res, next);
  }

  //UPDATE PIN
  static updatePin(req, res, next) {}

  //Match PIN
  static matchPin(req, res, next) {}
}

module.exports = UserController;
