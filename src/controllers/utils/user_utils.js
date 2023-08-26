const User = require("../../models/user_model");
const {
  OKE,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  NOT_FOUND,
  CREATED,
  BAD_REQ,
} = require("../../utils/status");

exports.getCurrencySeparator = (numb) => {
  return currencyFormatter.format(numb, {
    thousand: ".",
    precision: 0,
  });
};

//! REGISTER
exports.register = async (req, res, next) => {
  let { email, phone, name, password, provider } = req.body;
  try {
    // Check email
    let isFind = await User.find({ email });
    // if (isFind)
    //   return res
    //     .status(BAD_REQ)
    //     .json({ message: `${email} already taken, please take another one` });

    let newUser = await User.create({
      email,
      phone,
      name,
      password: provider === "google" ? randomstring.generate() : password,
      provider: provider === "google" ? provider : "none",
    });
    let token = generateToken({ id: newUser.id });
    res.status(CREATED).json({
      status: "success",
      statusCode: CREATED,
      data: newUser,
      access_token: token,
    });
    res.status(200).json({ message: "This is user register" });
  } catch (error) {
    console.log("_____");
    console.log(error.errors);
    res.status(BAD_REQ).json({ message: "Error" });
  }
};

//! LOGIN
exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email && !password)
    res.status(400).json({ code: 4, message: "Email not found" });

  try {
    let finduser = await User.find({ email: email });
    if (!finduser)
      res.status(400).json({ code: 5, message: "invalid email / password" });
  } catch (error) {}
};

//! Currency
exports.getCurrencySeparator = (numb) => {
  return currencyFormatter.format(numb, {
    thousand: ".",
    precision: 0,
  });
};
