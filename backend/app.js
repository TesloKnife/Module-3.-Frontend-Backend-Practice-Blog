const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  register,
  login,
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
} = require("./controllers/user");
const mapUser = require("./helpers/mapUser");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const ROLES = require("./constants/roles");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

// Подключение контроллера на post запрос
// Вход сразу после регистрации
app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    // Запрет доступа до токена из JS
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

// Очищаем куки
app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

// Пользователь должен быть аутентифицирован
app.use(authenticated);

// Доступ сюда только администратору, получение пользователей
app.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

// Доступ сюда только администратору, получение ролей
app.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = await getRoles();

  res.send({ data: roles });
});

//Редактирование пользователя
app.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

// Удаление пользователя
app.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/blog-app?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
