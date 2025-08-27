require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const port = 3001;
const app = express();

// Для использования на сервере при npm run build - в остальных случаях закомментить
app.use(express.static("../frontend/dist"));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

mongoose.connect(process.env.DB_CONNECTION_STRING_DOCKER).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
