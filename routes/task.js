const { application } = require("express");
const express = require("express");
const TaskController = require("../controllers/task");

const api = express.Router();

//Importamos middleware
const md_auth = require("../middlewares/authenticated");

//Crear tarea con POST
api.post('/task',  [md_auth.ensureAuth], TaskController.createTask);

//Obtener todas las tareas
api.get('/task', [md_auth.ensureAuth], TaskController.getTasks);

//Obtener ruta por id
api.get('/task/:id',  [md_auth.ensureAuth], TaskController.getTask);

//Actualizar ruta por id
api.put('/task/:id', [md_auth.ensureAuth], TaskController.updateTask);

//Eliminar ruta por id
api.delete('/task/:id', [md_auth.ensureAuth], TaskController.deleteTask);


module.exports = api;