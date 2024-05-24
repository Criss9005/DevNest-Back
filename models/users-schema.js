const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 3,
      maxLength: 254,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minLength: 8,
      maxLength: 100,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: 3,
      maxLength: 254,
    },
    userData: {
      weight: {
        type: Number,
        minimun: 20,
        maximun: 500,
        default: 0,
      },
      height: {
        type: Number,
        minimun: 100,
        maximun: 250,
        default: 0,
      },
      age: {
        type: Number,
        minimun: 18,
        maximun: 100,
        default: 0,
      },
      dailyRate: {
        type: Number,
        default: 0,
      },
      bloodType: {
        type: Number,
        minimun: 1,
        maximun: 4,
        default: 0,
      },
      desiredWeight: {
        type: Number,
        minimun: 20,
        maximun: 500,
        default: 0,
      },
      notAllowedProducts: {
        type: Array,
        default: [],
      },
    },
    dailyIntake: {
      dailyCalorieIntake: { type: Number, default: 0 },
      nonRecommendedFoods: { type: Array, default: [] },
    },
  },
  { collection: "users" }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
