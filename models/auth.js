const users = require('./users-schema.js')
const { json } = require('express');
const bcrypt = require("bcrypt");
const { valid } = require('joi');
const jwt = require('jsonwebtoken')
const moment = require('moment')
const crypto = require("crypto");

const register = async (data) => {
  const user = await users.findOne({
    email: data.email
  })
  if (user) {
    return {
      success: false,
      result: null,
      message: "Email in use"
    }
  };
  // hash password

  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  const result = await users.create(data)
  return {
    success: true,
    user: {
        email: result.email,
        id: result._id,
        username: result.username

    }
    
  }
  
};

const login = async (email, password) => { 
  try {
    const user = await users.findOne({
      email,
    });

    if (!user) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong"
      }
    };

    const token = jwt.sign({
      iat: moment().unix(),
      exp: moment().add(12,"hours").unix()
    }, process.env.TOKEN)

      const newUser = {
          email: user.email,
          username: user.username,
          userData: user.userData,
          id: user._id,
          
      }
      const data = {
          accesToken: token,
          refreshToken: token,
          sid: crypto.randomBytes(16).toString("hex"),
          user: newUser,

          
      }
    
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) { 
      return {
        success: false,
        result: null,
        message: "Email or password is wrong"
      }
    }
    
    return {
      success: true,
      result: data,
      message: "Login succefully"
    }

  } catch (error) {
    return {
      success: false,
      result: null,
      message: error.message
    }
  }
}

const logout = async (id) => {
  
  const user = await users.findOne({
    _id: id
  })
  if (user) {
    return {
      success: true,
    
    }
  } 

    return {
      success: false,
    
    }
  
  
};

const removeToken = async (id) => {
try {
      const result1 = await users.findByIdAndUpdate({ _id: id }, { token : null })
      
    } catch (error) {
      console.log(error)
    }
};



module.exports = {
   register, login, logout, removeToken,
}