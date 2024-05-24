const jwt = require("jsonwebtoken");
const moment = require("moment");

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("Authorization header missing");
    return res.status(401).json({ result: null, message: "Not authorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.TOKEN);

    if (payload.exp <= moment().unix()) {
      console.log("Token expired");
      return res.status(401).json({ result: null, message: "Not authorized" });
    }

    req.user = { idUser: payload.idUser, token: token };
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ result: null, message: "Not authorized" });
  }
};

module.exports = { ensureAuthenticated };
