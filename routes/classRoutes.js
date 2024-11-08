// routes/classRoutes.js
const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Create a new class
router.post('/', async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacherId studentList');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Additional routes for update and delete...

module.exports = router;
