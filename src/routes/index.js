const express = require("express");
const Router = express.Router();
const UserRouter = require("./user_route");
const TestingRouter = require("./testing_router");

Router.use(TestingRouter);
Router.use(UserRouter);

module.exports = Router;
