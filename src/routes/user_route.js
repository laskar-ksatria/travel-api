const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/user_controller");
const Limitter = require("express-rate-limit");

// Limitter
const RegisterLimitter = Limitter({
  windowMs: 5000,
  max: 5,
  message: {
    code: 429,
    message: "To many request!",
  },
});

const LoginLimitter = Limitter({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    code: 429,
    message: "To many request!",
    status: "failed",
  },
});

// Router
Router.get("/users", UserController.getAllUser);
Router.post("/login", LoginLimitter, UserController.userLogin);
Router.post("/register", UserController.userRegister);
// Router.post("/register", RegisterLimitter, UserController.userRegister);

module.exports = Router;
