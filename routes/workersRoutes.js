const express = require("express");
const workersController = require("../controllers/workersController");
const workersRouter = express.Router();
const jsonParser = express.json();

workersRouter.get('/', workersController.getWorkers);
workersRouter.post('/', jsonParser, workersController.addWorker);
workersRouter.put('/', jsonParser, workersController.updateWorker);
workersRouter.delete('/:id', workersController.deleteWorker);

module.exports = workersRouter;