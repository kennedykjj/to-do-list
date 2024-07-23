const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByUsername, addUser } = require('../models/user');

const secretKey = 'your_secret_key';

const register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  addUser(newUser);

  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credential' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credential' });
  }

  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: '1h',
  });
  res.json({ token });
};

module.exports = {
  register,
  login,
};
