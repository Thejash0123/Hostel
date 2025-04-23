const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/add', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.send({ success: true });
});

router.get('/list', async (req, res) => {
  const students = await Student.find();
  const count = {
    single: students.filter(s => s.roomType === 'Single').length,
    double: students.filter(s => s.roomType === 'Double').length,
    triple: students.filter(s => s.roomType === 'Triple').length,
  };
  res.send({ students, count });
});

module.exports = router;
