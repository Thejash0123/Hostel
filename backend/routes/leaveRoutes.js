const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const Student = require('../models/Student');

// Get all leave requests (admin side)
router.get('/all', async (req, res) => {
  try {
    const leaves = await Leave.find().populate('studentId', 'name');
    const formatted = leaves.map(l => ({
      _id: l._id,
      studentName: l.studentId?.name || 'Unknown',
      date: l.date,
      reason: l.reason,
      status: l.status
    }));
    res.json(formatted);
  } catch (err) {
    console.error('Error fetching all leave requests:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaves for a specific student
router.get('/byStudent/:id', async (req, res) => {
  try {
    const leaves = await Leave.find({ studentId: req.params.id });
    res.json(leaves);
  } catch (err) {
    console.error('Error fetching student leaves:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit leave request (student side)
router.post('/request', async (req, res) => {
  const { studentId, date, reason } = req.body;

  if (!studentId || !date || !reason) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newLeave = new Leave({
      studentId,
      date: new Date(date),
      reason,
      status: 'Pending' // Default status
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave request submitted successfully.' });
  } catch (err) {
    console.error('Error submitting leave request:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update leave status (admin side)
router.post('/update', async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'ID and status are required' });
  }

  try {
    await Leave.findByIdAndUpdate(id, { status });
    res.json({ message: 'Leave status updated.' });
  } catch (err) {
    console.error('Error updating leave status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
