const Joi = require("joi");

const {
  registerF,
  loginF,
  blackListToken,
  newPairOfTokens,
  updateData,
} = require("../models/auth.js");

const schema = Joi.object({
  password: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const register = async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const { error } = schema.validate({
        password: req.body.password,
        email: req.body.email,
      });
      if (error) {
        res.status(400).send({ message: error.message });
      } else {
        const { success, user, message } = await registerF(req.body);
        if (!success) {
          return res.status(409).json({
            message,
          });
        }

        return res.status(201).json({
          user,
        });
      }
    } else {
      res.status(400);
      res.json({ message: "missing required fields" });
    }
  } catch (error) {
    return res.status(400).json({ message: "missing required fields" });
  }
};

const login = async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const { error } = schema.validate({
        password: req.body.password,
        email: req.body.email,
      });
      if (error) {
        res.status(400).send({ message: error.message });
      } else {
        const { email, password } = req.body;
        const { success, result, message } = await loginF(email, password);
        if (!success) {
          return res.status(401).json({ message });
        }

        return res.status(200).json({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          sid: result.sid,
          user: result.user,
        });
      }
    } else {
      res.status(400).json({ message: "missing required fields" });
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    if (req.body.sid) {
      if (!req.user) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      const data = {
        token: req.user.token,
        sid: req.body.sid,
      };

      const { success } = await blackListToken(data);
      if (!success) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      return res.status(204).json("No content");
    } else {
      res.status(400);
      res.json({ message: "missing required fields" });
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    if (req.body.sid) {
      const newPair = await newPairOfTokens(req.body.sid);
      if (!newPair) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      const data = {
        token: req.user.token,
        sid: req.body.sid,
      };

      await blackListToken(data);

      return res.status(200).json({ data: newPair });
    } else {
      res.status(400);
      res.json({ message: "missing required fields" });
    }
  } catch (error) {}
};


const userData = async (req, res) => {
  
    try {
        const {weight, height, age, bloodType, desiredWeight, id } = req.body
        const success = await updateData(id, weight, height, age, bloodType, desiredWeight )
            
       if (success) { 
            return res.status(200).send({ messege: 'Update Completed' })
        }
          
        return res.status(400).json({ message: "Update failed or user not found" })

} catch (error) {
    console.log(error)
}
        
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  userData
};
