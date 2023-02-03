const express = require("express");
const app = express();

//Para poder recibir jsons
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cargar rutas
const task_routes = require("./routes/task");
const user_routes = require("./routes/user");

//Rutas base /api delante de las rutas
app.use("/api", task_routes);
app.use("/api", user_routes);

module.exports = app;