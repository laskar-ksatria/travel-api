const JWT = require("jsonwebtoken");

exports.generateToken = (payload) => {
  let token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

exports.verifyToken = (token) => {
  return JWT.verify(token, "trapeli-token12345");
};
