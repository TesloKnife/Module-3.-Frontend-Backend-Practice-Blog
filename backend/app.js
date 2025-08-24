const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register } = require("./controllers/user");
const mapUser = require("./helpers/mapUser");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

// Подключение контроллера на post запрос
app.post("/register", async (req, res) => {
  try {
    const user = await register(req.body.login, req.body.password);

    res.send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

mongoose
  .connect("mongodb://user:mongopass@localhost:27017/blog-app?authSource=admin")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
