const axios = require("axios");
const express = require("express");

const Router = express.Router();

Router.get("/check-balance", async (req, res, next) => {
  try {
    let data = await axios.get(
      "https://api.serpul.co.id/h2h/balance?id=SP1&token=606d60327187f69ed24f7cc911906f58"
    );
    if (data) {
      res.status(200).json({ data: data?.data });
    }
  } catch (error) {
    res.status(500).json({ message: "Data Error" });
  }
});

module.exports = Router;
