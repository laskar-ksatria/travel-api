const express = require("express");
const Router = express.Router();
const axios = require("axios");

Router.get("/check-balance", async (req, res, next) => {
  try {
    let data = await axios.get(
      "https://api.serpul.co.id/h2h/balance?id=SP1&token=a8370b650132a7721228f81f0ab9a959"
    );
    if (data) {
      res.status(200).json({ data: data?.data });
    }
  } catch (error) {
    res.status(500).json({ message: "Data Error" });
  }
});

module.exports = Router;

Router.get("/testing/register", async (req, res, next) => {
  const sendData = {
    firstName: "Jhonny",
    lastName: "Deep",
    password: "Bongkibong12@",
    gender: "1",
    email: "baltimoreeluka@gmail.com",
    bornDate: "1999-01-01",
  };

  res.status(200).json({ ...sendData });
});

module.exports = Router;
