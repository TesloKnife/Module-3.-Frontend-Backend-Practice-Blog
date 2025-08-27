const jwt = require("jsonwebtoken");

const sing = process.env.JWT_SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, sing, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, sing);
  },
};
