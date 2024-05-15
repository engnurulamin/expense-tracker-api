const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [31, "Max Char can be 31"],
      Minlength: [3, "Min char at least 3"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [31, "Max Char can be 31"],
      Minlength: [3, "Min char at least 3"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          let regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return regex;
        },
        message: "Enter valid Email",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Min length should be 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = User;
