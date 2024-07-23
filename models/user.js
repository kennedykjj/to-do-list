const users = [];

const findUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

const addUser = (user) => {
  users.push(user);
};

module.exports = {
  findUserByUsername,
  addUser,
};
