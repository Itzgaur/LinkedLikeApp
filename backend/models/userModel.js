import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
    validate: [
      validator.isEmail,
      "please enter a valid email!",
    ],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});
