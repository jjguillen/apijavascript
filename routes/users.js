const express = require("express");
const UserController = require("../controllers/users")
const api = express.Router();

//Endpoints ----------------

//Registrar usuario
api.post("/user", UserController.register);

//Login de usuario. Devuelve un token para luego hacer las llamadas API
api.post("/login", UserController.login);


module.exports = api;