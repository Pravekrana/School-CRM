// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Create a new teacher
router.post('/', async (req, res) => {
  try {
    const newTeacher = await Teacher.create(req.body);
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('assignedClass');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a teacher by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id/profile', async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id)
        .populate('assignedClass')
        .populate({ path: 'assignedClass', populate: { path: 'studentList' } }); // Populates class and student info
      if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

module.exports = router;
