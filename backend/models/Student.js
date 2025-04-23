const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  dob: Date,
  roomType: String, // Single, Double, Triple
});

module.exports = mongoose.model('Student', studentSchema);
