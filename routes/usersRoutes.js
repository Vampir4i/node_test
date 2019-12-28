const express = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post('/login', jsonParser, usersController.loginUser);
usersRouter.post('/register', jsonParser, usersController.registerUser);

module.exports = usersRouter;