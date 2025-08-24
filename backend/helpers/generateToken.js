const jwt = require("jsonwebtoken");

const sing = "testtest";

module.exports = function (data) {
  return jwt.sign(data, sing, { expiresIn: "30d" });
};
