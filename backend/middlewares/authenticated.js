const { verify } = require("../helpers/token");
const User = require("../models/User");

// Проверка аутентификации
module.exports = async function (req, res, next) {
  const tokenData = verify(req.cookies.token);

  const user = await User.findOne({ _id: tokenData.id });

  // Отправка ошибки сразу на frontend
  if (!user) {
    res.send({ error: "Authenticated user not found" });

    return;
  }

  req.user = user;

  next();
};
