const express = require('express');
const router = express.Router();
let { dataRole, dataUser } = require('../utils/data');
const { writeDataToFile } = require('../utils/dataHandler');

// GET all roles
router.get('/', (req, res) => {
  res.json(dataRole);
});

// GET a single role by id
router.get('/:id', (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);
  if (role) {
    res.json(role);
  } else {
    res.status(404).send('Role not found');
  }
});

// CREATE a new role
router.post('/', (req, res) => {
  const newRole = {
    id: `r${dataRole.length + 1}`,
    ...req.body,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dataRole.push(newRole);
  writeDataToFile(dataRole, 'dataRole');
  res.status(201).json(newRole);
});

// UPDATE a role
router.put('/:id', (req, res) => {
  const roleIndex = dataRole.findIndex(r => r.id === req.params.id);
  if (roleIndex !== -1) {
    dataRole[roleIndex] = {
      ...dataRole[roleIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    writeDataToFile(dataRole, 'dataRole');
    res.json(dataRole[roleIndex]);
  } else {
    res.status(404).send('Role not found');
  }
});

// DELETE a role
router.delete('/:id', (req, res) => {
  const roleIndex = dataRole.findIndex(r => r.id === req.params.id);
  if (roleIndex !== -1) {
    const deletedRole = dataRole.splice(roleIndex, 1);
    writeDataToFile(dataRole, 'dataRole');
    res.json(deletedRole);
  } else {
    res.status(404).send('Role not found');
  }
});

// GET all users in a role
router.get('/:id/users', (req, res) => {
    const usersInRole = dataUser.filter(u => u.role.id === req.params.id);
    res.json(usersInRole);
});

module.exports = router;
