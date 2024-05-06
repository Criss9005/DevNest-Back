const Users = require('./users-schema.js')
const { json } = require('express');
const bcrypt = require("bcrypt");
const { valid } = require('joi');
const jwt = require('jsonwebtoken')
const moment = require('moment')

const register = async (data) => {
  const user = await Users.findOne({
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

  const result = await Users.create(data)
  return {
    success: true,
    user: {
      email: data.email,
      subscription: "starter"
    }
    
  }
  
};

const login = async (email, password) => { 
  try {
    const user = await Users.findOne({
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
      idUser: user.id,
      subscription: user.subscription,
      iat: moment().unix(),
      exp: moment().add(12,"hours").unix()
    }, process.env.TOKEN)

    user.token = token;
    try {
      const result1 = await Users.findByIdAndUpdate({ _id: user._id }, { token : token })
      
    } catch (error) {
      console.log(error)
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
      result: user,
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
  
  const user = await Users.findOne({
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
      const result1 = await Users.findByIdAndUpdate({ _id: id }, { token : null })
      
    } catch (error) {
      console.log(error)
    }
};

const updateSub = async (id, sub) => {
try {
      const result = await Users.findByIdAndUpdate({ _id: id }, { subscription : sub })
  if (result) { 
    return true
  }
    } catch (error) {
      console.log(error)
    }
};


module.exports = {
   register, login, logout, removeToken, updateSub,
}