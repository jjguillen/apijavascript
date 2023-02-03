const express = require("express");
const HomeController = require("../controllers/home.js");

const api = express.Router();

api.get('/', HomeController.getHome);

module.exports = api;