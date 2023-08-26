const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.emailValidator = (value) => {};

exports.passwordValidator = (value) => {
  if (value.length < 6) return false;
  else return true;
};
