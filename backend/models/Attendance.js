const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: mongoose.Schema.Types.ObjectId,
  date: String,
  status: String, // Present or Absent
});

module.exports = mongoose.model('Attendance', attendanceSchema);
