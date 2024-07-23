const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/taskController');
const authenticationController = require('./controllers/authenticationController');

const app = express();
const port = 3001;

// Middleware log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware parser
app.use(bodyParser.json());

// Auth routes
app.post('/login', authenticationController.login);
app.post('/register', authenticationController.register);

// Task routes
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.post('/tasks', taskController.createTask);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

let server;

const startServer = () => {
  server = app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
  });
  return server;
};

const stopServer = () => {
  if (server) {
    server.close();
  }
};

module.exports = { app, startServer, stopServer };
