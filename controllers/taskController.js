const tasks = [];

const getAllTasks = (req, res) => {
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

const createTask = (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  res.json(task);
};

const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
