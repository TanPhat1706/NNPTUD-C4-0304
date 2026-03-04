const express = require('express');
const router = express.Router();
let { dataUser } = require('../utils/data');
const { writeDataToFile } = require('../utils/dataHandler');

// GET all users
router.get('/', (req, res) => {
  res.json(dataUser);
});

// GET a single user by username
router.get('/:username', (req, res) => {
  const user = dataUser.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// CREATE a new user
router.post('/', (req, res) => {
  const newUser = {
    ...req.body,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dataUser.push(newUser);
  writeDataToFile(dataUser, 'dataUser');
  res.status(201).json(newUser);
});

// UPDATE a user
router.put('/:username', (req, res) => {
  const userIndex = dataUser.findIndex(u => u.username === req.params.username);
  if (userIndex !== -1) {
    dataUser[userIndex] = {
      ...dataUser[userIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    writeDataToFile(dataUser, 'dataUser');
    res.json(dataUser[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
router.delete('/:username', (req, res) => {
  const userIndex = dataUser.findIndex(u => u.username === req.params.username);
  if (userIndex !== -1) {
    const deletedUser = dataUser.splice(userIndex, 1);
    writeDataToFile(dataUser, 'dataUser');
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;
