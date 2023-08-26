const mongoose = require("mongoose");
const currencyFormatter = require("currency-formatter");
const { hashingPassword } = require("../helpers/bcr");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getCurrencySeparator = (numb) => {
  return currencyFormatter.format(numb, {
    thousand: ".",
    precision: 0,
  });
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be empty"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email cannot be empty"],
      validate: [
        {
          validator: function (value) {
            return emailRegex.test(value);
          },
          message: (props) =>
            `${props.value} is not valid email, please fill email correctly`,
        },
        {
          validator: function (value) {
            return this.model("User")
              .findOne({ email: value })
              .then(function (email) {
                if (email) {
                  return false;
                } else {
                  return true;
                }
              });
          },
          message: (props) =>
            `${props.value} already taken, please take another one`,
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      validate: {
        validator: function (value) {
          if (value.length < 6) {
            return false;
          } else {
            return true;
          }
        },
        message: (props) => `Password length must be larger or equal than 6`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone cannot be empty"],
      validate: {
        validator: function (value) {
          return this.model("User")
            .findOne({ phone: value })
            .then(function (phone) {
              if (phone) {
                return false;
              } else {
                return true;
              }
            });
        },
        message: (props) => `Phone number already use`,
      },
    },
    balance: {
      type: Number,
      default: 500000,
    },
    provider: {
      type: String,
      required: [true, "Provider cannot be empty"],
    },
    pin: {
      type: String,
    },
    isPin: {
      type: Boolean,
      default: false,
    },
    display_balance: {
      type: String,
      default: getCurrencySeparator(500000),
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false }
);

UserSchema.pre("save", function (next) {
  let pass = hashingPassword(this.password);
  this.password = pass;
  next();
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
