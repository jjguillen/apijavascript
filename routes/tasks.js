const express = require("express");
const TaskController = require("../controllers/tasks")
const api = express.Router();

//Middleware
const md_auth = require("../middleware/authenticated");

//Endpoints ----------------

//Crear tarea
api.post("/task", TaskController.createTask);

//Consultar todas las tareas
api.get("/task", [md_auth.ensureAuth], TaskController.getTasks);

//Consultar una tarea
api.get("/task/:id", [md_auth.ensureAuth], TaskController.getTask);

//Borrar tarea por id
api.delete("/task/:id", TaskController.deleteTask);

//Modificar tarea por id
api.put("/task/:id", TaskController.updateTask);

module.exports = api;