const bcr = require("bcryptjs");

const hashingPassword = (password) => {
  let salt = bcr.genSaltSync(10);
  let newPassword = bcr.hashSync(password, salt);
  return newPassword;
};

const checkPassword = (password, hashPassword) => {
  return bcr.compareSync(password, hashPassword);
};

const pinHashing = (pin) => {
  let salt = bcr.genSaltSync(10);
  return bcr.hashSync(pin, salt);
};

const checkPin = (pin, hashPin) => {
  return bcr.compareSync(pin, hashPin);
};

module.exports = {
  hashingPassword,
  checkPassword,
  pinHashing,
  checkPin,
};
