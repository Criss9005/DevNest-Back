const users = require("./users-schema.js");
// const { json } = require("express");
const bcrypt = require("bcrypt");
// const { valid } = require("joi");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const crypto = require("crypto");
const blackList = require("./blackList-schema.js");

const registerF = async (data) => {
  const user = await users.findOne({
    email: data.email,
  });
  if (user) {
    return {
      success: false,
      result: null,
      message: "Email in use",
    };
  }
  // hash password

  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  const result = await users.create(data);
  return {
    success: true,
    user: {
      email: result.email,
      id: result._id,
      username: result.username,
    },
  };
};

const loginF = async (email, password) => {
  try {
    const user = await users.findOne({
      email,
    });

    if (!user) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    const token = jwt.sign(
      {
        idUser: user._id,
        iat: moment().unix(),
        exp: moment().add(12, "hours").unix(),
      },
      process.env.TOKEN
    );

    const Rtoken = jwt.sign(
      {
        idUser: user._id,
        iat: moment().unix(),
        exp: moment().add(14, "hours").unix(),
      },
      process.env.RTOKEN
    );

    const newUser = {
      id: user._id,
      email: user.email,
      username: user.username,
      userData: user.userData,
      dailyIntake: user.dailyIntake,
    };

    const data = {
      accessToken: token,
      refreshToken: Rtoken,
      sid: crypto.randomBytes(16).toString("hex"),
      user: newUser,
    };

    return {
      success: true,
      result: data,
      message: "Login successfully",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error.message,
    };
  }
};

const logout = async (id) => {
  const user = await users.findOne({
    _id: id,
  });
  if (user) {
    return {
      success: true,
    };
  }

  return {
    success: false,
  };
};

const blackListToken = async (data) => {
  try {
    const result1 = await blackList.create(data);
    if (result1) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.log(error);
  }
};

const newPairOfTokens = async (sid) => {
  try {
    const token = jwt.sign(
      {
        iat: moment().unix(),
        exp: moment().add(12, "hours").unix(),
      },
      process.env.TOKEN
    );

    const Rtoken = jwt.sign(
      {
        iat: moment().unix(),
        exp: moment().add(14, "hours").unix(),
      },
      process.env.RTOKEN
    );

    const data = {
      newAccesToken: token,
      newRefreshToken: Rtoken,
      sid: crypto.randomBytes(16).toString("hex"),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerF,
  loginF,
  logout,
  blackListToken,
  newPairOfTokens,
};
