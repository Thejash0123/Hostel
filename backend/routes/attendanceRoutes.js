const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.post('/mark', async (req, res) => {
  await Attendance.insertMany(req.body.attendance);
  res.send({ success: true });
});

module.exports = router;
